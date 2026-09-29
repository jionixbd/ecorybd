import type { DbClient } from "@/drizzle/db";
import {
  type OrderStatus,
  billingAddress,
  orderItems,
  orders,
  organizations,
  productShippingMethods,
  productVariants,
  products,
  shippingMethods,
} from "@/drizzle/schema";
import { buildMultiSelectFilter } from "@/drizzle/utils/filters";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import { filterColumns } from "@/features/data-table/lib/filter-columns";
import type { OrderSearchParam } from "@/features/order/parsers/order";
import { and, asc, count, eq, gt, sql } from "drizzle-orm";

function buildOrdersWhere({
  search,
  organizationId,
}: {
  search: OrderSearchParam;
  organizationId: string;
}) {
  return and(
    // buildTextSearchFilter({ columns: [orders.], value: search.name }),
    eq(orders.organizationId, organizationId),
    buildMultiSelectFilter<OrderStatus>({
      column: orders.status,
      values: search.status,
    })
  );
}

export async function existsOrderOrganizationId({
  client,
  organizationId,
  orderId,
}: {
  client: DbClient;
  organizationId: string;
  orderId: string;
}) {
  const [result] = await client
    .select({ orderId: orders.orderId })
    .from(orders)
    .where(
      and(
        eq(orders.orderId, orderId),
        eq(orders.organizationId, organizationId)
      )
    );

  return result;
}

export async function findOrderableVariant({
  client,
  organizationId,
  productVariantId,
}: {
  client: DbClient;
  organizationId: string;
  productVariantId: string;
}) {
  const [row] = await client
    .select({
      price: productVariants.price,
      productId: products.productId,
      productName: products.name,
      productSlug: products.slug,
      productVariantId: productVariants.productVariantId,
      salePrice: productVariants.salePrice,
      sku: productVariants.sku,
      stockQuantity: productVariants.stockQuantity,
      variantName: productVariants.name,
    })
    .from(productVariants)
    .innerJoin(products, eq(products.productId, productVariants.productId))
    .where(
      and(
        eq(productVariants.productVariantId, productVariantId),
        eq(productVariants.organizationId, organizationId),
        eq(products.organizationId, organizationId),
        eq(productVariants.status, "published"),
        eq(products.status, "published")
      )
    )
    .for("update", { of: [productVariants, products] });

  return row;
}

export async function findOrderShippingMethod({
  client,
  organizationId,
  productVariantId,
  shippingMethodId,
}: {
  client: DbClient;
  organizationId: string;
  productVariantId: string;
  shippingMethodId: string;
}) {
  const [row] = await client
    .select({
      charge: shippingMethods.charge,
      code: shippingMethods.code,
      name: shippingMethods.name,
      shippingMethodId: shippingMethods.shippingMethodId,
    })
    .from(productShippingMethods)
    .innerJoin(
      shippingMethods,
      eq(
        shippingMethods.shippingMethodId,
        productShippingMethods.shippingMethodId
      )
    )
    .where(
      and(
        eq(productShippingMethods.productVariantId, productVariantId),
        eq(productShippingMethods.shippingMethodId, shippingMethodId),
        eq(shippingMethods.organizationId, organizationId)
      )
    )
    .for("share", { of: shippingMethods });

  return row;
}

export async function reserveVariantStock({
  client,
  productVariantId,
}: {
  client: DbClient;
  productVariantId: string;
}) {
  const [row] = await client
    .update(productVariants)
    .set({
      stockQuantity: sql`${productVariants.stockQuantity} - 1`,
    })
    .where(
      and(
        eq(productVariants.productVariantId, productVariantId),
        eq(productVariants.status, "published"),
        gt(productVariants.stockQuantity, 0)
      )
    )
    .returning({ productVariantId: productVariants.productVariantId });

  return row;
}

export async function insertBillingAddress({
  client,
  values,
}: {
  client: DbClient;
  values: typeof billingAddress.$inferInsert;
}) {
  const [row] = await client.insert(billingAddress).values(values).returning();
  return row;
}

