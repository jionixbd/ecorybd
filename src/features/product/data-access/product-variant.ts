import type { DbClient } from "@/drizzle/db";
import { productVariants } from "@/drizzle/schema";
import type { InsertProductVariantInput } from "@/features/product/validations/product-variant";

export async function insertProductVariant({
  client,
  organizationId,
  userId,
  productId,
  values,
}: {
  client: DbClient;
  organizationId: string;
  userId: string;
  productId: string;
  values: InsertProductVariantInput;
}) {
  const [result] = await client
    .insert(productVariants)
    .values({
      ...values,
      createdBy: userId,
      organizationId,
      price: values.price.toString(),
      productId,
      salePrice: values.salePrice?.toString(),
    })
    .returning();

  return result;
}
