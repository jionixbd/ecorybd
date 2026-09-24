"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countProducts,
  existsProductOrganizationId,
  existsProductSlugOrganizationId,
  findProduct,
  findProducts,
  findProductSlug,
  insertProduct,
  updateProduct,
} from "@/features/product/data-access/product";
import { insertProductVariant } from "@/features/product/data-access/product-variant";
import {
  toProductsWithRelation,
  toProductWithRelation,
} from "@/features/product/dto/product";
import { productCache } from "@/features/product/lib/cache";
import { generateDefaultVariant } from "@/features/product/lib/default-variant";
import type { ProductSearchParam } from "@/features/product/parsers/product";
import type {
  InsertProductInput,
  UpdateProductInput,
} from "@/features/product/validations/product";
import { requireActiveContext } from "@/lib/auth/required-active-context";
import { ConflictError, normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function getProductsUseCase({
  search,
  organizationId,
}: {
  organizationId: string;
  search: ProductSearchParam;
}) {
  "use cache";

  cacheLife(productCache.profile.list.life);
  cacheTag(productCache.tags.list({ organizationId }));

  try {
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const rows = await findProducts({ client: trx, search });
      const count = await countProducts({ client: trx, search });

      return { rawRows: rows, rowCount: count };
    });

    return {
      meta: buildPaginationMeta({
        page: search.page,
        perPage: search.perPage,
        rowCount,
      }),
      rows: toProductsWithRelation({ rawRows }),
    };
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function insertProductUseCase({
  input,
}: {
  input: InsertProductInput;
}) {
  try {
    const context = await requireActiveContext();

    const data = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId: context.organization.organizationId,
        slug: input.slug,
      });

      if (existing) {
        throw new ConflictError("Product with same slug already exists");
      }

      const result = await insertProduct({
        client: trx,
        organizationId: context.organization.organizationId,
        userId: context.user.userId,
        values: input,
      });

      await insertProductVariant({
        client: trx,
        organizationId: context.organization.organizationId,
        productId: result.productId,
        userId: context.user.userId,
        values: generateDefaultVariant({ productId: result.productId }),
      });

      return result;
    });

    updateTag(
      productCache.tags.list({
        organizationId: context.organization.organizationId,
      })
    );

    return data;
  } catch (error) {
    console.log(error);
    throw normalizeError(error);
  }
}

export async function getProductUseCase({ slug }: { slug: string }) {
  "use cache";

  cacheLife(productCache.profile.detail.life);

  try {
    const rawRow = await db.transaction(async (trx) => {
      const exits = await findProductSlug({ client: trx, slug });

      if (!exits) {
        throw new NotFoundError("Product not found");
      }

      const row = await findProduct({
        client: trx,
        productId: exits.productId,
      });

      return row;
    });

    const data = toProductWithRelation({ rawRow });

    cacheTag(
      productCache.tags.detail({
        organizationId: data.organization.organizationId,
        slug: data.slug,
      }),
      productCache.tags.detailId({
        organizationId: data.organization.organizationId,
        productId: data.productId,
      })
    );
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function updateProductUseCase({
  input,
  productId,
}: {
  productId: string;
  input: UpdateProductInput;
}) {
  try {
    const context = await requireActiveContext();

    const data = await db.transaction(async (trx) => {
      const existing = await existsProductOrganizationId({
        client: trx,
        organizationId: context.organization.organizationId,
        productId,
      });

      if (!existing) {
        throw new NotFoundError(
          "Product not found or you do no haver permission to update it"
        );
      }

      return await updateProduct({
        client: trx,
        productId: existing.productId,
        values: input,
      });
    });

    updateTag(
      productCache.tags.detailId({
        organizationId: context.organization.organizationId,
        productId: data.productId,
      })
    );

    updateTag(
      productCache.tags.list({
        organizationId: context.organization.organizationId,
      })
    );

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
