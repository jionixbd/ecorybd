import type { DataTableConfig } from "@/features/data-table/lib/config";
import type { FilterItemSchema } from "@/features/data-table/lib/parsers";
import type { ColumnSort } from "@tanstack/react-table";

export interface QueryKeys {
  filters: string;
  joinOperator: string;
  page: string;
  perPage: string;
  sort: string;
}

export interface Option {
  count?: number;
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  label: string;
  value: string;
}

export interface DataTableMeta {
  queryKeys?: QueryKeys;
}

export interface DataTableColumnMeta {
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  label?: string;
  options?: Option[];
  placeholder?: string;
  range?: [number, number];
  unit?: string;
  variant?: FilterVariant;
}
export type FilterOperator = DataTableConfig["operators"][number];
export type FilterVariant = DataTableConfig["filterVariants"][number];
export type JoinOperator = DataTableConfig["joinOperators"][number];

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>;
}
