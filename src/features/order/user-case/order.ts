"use server";

import { db } from "@/drizzle/db";
import {
  findOrderableVariant,
  findOrderShippingMethod,
  insertBillingAddress,
  insertOrder,
  insertOrderItem,
  reserveVariantStock,
} from "@/features/order/data-access/order";
import type { OrderFormInput } from "@/features/order/validation/order";
import { productCache } from "@/features/product/lib/cache";
import {
  ConflictError,
  normalizeError,
  NotFoundError,
  ValidationError,
} from "@/lib/error";
import { updateTag } from "next/cache";
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
        orderNumber: order.orderNumber,
        productId: variant.productId,
        productSlug: variant.productSlug,
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

    return {
      orderNumber: created.orderNumber,
      total: created.total,
    };
  } catch (error) {
    throw normalizeError(error);
  }
}
