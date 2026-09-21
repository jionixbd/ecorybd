import { buildFilter } from "@/drizzle/utils/filter-builder";
import type {
  ExtendedColumnFilter,
  JoinOperator,
} from "@/features/data-table/types";
import { and, or, type AnyColumn, type SQL, type Table } from "drizzle-orm";

export function getColumn<T extends Table>(
  table: T,
  columnKey: keyof T
): AnyColumn {
  return table[columnKey] as AnyColumn;
}

export function filterColumns<T extends Table>({
  table,
  filters,
  joinOperator,
}: {
  table: T;
  filters: ExtendedColumnFilter<T>[];
  joinOperator: JoinOperator;
}): SQL | undefined {
  const joinFn = joinOperator === "and" ? and : or;

  const conditions = filters.map((filter) => {
    const column = getColumn(table, filter.id);
    return buildFilter(column, filter.operator, filter.value, filter.variant);
  });

  const validConditions = conditions.filter(
    (condition): condition is SQL => condition !== undefined
  );

  return validConditions.length > 0 ? joinFn(...validConditions) : undefined;
}
