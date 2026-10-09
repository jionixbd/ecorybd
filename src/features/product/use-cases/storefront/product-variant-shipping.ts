import { db } from "@/drizzle/db";
import { findAvailableVariantShipping } from "@/features/product/data-access/product-variant-shipping";
import { productCache } from "@/features/product/lib/cache";
import { normalizeError } from "@/lib/error";
import { cacheLife, cacheTag } from "next/cache";

export async function getAvailableVariantShippingUseCase({
  productVariantId,
}: {
  productVariantId: string;
}) {
  "use cache";
  cacheLife(productCache.profile.list.life);
  cacheTag(
    productCache.tags.variantShipping({
      productVariantId,
    })
  );

  try {
    const result = await findAvailableVariantShipping({
      client: db,
      productVariantId,
    });

    return {
      result,
    };
  } catch (error) {
    throw normalizeError(error);
  }
}