export async function insertOrder({
  client,
  values,
}: {
  client: DbClient;
  values: typeof orders.$inferInsert;
}) {
  const [row] = await client.insert(orders).values(values).returning();
  return row;
}

export async function insertOrderItem({
  client,
  values,
}: {
  client: DbClient;
  values: typeof orderItems.$inferInsert;
}) {
  const [row] = await client.insert(orderItems).values(values).returning();
  return row;
}

export async function findOrders({
  client,
  search,
  organizationId,
}: {
  client: DbClient;
  search: OrderSearchParam;
  organizationId: string;
}) {
  const where = search.advanced
    ? filterColumns({
        filters: search.filters,
        joinOperator: search.joinOperator,
        table: orders,
      })
    : buildOrdersWhere({ organizationId, search });

  const orderBy = buildOrderBy({
    columns: {
      createdAt: orders.createdAt,
      status: orders.status,
    },
    fallback: asc(orders.createdAt),
    sort: search.sort,
  });

  const { limit, offset } = buildPagination({
    page: search.page,
    perPage: search.perPage,
  });

  return await client
    .select()
    .from(orders)
    .innerJoin(
      organizations,
      eq(organizations.organizationId, orders.organizationId)
    )
    .innerJoin(
      billingAddress,
      eq(billingAddress.billingAddressId, orders.billingAddressId)
    )
    .innerJoin(orderItems, eq(orderItems.orderId, orders.orderId))
    .limit(limit)
    .offset(offset)
    .where(where)
    .orderBy(...orderBy);
}

export async function countOrders({
  client,
  search,
  organizationId,
}: {
  client: DbClient;
  search: OrderSearchParam;
  organizationId: string;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(orders)
    .where(buildOrdersWhere({ organizationId, search }));

  return result?.count ?? 0;
}

export async function findOrder({
  client,
  orderId,
  organizationId,
}: {
  client: DbClient;
  orderId: string;
  organizationId: string;
}) {
  const [result] = await client
    .select()
    .from(orders)
    .innerJoin(
      organizations,
      eq(organizations.organizationId, orders.organizationId)
    )
    .innerJoin(
      billingAddress,
      eq(billingAddress.billingAddressId, orders.billingAddressId)
    )
    .innerJoin(orderItems, eq(orderItems.orderId, orders.orderId))

    .where(
      and(
        eq(orders.orderId, orderId),
        eq(orders.organizationId, organizationId)
      )
    );

  return result;
}

export async function setOrderStatus({
  client,
  orderId,
  organizationId,
  values,
}: {
  client: DbClient;
  organizationId: string;
  orderId: string;
  values: {
    status: OrderStatus;
  };
}) {
  const [result] = await client
    .update(orders)
    .set(values)
    .where(
      and(
        eq(orders.orderId, orderId),
        eq(orders.organizationId, organizationId)
      )
    )
    .returning();

  return result;
}

export async function deleteOrder({
  client,
  orderId,
  organizationId,
}: {
  client: DbClient;
  organizationId: string;
  orderId: string;
}) {
  const [result] = await client
    .delete(orders)
    .where(
      and(
        eq(orders.orderId, orderId),
        eq(orders.organizationId, organizationId)
      )
    )
    .returning();

  return result;
}

export async function findCustomerOrderSummary({
  client,
  orderNumber,
  organizationId,
}: {
  client: DbClient;
  orderNumber: string;
  organizationId: string;
}) {
  const [order] = await client
    .select({
      createdAt: orders.createdAt,
      orderId: orders.orderId,
      orderNumber: orders.orderNumber,
      shippingTotal: orders.shippingTotal,
      status: orders.status,
      subtotal: orders.subtotal,
      total: orders.total,
    })
    .from(orders)
    .where(
      and(
        eq(orders.orderNumber, orderNumber),
        eq(orders.organizationId, organizationId)
      )
    );

  if (!order) {
    return null;
  }

  const items = await client
    .select({
      productName: orderItems.productName,
      subtotal: orderItems.subtotal,
      unitPrice: orderItems.unitPrice,
      variantName: orderItems.productVariantName,
    })
    .from(orderItems)
    .where(eq(orderItems.orderId, order.orderId));

  return { ...order, items };
}
