import type { DbClient } from "@/drizzle/db";
import {
  billingAddress,
  orderItems,
  orders,
  productShippingMethods,
  productVariants,
  products,
  shippingMethods,
} from "@/drizzle/schema";
import { and, eq, gt, sql } from "drizzle-orm";

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
