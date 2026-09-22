import { useDebouncedCallback } from "@/features/data-table/hooks/use-debounced-callback";
import { getSortingStateParser } from "@/features/data-table/lib/parsers";
import {
  type DataTableFeatures,
  dataTableFeatures,
} from "@/features/data-table/lib/table-features";
import type {
  ExtendedColumnSort,
  QueryKeys,
} from "@/features/data-table/types";
import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  useTable,
} from "@tanstack/react-table";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  type SingleParser,
  useQueryState,
  type UseQueryStateOptions,
  useQueryStates,
} from "nuqs";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";

const PAGE_KEY = "page";
const PER_PAGE_KEY = "perPage";
const SORT_KEY = "sort";
const FILTERS_KEY = "filters";
const JOIN_OPERATOR_KEY = "joinOperator";
const ARRAY_SEPARATOR = ",";
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;
const FILTERING_COLUMN_REGEX = /[^a-zA-Z0-9]/;
const FILTERING_COLUMN_REGEX_PLUS = /[^a-zA-Z0-9]+/;

interface UseDataTableProps<TData extends RowData>
  extends Omit<
      TableOptions<DataTableFeatures, TData>,
      | "state"
      | "pageCount"
      | "features"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<DataTableFeatures, TData>, "pageCount">> {
  clearOnDefault?: boolean;
  debounceMs?: number;
  enableAdvancedFilter?: boolean;
  history?: "push" | "replace";
  initialState?: Omit<Partial<TableState<DataTableFeatures>>, "sorting"> & {
    sorting?: ExtendedColumnSort<TData>[];
  };
  queryKeys?: Partial<QueryKeys>;
  scroll?: boolean;
  shallow?: boolean;
  startTransition?: React.TransitionStartFunction;
  throttleMs?: number;
}

export function useDataTable<TData extends RowData>(
  props: UseDataTableProps<TData>
) {
  "use no memo";

  const {
    columns,
    pageCount,
    initialState,
    queryKeys,
    history = "replace",
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    clearOnDefault = false,
    enableAdvancedFilter = false,
    scroll = false,
    shallow = true,
    startTransition,
    ...tableProps
  } = props;
  const pageKey = queryKeys?.page ?? PAGE_KEY;
  const perPageKey = queryKeys?.perPage ?? PER_PAGE_KEY;
  const sortKey = queryKeys?.sort ?? SORT_KEY;
  const filtersKey = queryKeys?.filters ?? FILTERS_KEY;
  const joinOperatorKey = queryKeys?.joinOperator ?? JOIN_OPERATOR_KEY;

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(
    () => ({
      clearOnDefault,
      debounceMs,
      history,
      scroll,
      shallow,
      startTransition,
      throttleMs,
    }),
    [
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    ]
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );

  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>(initialState?.columnVisibility ?? {});

  const [page, setPage] = useQueryState(
    pageKey,
    parseAsInteger.withOptions(queryStateOptions).withDefault(1)
  );

  const [perPage, setPerPage] = useQueryState(
    perPageKey,
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 20)
  );

  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: perPage,
    }),
    [page, perPage]
  );

  const onPaginationChange = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue(pagination);
        setPage(newPagination.pageIndex + 1);
        setPerPage(newPagination.pageSize);
      } else {
        setPage(updaterOrValue.pageIndex + 1);
        setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage]
  );

  const columnIds = React.useMemo(
    () =>
      new Set(columns.map((column) => column.id).filter(Boolean) as string[]),
    [columns]
  );

  const [sorting, setSorting] = useQueryState(
    sortKey,
    getSortingStateParser<TData>(columnIds)
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? [])
  );

  const onSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === "function") {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting as ExtendedColumnSort<TData>[]);
      } else {
        setSorting(updaterOrValue as ExtendedColumnSort<TData>[]);
      }
    },
    [sorting, setSorting]
  );

  const filterableColumns = React.useMemo(() => {
    if (enableAdvancedFilter) {
      return [];
    }

    return columns.filter((column) => column.enableColumnFilter);
  }, [columns, enableAdvancedFilter]);

  const filterParsers = useMemo(() => {
    if (enableAdvancedFilter) {
      return {};
    }

    return filterableColumns.reduce<
      Record<string, SingleParser<string> | SingleParser<string[]>>
    >((acc, column) => {
      if (column.meta?.options) {
        acc[column.id ?? ""] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR
        ).withOptions(queryStateOptions);
      } else {
        acc[column.id ?? ""] = parseAsString.withOptions(queryStateOptions);
      }
      return acc;
    }, {});
  }, [filterableColumns, queryStateOptions, enableAdvancedFilter]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filterValues) => {
      setPage(1);
      setFilterValues(values);
    },
    debounceMs
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    if (enableAdvancedFilter) {
      return [];
    }

    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          const processedValue = Array.isArray(value)
            ? value
            : // biome-ignore lint/style/noNestedTernary: Ok
              typeof value === "string" && FILTERING_COLUMN_REGEX.test(value)
              ? value.split(FILTERING_COLUMN_REGEX_PLUS).filter(Boolean)
              : [value];

          filters.push({
            id: key,
            value: processedValue,
          });
        }
        return filters;
      },
      []
    );
  }, [filterValues, enableAdvancedFilter]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) {
        return;
      }

      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates = next.reduce<
          Record<string, string | string[] | null>
        >((acc, filter) => {
          if (filterableColumns.find((column) => column.id === filter.id)) {
            acc[filter.id] = filter.value as string | string[];
          }
          return acc;
        }, {});

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns, enableAdvancedFilter]
  );

  const table = useTable({
    ...tableProps,
    columns,
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    features: dataTableFeatures,
    initialState,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    meta: {
      ...tableProps.meta,
      queryKeys: {
        filters: filtersKey,
        joinOperator: joinOperatorKey,
        page: pageKey,
        perPage: perPageKey,
        sort: sortKey,
      },
    },
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    pageCount,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
  });

  return React.useMemo(
    () => ({ debounceMs, shallow, table, throttleMs }),
    [table, shallow, debounceMs, throttleMs]
  );
}
