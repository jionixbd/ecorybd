"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countProducts,
  findProducts,
} from "@/features/product/data-access/product";
import { toProductWithRelation } from "@/features/product/dto/product";
import type { ProductSearchParam } from "@/features/product/parsers/product";
import { normalizeError } from "@/lib/error";

export const getProductsUseCase = async ({
  search,
}: {
  search: ProductSearchParam;
}) => {
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
      rows: toProductWithRelation({ rawRows }),
    };
  } catch (error) {
    throw normalizeError(error);
  }
};
