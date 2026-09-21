import { type AnyColumn, asc, desc, type SQL } from "drizzle-orm";

export function buildOrderBy({
  sort,
  columns,
  fallback,
}: {
  sort: { id: string; desc: boolean }[] | undefined;
  columns: Record<string, AnyColumn>;
  fallback?: SQL;
}): SQL[] {
  if (!sort || sort.length === 0) {
    return fallback ? [fallback] : [];
  }

  const orderByConditions: SQL[] = [];

  for (const sortItem of sort) {
    const column = columns[sortItem.id];

    if (!column) {
      continue;
    }

    if (sortItem.desc) {
      orderByConditions.push(desc(column));
    } else {
      orderByConditions.push(asc(column));
    }
  }

  if (orderByConditions.length === 0 && fallback) {
    return [fallback];
  }

  return orderByConditions;
}
