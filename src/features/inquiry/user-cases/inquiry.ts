import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countInquiries,
  findInquiries,
} from "@/features/inquiry/data-access/inquiry";
import type { InquirySearchParam } from "@/features/inquiry/parsers/inquiry";
import { normalizeError } from "@/lib/error";

export const getInquiriesUseCase = async ({
  search,
}: {
  search: InquirySearchParam;
}) => {
  try {
    const { rawRows, rowCount } = await db.transaction(async (trx) => {
      const rows = await findInquiries({ client: trx, search });
      const count = await countInquiries({ client: trx, search });

      return { rawRows: rows, rowCount: count };
    });

    return {
      meta: buildPaginationMeta({
        page: search.page,
        perPage: search.perPage,
        rowCount,
      }),
      rows: rawRows,
    };
  } catch (error) {
    throw normalizeError(error);
  }
};
