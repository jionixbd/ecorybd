"use server";
import { db } from "@/drizzle/db";
import { existsMediaOrganizationId } from "@/features/media/data-access/media";
import { existsProductSlugOrganizationId } from "@/features/product/data-access/product";
import {
  attachProductMedia,
  countProductMedia,
  detachProductMedia,
  existsProductMediaId,
  findProductMedia,
  nextProductMediaPosition,
  setFeaturedProductMedia,
  setFeaturedProductMediaFalse,
} from "@/features/product/data-access/product-media";
import { toProductMedia } from "@/features/product/dto/product-media";
import { productCache } from "@/features/product/lib/cache";
import { ConflictError, normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function getProductMediaUseCase({
  organizationId,
  productSlug,
}: {
  productSlug: string;
  organizationId: string;
}) {
  "use cache";

  cacheLife(productCache.profile.list.life);
  cacheTag(
    productCache.tags.media({
      organizationId,
      productSlug,
    })
  );

  try {
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const rows = await findProductMedia({
        client: trx,
        productId: existing.productId,
      });
      const count = await countProductMedia({
        client: trx,
        productId: existing.productId,
      });

      return { rawRows: rows, rowCount: count };
    });

    return {
      meta: {
        count: rowCount,
      },
      rows: toProductMedia({ rawRows }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}

export async function attachProductMediaUseCase({
  organizationId,
  productSlug,
  mediaId,
}: {
  productSlug: string;
  organizationId: string;
  mediaId: string;
}) {
  try {
    const data = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const existingMedia = await existsMediaOrganizationId({
        client: trx,
        mediaId,
        organizationId,
      });

      if (!existingMedia) {
        throw new NotFoundError("Media not found");
      }

      const existingAttachment = await existsProductMediaId({
        client: trx,
        mediaId,
        productId: existing.productId,
      });

      if (existingAttachment) {
        throw new ConflictError("Media already attached to product");
      }

      const position = await nextProductMediaPosition({
        client: trx,
        productId: existing.productId,
      });

      const result = await attachProductMedia({
        client: trx,
        mediaId,
        productId: existing.productId,
        values: {
          isFeatured: position === 0,
          position,
        },
      });

      return result;
    });

    updateTag(
      productCache.tags.media({
        organizationId,
        productSlug,
      })
    );

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function detachProductMediaUseCase({
  organizationId,
  productSlug,
  mediaId,
}: {
  productSlug: string;
  organizationId: string;
  mediaId: string;
}) {
  try {
    const data = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const existingMedia = await existsMediaOrganizationId({
        client: trx,
        mediaId,
        organizationId,
      });

      if (!existingMedia) {
        throw new NotFoundError("Media not found");
      }

      const existingAttachment = await existsProductMediaId({
        client: trx,
        mediaId,
        productId: existing.productId,
      });

      if (!existingAttachment) {
        throw new NotFoundError("Media not attached to product");
      }

      const result = await detachProductMedia({
        client: trx,
        mediaId,
        productId: existing.productId,
      });

      return result;
    });

    updateTag(
      productCache.tags.media({
        organizationId,
        productSlug,
      })
    );

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function setFeaturedProductMediaUseCase({
  organizationId,
  productSlug,
  mediaId,
}: {
  productSlug: string;
  organizationId: string;
  mediaId: string;
}) {
  try {
    const data = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const existingMedia = await existsMediaOrganizationId({
        client: trx,
        mediaId,
        organizationId,
      });

      if (!existingMedia) {
        throw new NotFoundError("Media not found");
      }

      const existingAttachment = await existsProductMediaId({
        client: trx,
        mediaId,
        productId: existing.productId,
      });

      if (!existingAttachment) {
        throw new NotFoundError("Media not attached to product");
      }

      await setFeaturedProductMediaFalse({
        client: trx,
        productId: existing.productId,
      });

      const result = await setFeaturedProductMedia({
        client: trx,
        mediaId,
        productId: existing.productId,
      });

      return result;
    });

    updateTag(
      productCache.tags.media({
        organizationId,
        productSlug,
      })
    );

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
