"use server";

import { db } from "@/drizzle/db";
import type { OrderStatus } from "@/drizzle/schema";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countOrders,
  deleteOrder,
  existsOrderOrganizationId,
  findCustomerOrderSummary,
  findOrder,
  findOrderableVariant,
  findOrders,
  findOrderShippingMethod,
  insertBillingAddress,
  insertOrder,
  insertOrderItem,
  reserveVariantStock,
  setOrderStatus,
} from "@/features/order/data-access/order";
import {
  toOrdersWithRelations,
  toOrderWithRelations,
} from "@/features/order/dto/order";
import { orderCache } from "@/features/order/lib/cache";
import type { OrderSearchParam } from "@/features/order/parsers/order";
import type { OrderFormInput } from "@/features/order/validation/order";
import { productCache } from "@/features/product/lib/cache";
import {
  ConflictError,
  normalizeError,
  NotFoundError,
  ValidationError,
} from "@/lib/error";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { randomInt } from "node:crypto";

const ORDER_QUANTITY = 1;

function toCents(amount: number) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new ValidationError("Invalid order amount.");
  }

  return Math.round(amount * 100);
}

export async function insertOrderUseCase({
  organizationId,
  input,
}: {
  organizationId: string;
  input: OrderFormInput;
}) {
  try {
    const created = await db.transaction(async (trx) => {
      const variant = await findOrderableVariant({
        client: trx,
        organizationId,
        productVariantId: input.productVariantId,
      });

      if (!variant) {
        throw new NotFoundError("This product option is no longer available.");
      }

      if (variant.stockQuantity < ORDER_QUANTITY) {
        throw new ConflictError("This product option is out of stock.");
      }

      const shipping = await findOrderShippingMethod({
        client: trx,
        organizationId,
        productVariantId: variant.productVariantId,
        shippingMethodId: input.shippingMethodId,
      });

      if (!shipping) {
        throw new ValidationError(
          "The selected delivery method is no longer available."
        );
      }

      const unitPrice = variant.salePrice ?? variant.price;
      const subtotalCents = toCents(unitPrice) * ORDER_QUANTITY;
      const shippingCents = toCents(shipping.charge);
      const subtotal = subtotalCents / 100;
      const shippingTotal = shippingCents / 100;
      const total = (subtotalCents + shippingCents) / 100;

      const reserved = await reserveVariantStock({
        client: trx,
        productVariantId: variant.productVariantId,
      });

      if (!reserved) {
        throw new ConflictError("This product option is out of stock.");
      }

      const address = await insertBillingAddress({
        client: trx,
        values: {
          address: input.address,
          name: input.name,
          phone: input.phone,
        },
      });

      const order = await insertOrder({
        client: trx,
        values: {
          billingAddressId: address.billingAddressId,
          orderNumber: randomInt(100_000, 1_000_000).toString(),
          organizationId,
          shippingMethodCode: shipping.code,
          shippingMethodId: shipping.shippingMethodId,
          shippingMethodName: shipping.name,
          shippingTotal,
          subtotal,
          total,
        },
      });

      await insertOrderItem({
        client: trx,
        values: {
          orderId: order.orderId,
          productId: variant.productId,
          productName: variant.productName,
          productVariantId: variant.productVariantId,
          productVariantName: variant.variantName,
          quantity: ORDER_QUANTITY,
          sku: variant.sku,
          subtotal,
          total: subtotal,
          unitPrice,
          variantName: variant.variantName,
        },
      });

      return {
        items: [
          {
            productName: variant.productName,
            quantity: ORDER_QUANTITY,
            sku: variant.sku,
            unitPrice,
            variantName: variant.variantName,
          },
        ],
        orderNumber: order.orderNumber,
        productId: variant.productId,
        productSlug: variant.productSlug,
        shippingTotal,
        subtotal,
        total,
      };
    });

    updateTag(
      productCache.tags.variants({
        organizationId,
        productSlug: created.productSlug,
      })
    );
    updateTag(
      productCache.tags.detail({
        organizationId,
        slug: created.productSlug,
      })
    );
    updateTag(
      productCache.tags.detailId({
        organizationId,
        productId: created.productId,
      })
    );
    updateTag(productCache.tags.list({ organizationId }));
    updateTag(orderCache.tags.list({ organizationId }));

    return {
      items: created.items,
      orderNumber: created.orderNumber,
      shippingTotal: created.shippingTotal,
      subtotal: created.subtotal,
      total: created.total,
    };
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function getOrdersUseCase({
  search,
  organizationId,
}: {
  organizationId: string;
  search: OrderSearchParam;
}) {
  "use cache";

  cacheLife(orderCache.profile.list.life);
  cacheTag(orderCache.tags.list({ organizationId }));

  try {
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const rows = await findOrders({ client: trx, organizationId, search });
      const count = await countOrders({ client: trx, organizationId, search });

      return { rawRows: rows, rowCount: count };
    });

    return {
      meta: buildPaginationMeta({
        page: search.page,
        perPage: search.perPage,
        rowCount,
      }),
      rows: toOrdersWithRelations({ rawRows }),
    };
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function findOrderUseCase({
  orderId,
  organizationId,
}: {
  orderId: string;
  organizationId: string;
}) {
  "use cache";

  cacheLife(orderCache.profile.list.life);
  cacheTag(orderCache.tags.detailId({ orderId, organizationId }));

  try {
    const rawRow = await findOrder({ client: db, orderId, organizationId });

    if (!rawRow) {
      throw new NotFoundError("Order not found");
    }

    return {
      row: toOrderWithRelations({ rawRow }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}

export async function updateOrderStatusUseCase({
  orderId,
  organizationId,
  input,
}: {
  orderId: string;
  organizationId: string;
  input: {
    status: OrderStatus;
  };
}) {
  try {
    const res = await db.transaction(async (trx) => {
      const order = await existsOrderOrganizationId({
        client: trx,
        orderId,
        organizationId,
      });

      if (!order) {
        throw new NotFoundError("Order not found");
      }

      return await setOrderStatus({
        client: trx,
        orderId,
        organizationId,
        values: input,
      });
    });

    updateTag(orderCache.tags.list({ organizationId }));
    updateTag(orderCache.tags.detailId({ orderId, organizationId }));

    return res;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function deleteOrderUseCase({
  orderId,
  organizationId,
}: {
  orderId: string;
  organizationId: string;
}) {
  try {
    const res = await db.transaction(async (trx) => {
      const order = await existsOrderOrganizationId({
        client: trx,
        orderId,
        organizationId,
      });

      if (!order) {
        throw new NotFoundError("Order not found");
      }

      return await deleteOrder({
        client: trx,
        orderId,
        organizationId,
      });
    });

    updateTag(orderCache.tags.list({ organizationId }));
    updateTag(orderCache.tags.detailId({ orderId, organizationId }));

    return res;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function getCustomerOrderSummaryUseCase({
  orderNumber,
  organizationId,
}: {
  orderNumber: string;
  organizationId: string;
}) {
  try {
    const result = await findCustomerOrderSummary({
      client: db,
      orderNumber,
      organizationId,
    });

    if (!result) {
      throw new NotFoundError("Order not found");
    }

    return result;
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}
