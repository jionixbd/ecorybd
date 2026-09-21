"use server";

import type { DbClient } from "@/drizzle/db";
import {
  type InquiryProject,
  type InquiryService,
  type InquiryStatus,
  inquiries,
} from "@/drizzle/schema/inquiry";
import {
  buildDateRangeFilter,
  buildMultiSelectFilter,
  buildTextSearchFilter,
} from "@/drizzle/utils/filters";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import { filterColumns } from "@/features/data-table/lib/filter-columns";
import type { InquirySearchParam } from "@/features/inquiry/parsers/inquiry";
import { and, asc, count } from "drizzle-orm";

function buildInquiryWhere({ search }: { search: InquirySearchParam }) {
  return and(
    buildTextSearchFilter({ columns: [inquiries.name], value: search.name }),
    buildMultiSelectFilter<InquiryStatus>({
      column: inquiries.status,
      values: search.status,
    }),
    buildMultiSelectFilter<InquiryProject>({
      column: inquiries.project,
      values: search.project,
    }),
    buildMultiSelectFilter<InquiryService>({
      column: inquiries.service,
      values: search.service,
    }),
    buildDateRangeFilter({
      column: inquiries.createdAt,
      range: [search.createdAt[0], search.createdAt[1]],
    })
  );
}

export async function findInquiries({
  client,
  search,
}: {
  client: DbClient;
  search: InquirySearchParam;
}) {
  const where = search.advanced
    ? filterColumns({
        filters: search.filters,
        joinOperator: search.joinOperator,
        table: inquiries,
      })
    : buildInquiryWhere({ search });

  const orderBy = buildOrderBy({
    columns: {
      createdAt: inquiries.createdAt,
      name: inquiries.name,
      status: inquiries.status,
    },
    fallback: asc(inquiries.createdAt),
    sort: search.sort,
  });
  const { limit, offset } = buildPagination({
    page: search.page,
    perPage: search.perPage,
  });

  return await client
    .select()
    .from(inquiries)
    .where(where)
    .orderBy(...orderBy)
    .limit(limit)
    .offset(offset);
}

export async function countInquiries({
  client,
  search,
}: {
  client: DbClient;
  search: InquirySearchParam;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(inquiries)
    .where(buildInquiryWhere({ search }));

  return result?.count ?? 0;
}
