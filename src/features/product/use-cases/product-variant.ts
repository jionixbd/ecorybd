"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  existsProductSlug,
  existsProductSlugOrganizationId,
} from "@/features/product/data-access/product";
import {
  countProductVariants,
  existsProductVariantProductId,
  existsProductVariantSlugProductId,
  findProductVariants,
  insertProductVariant,
  updateProductVariant,
} from "@/features/product/data-access/product-variant";
import { toProductVariants } from "@/features/product/dto/product-variants";
import { productCache } from "@/features/product/lib/cache";
import type { ProductVariantSearchParam } from "@/features/product/parsers/product-variant";
import type {
  InsertProductVariantInput,
  UpdateProductVariantInput,
} from "@/features/product/validations/product-variant";
import { requireActiveContext } from "@/lib/auth/required-active-context";
import { ConflictError, normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function getProductVariantsUseCase({
  search,
  organizationId,
  productSlug,
}: {
  productSlug: string;
  organizationId: string;
  search: ProductVariantSearchParam;
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
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const existing = await existsProductSlug({
        client: trx,
        slug: productSlug,
      });

      if (!existing) {
        throw new NotFoundError("Product not found");
      }

      const rows = await findProductVariants({
        client: trx,
        productId: existing.productId,
        search,
      });
      const count = await countProductVariants({
        client: trx,
        productId: existing.productId,
        search,
      });

      return { rawRows: rows, rowCount: count };
    });

    return {
      meta: buildPaginationMeta({
        page: search.page,
        perPage: search.perPage,
        rowCount,
      }),
      rows: toProductVariants({ rawRows }),
    };
  } catch (error) {
    const appError = normalizeError(error);

    if (appError.code === "NOT_FOUND") {
      return null;
    }

    throw appError;
  }
}

export async function insertProductVariantUseCase({
  productSlug,
  input,
}: {
  productSlug: string;
  input: InsertProductVariantInput;
}) {
  try {
    const context = await requireActiveContext();

    const data = await db.transaction(async (trx) => {
      const product = await existsProductSlugOrganizationId({
        client: trx,
        organizationId: context.organization.organizationId,
        slug: productSlug,
      });

      if (!product) {
        throw new NotFoundError(
          "Product not found or you do no haver permission to update it"
        );
      }

      const existing = await existsProductVariantSlugProductId({
        client: trx,
        productId: product.productId,
        productVariantSlug: input.slug,
      });

      if (existing) {
        throw new ConflictError("Product variant with slug already exists");
      }

      const result = await insertProductVariant({
        client: trx,
        organizationId: context.organization.organizationId,
        productId: product.productId,
        userId: context.user.userId,
        values: { ...input, isDefault: false },
      });

      return result;
    });

    updateTag(
      productCache.tags.variants({
        organizationId: data.organizationId,
        productSlug,
      })
    );

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function updateProductVariantUseCase({
  productSlug,
  productVariantId,
  input,
}: {
  productSlug: string;
  productVariantId: string;
  input: UpdateProductVariantInput;
}) {
  try {
    const context = await requireActiveContext();

    const data = await db.transaction(async (trx) => {
      const product = await existsProductSlugOrganizationId({
        client: trx,
        organizationId: context.organization.organizationId,
        slug: productSlug,
      });

      if (!product) {
        throw new NotFoundError(
          "Product not found or you do no haver permission to update it"
        );
      }

      const existing = await existsProductVariantProductId({
        client: trx,
        productId: product.productId,
        productVariantId,
      });

      if (!existing) {
        throw new NotFoundError(
          "Product not found or you do no haver permission to update it"
        );
      }

      const result = await updateProductVariant({
        client: trx,
        organizationId: context.organization.organizationId,
        productId: product.productId,
        productVariantId,
        userId: context.user.userId,
        values: { ...input },
      });

      return result;
    });

    updateTag(
      productCache.tags.variants({
        organizationId: data.organizationId,
        productSlug,
      })
    );

    if (data.isDefault) {
      updateTag(
        productCache.tags.detailId({
          organizationId: data.organizationId,
          productId: data.productId,
        })
      );
    }

    return data;
  } catch (error) {
    console.log(error);
    throw normalizeError(error);
  }
}
