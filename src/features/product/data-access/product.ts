"use server";

import type { DbClient } from "@/drizzle/db";
import { organizations, productVariants, users } from "@/drizzle/schema";
import { products, type ProductStatus } from "@/drizzle/schema/product";
import {
  buildMultiSelectFilter,
  buildTextSearchFilter,
} from "@/drizzle/utils/filters";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import { filterColumns } from "@/features/data-table/lib/filter-columns";
import type { ProductSearchParam } from "@/features/product/parsers/product";
import { and, asc, count, eq } from "drizzle-orm";

function buildProductsWhere({ search }: { search: ProductSearchParam }) {
  return and(
    buildTextSearchFilter({ columns: [products.name], value: search.name }),
    buildMultiSelectFilter<ProductStatus>({
      column: products.status,
      values: search.status,
    })
  );
}

export async function findProducts({
  client,
  search,
}: {
  client: DbClient;
  search: ProductSearchParam;
}) {
  const where = search.advanced
    ? filterColumns({
        filters: search.filters,
        joinOperator: search.joinOperator,
        table: products,
      })
    : buildProductsWhere({ search });

  const orderBy = buildOrderBy({
    columns: {
      createdAt: products.createdAt,
      name: products.name,
      status: products.status,
    },
    fallback: asc(products.createdAt),
    sort: search.sort,
  });

  const { limit, offset } = buildPagination({
    page: search.page,
    perPage: search.perPage,
  });

  return await client
    .select()
    .from(products)
    .innerJoin(users, eq(users.userId, products.createdBy))
    .innerJoin(
      organizations,
      eq(organizations.organizationId, products.organizationId)
    )
    .innerJoin(
      productVariants,
      and(
        eq(productVariants.productId, products.productId),
        eq(productVariants.isDefault, true)
      )
    )
    .limit(limit)
    .offset(offset)
    .where(where)
    .orderBy(...orderBy);
}

export async function countProducts({
  client,
  search,
}: {
  client: DbClient;
  search: ProductSearchParam;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(products)
    .where(buildProductsWhere({ search }));

  return result?.count ?? 0;
}
