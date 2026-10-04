import { db } from "@/drizzle/db";
import { findProductSlug } from "@/features/product/data-access/product";
import { findPublicProductVariants } from "@/features/product/data-access/product-variant";
import { toPublicProductVariants } from "@/features/product/dto/product-variants";
import { productCache } from "@/features/product/lib/cache";
import { normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag } from "next/cache";

export async function getProductVariantsUseCase({
  organizationId,
  productSlug,
}: {
  productSlug: string;
  organizationId: string;
}) {
  "use cache";

  cacheLife(productCache.profile.list.life);
  cacheTag(
    productCache.tags.variants({
      organizationId,
      productSlug,
    })
  );

  try {
    const rawRows = await db.transaction(async (trx) => {
      const existing = await findProductSlug({
        client: trx,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const variants = await findPublicProductVariants({
        client: trx,
        organizationId,
        productId: existing.productId,
      });

      return { product: existing, variants };
    });

    return {
      product: rawRows.product,
      variants: toPublicProductVariants({ rawRows: rawRows.variants }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}
