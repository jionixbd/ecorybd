import { db } from "@/drizzle/db";
import { findAvailableVariantShipping } from "@/features/product/data-access/product-variant-shipping";
import { normalizeError } from "@/lib/error";

export async function getAvailableVariantShippingUseCase({
  productVariantId,
}: {
  productVariantId: string;
}) {
  try {
    return await findAvailableVariantShipping({
      client: db,
      productVariantId,
    });
  } catch (error) {
    throw normalizeError(error);
  }
}
