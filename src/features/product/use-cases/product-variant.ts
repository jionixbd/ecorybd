"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  existsProductSlug,
  existsProductSlugOrganizationId,
} from "@/features/product/data-access/product";
import {
  countProductVariants,
  findProductVariants,
  insertProductVariant,
} from "@/features/product/data-access/product-variant";
import { toProductVariants } from "@/features/product/dto/product-variants";
import type { ProductVariantSearchParam } from "@/features/product/parsers/product-variant";
import type { InsertProductVariantInput } from "@/features/product/validations/product-variant";
import { requireActiveContext } from "@/lib/auth/required-active-context";
import { normalizeError, NotFoundError } from "@/lib/error";

export async function getProductVariantsUseCase({
  search,
  slug,
}: {
  slug: string;
  search: ProductVariantSearchParam;
}) {
  try {
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const existing = await existsProductSlug({ client: trx, slug });

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
    throw normalizeError(error);
  }
}

export async function insertProductVariantUseCase({
  slug,
  input,
}: {
  slug: string;
  input: InsertProductVariantInput;
}) {
  try {
    const context = await requireActiveContext();

    const data = await db.transaction(async (trx) => {
      const existing = await existsProductSlugOrganizationId({
        client: trx,
        organizationId: context.organization.organizationId,
        slug,
      });

      if (!existing) {
        throw new NotFoundError(
          "Product not found or you do no haver permission to update it"
        );
      }

      const result = await insertProductVariant({
        client: trx,
        organizationId: context.organization.organizationId,
        productId: existing.productId,
        userId: context.user.userId,
        values: { ...input, isDefault: false },
      });

      return result;
    });

    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
