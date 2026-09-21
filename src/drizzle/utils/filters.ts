import {
  and,
  arrayContains,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  or,
  type AnyColumn,
  type SQL,
} from "drizzle-orm";

const startOfDay = (d: string | Date | number) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

const endOfDay = (d: string | Date | number) => {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);
  return date;
};

export function buildDateRangeFilter({
  column,
  range,
}: {
  column: AnyColumn;
  range?: (string | Date | undefined | number | null)[];
}): SQL | undefined {
  if (!range || range.length === 0) {
    return undefined;
  }
  const [start, end] = range;

  const startCondition = start ? gte(column, startOfDay(start)) : undefined;
  const endCondition = end ? lte(column, endOfDay(end)) : undefined;

  if (startCondition && endCondition) {
    return and(startCondition, endCondition);
  }

  return startCondition ?? endCondition;
}

export function buildTextSearchFilter({
  columns,
  value,
}: {
  columns: AnyColumn[];
  value?: string | null;
}): SQL | undefined {
  if (!value || value.trim() === "") {
    return undefined;
  }

  const term = `%${value.trim()}%`;
  const conditions = columns.map((col) => ilike(col, term));

  if (conditions.length === 0) {
    return undefined;
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  return or(...conditions);
}

export function buildMultiSelectFilter<T>({
  column,
  values,
}: {
  column: AnyColumn;
  values?: T[] | null;
}): SQL | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  return inArray(column, values);
}

export function buildNumericRangeFilter({
  column,
  range,
}: {
  column: AnyColumn;
  range?: [number | undefined | null, number | undefined | null];
}): SQL | undefined {
  if (!range) {
    return undefined;
  }

  const [min, max] = range;

  const minCondition = typeof min === "number" ? gte(column, min) : undefined;
  const maxCondition = typeof max === "number" ? lte(column, max) : undefined;

  if (minCondition && maxCondition) {
    return and(minCondition, maxCondition);
  }
  return minCondition ?? maxCondition;
}

export function buildBooleanFilter({
  column,
  value,
}: {
  column: AnyColumn;
  value?: boolean | string | null;
}): SQL | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const boolValue = typeof value === "string" ? value === "true" : value;
  return eq(column, boolValue);
}

export function buildArrayContainsFilter<T>({
  column,
  values,
}: {
  column: AnyColumn;
  values?: T[] | null;
}): SQL | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  return arrayContains(column, values);
}
