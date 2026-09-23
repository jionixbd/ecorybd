"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countProducts,
  existsProductOrganizationId,
  findProduct,
  findProducts,
  findProductSlug,
  updateProduct,
} from "@/features/product/data-access/product";
import {
  toProductsWithRelation,
  toProductWithRelation,
} from "@/features/product/dto/product";
import { productCache } from "@/features/product/lib/cache";
import type { ProductSearchParam } from "@/features/product/parsers/product";
import type { UpdateProductInput } from "@/features/product/validations/product";
import { requireActiveContext } from "@/lib/auth/required-active-context";
import { normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";

export async function getProductsUseCase({
  search,
}: {
  search: ProductSearchParam;
}) {
  "use cache";
  cacheLife(productCache.profile.list.life);
  cacheTag(productCache.tags.list());

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

export async function getProductUseCase({ slug }: { slug: string }) {
  "use cache";
  cacheLife(productCache.profile.detail.life);

  try {
    const rawRow = await db.transaction(async (trx) => {
      const exits = await findProductSlug({ client: trx, slug });

      console.log("🥰");

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

    revalidateTag(productCache.tags.list(), "max");

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
