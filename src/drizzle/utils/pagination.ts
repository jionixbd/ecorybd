export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const MAX_PER_PAGE = 100;

interface PaginationParams {
  page?: number | string | null;
  perPage?: number | string | null;
}

export function buildPagination(params?: PaginationParams) {
  const rawPage = Number(params?.page);

  const page = !Number.isNaN(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;

  const rawPerPage = Number(params?.perPage);

  let perPage =
    !Number.isNaN(rawPerPage) && rawPerPage > 0 ? rawPerPage : DEFAULT_PER_PAGE;

  if (perPage > MAX_PER_PAGE) {
    perPage = MAX_PER_PAGE;
  }

  const offset = (page - 1) * perPage;

  return {
    currentPage: page,
    limit: perPage,
    offset,
  };
}

export function buildPaginationMeta({
  page,
  perPage,
  rowCount,
}: {
  page: number | string | null | undefined;
  perPage: number | string | null | undefined;
  rowCount: number;
}) {
  const { limit, currentPage } = buildPagination({ page, perPage });

  const pages = rowCount ? Math.ceil(rowCount / limit) : 0;
  const nextPage = currentPage < pages ? currentPage + 1 : null;

  return {
    count: rowCount,
    nextPage,
    pages,
  };
}
