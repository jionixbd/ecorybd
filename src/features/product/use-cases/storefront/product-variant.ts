import { db } from "@/drizzle/db";
import { findProductSlug } from "@/features/product/data-access/product";
import {
  existsProductVariantSlugProductId,
  findPublicProductVariant,
  findPublicProductVariants,
} from "@/features/product/data-access/product-variant";
import {
  toPublicProductVariant,
  toPublicProductVariants,
} from "@/features/product/dto/product-variants";
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
    const existing = await findProductSlug({
      client: db,
      slug: productSlug,
    });

    if (!existing) {
      throw new NotFoundError("Product not found");
    }

    const rawRows = await findPublicProductVariants({
      client: db,
      organizationId,
      productId: existing.productId,
    });

    return {
      product: existing,
      variants: toPublicProductVariants({ rawRows }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}

export async function getProductVariantUseCase({
  organizationId,
  productSlug,
  productVariantSlug,
}: {
  productVariantSlug: string;
  productSlug: string;
  organizationId: string;
}) {
  "use cache";

  cacheLife(productCache.profile.list.life);
  cacheTag(
    productCache.tags.variant({
      organizationId,
      productSlug,
      productVariantSlug,
    })
  );

  try {
    const existing = await findProductSlug({
      client: db,
      slug: productSlug,
    });

    if (!existing) {
      throw new NotFoundError("Product not found");
    }

    const existingVariant = await existsProductVariantSlugProductId({
      client: db,
      productId: existing.productId,
      productVariantSlug,
    });

    if (!existingVariant) {
      throw new NotFoundError("Variant not found");
    }

    const variant = await findPublicProductVariant({
      client: db,
      organizationId,
      productVariantId: existingVariant.productVariantId,
    });

    if (!variant) {
      throw new NotFoundError("Variant not found");
    }

    return {
      product: existing,
      variant: toPublicProductVariant({ rawRow: variant }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}
