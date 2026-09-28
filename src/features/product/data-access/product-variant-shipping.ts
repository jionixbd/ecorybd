import type { DbClient } from "@/drizzle/db";
import { productVariants } from "@/drizzle/schema/product-variant";
import {
  productShippingMethods,
  shippingMethods,
} from "@/drizzle/schema/shipping-method";
import { and, asc, eq } from "drizzle-orm";

export async function findAvailableVariantShipping({
  client,
  productVariantId,
}: {
  client: DbClient;
  productVariantId: string;
}) {
  return await client
    .select({
      charge: shippingMethods.charge,
      code: shippingMethods.code,
      description: shippingMethods.description,
      label: shippingMethods.label,
      name: shippingMethods.name,
      shippingMethodId: shippingMethods.shippingMethodId,
    })
    .from(productShippingMethods)
    .innerJoin(
      productVariants,
      eq(
        productVariants.productVariantId,
        productShippingMethods.productVariantId
      )
    )
    .innerJoin(
      shippingMethods,
      and(
        eq(
          shippingMethods.shippingMethodId,
          productShippingMethods.shippingMethodId
        ),
        eq(shippingMethods.organizationId, productVariants.organizationId)
      )
    )
    .where(
      and(
        eq(productVariants.productVariantId, productVariantId),
        eq(productVariants.status, "published")
      )
    )
    .orderBy(asc(shippingMethods.charge), asc(shippingMethods.name));
}
