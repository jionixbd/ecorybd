"use client";

import type { Inquiry } from "@/drizzle/schema/inquiry";
import { useDataTableAdvancedFilter } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { DataTableAdvancedFilterToggle } from "@/features/data-table/components/advanced/data-table-advanced-filter-toggle";
import { DataTableAdvancedToolbar } from "@/features/data-table/components/advanced/data-table-advanced-toolbar";
import { DataTableAdvancedFilter } from "@/features/data-table/components/advanced/filter/data-table-advanced-filter";
import { DataTableToolbar } from "@/features/data-table/components/base/data-table-toolbar";
import { DataTable } from "@/features/data-table/components/data-table";
import { DataTableSort } from "@/features/data-table/components/sort/data-table-sort";
import { useDataTable } from "@/features/data-table/hooks/use-data-table";
import type { QueryKeys } from "@/features/data-table/types";
import { InquiryTableActionBar } from "@/features/inquiry/components/table/inquiry-table-action-bar";
import { inquiryTableColumns } from "@/features/inquiry/components/table/inquiry-table-columns";

import type { InquiryDataTableRowAction } from "@/features/inquiry/types";
import type { getInquiriesUseCase } from "@/features/inquiry/user-cases/inquiry";
import { use, useMemo, useState } from "react";

interface InquiryTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getInquiriesUseCase>>]>;
  queryKeys?: Partial<QueryKeys>;
}

export function InquiryTable({ promises, queryKeys }: InquiryTableProps) {
  const { enableAdvancedFilter } = useDataTableAdvancedFilter();
  const [data] = use(promises);

  const [, setRowAction] = useState<InquiryDataTableRowAction<Inquiry> | null>(
    null
  );

  const columns = useMemo(
    () =>
      inquiryTableColumns({
        setRowAction,
      }),
    []
  );

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    clearOnDefault: true,
    columns,
    data: data.rows,
    enableAdvancedFilter,
    getRowId: (originalRow) => originalRow.inquiryId,
    initialState: {
      columnPinning: { end: ["actions"], start: [] },
      sorting: [{ desc: true, id: "createdAt" }],
    },
    pageCount: data.meta.pages,
    queryKeys,
    shallow: false,
  });

  const advanceFilter = enableAdvancedFilter ? (
    <DataTableAdvancedToolbar table={table}>
      <DataTableAdvancedFilterToggle />
      <DataTableAdvancedFilter
        align="start"
        debounceMs={debounceMs}
        shallow={shallow}
        table={table}
        throttleMs={throttleMs}
      />
      <DataTableSort align="start" table={table} />
    </DataTableAdvancedToolbar>
  ) : (
    <DataTableToolbar table={table}>
      <DataTableSort align="end" table={table} />
    </DataTableToolbar>
  );

  return (
    <DataTable
      actionBar={<InquiryTableActionBar table={table} />}
      table={table}
    >
      {advanceFilter}
    </DataTable>
  );
}
