"use client";

import { useDataTableAdvancedFilter } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { DataTableAdvancedFilterToggle } from "@/features/data-table/components/advanced/data-table-advanced-filter-toggle";
import { DataTableAdvancedToolbar } from "@/features/data-table/components/advanced/data-table-advanced-toolbar";
import { DataTableAdvancedFilter } from "@/features/data-table/components/advanced/filter/data-table-advanced-filter";
import { DataTableToolbar } from "@/features/data-table/components/base/data-table-toolbar";
import { DataTable } from "@/features/data-table/components/data-table";
import { DataTableSort } from "@/features/data-table/components/sort/data-table-sort";
import { useDataTable } from "@/features/data-table/hooks/use-data-table";
import type { QueryKeys } from "@/features/data-table/types";
import { ProductTableActionBar } from "@/features/product/components/products/table/products-table-action-bar";
import { productsTableColumns } from "@/features/product/components/products/table/products-table-columns";
import type {
  ProductsTableRowAction,
  ProductWithRelations,
} from "@/features/product/types/product";
import type { getProductsUseCase } from "@/features/product/use-cases/product";
import { use, useMemo, useState } from "react";

interface ProductsTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getProductsUseCase>>]>;
  queryKeys?: Partial<QueryKeys>;
}

export function ProductsTable({ promises, queryKeys }: ProductsTableProps) {
  "use no memo";

  const { enableAdvancedFilter } = useDataTableAdvancedFilter();
  const [data] = use(promises);

  const [, setRowAction] =
    useState<ProductsTableRowAction<ProductWithRelations> | null>(null);

  const columns = useMemo(
    () =>
      productsTableColumns({
        setRowAction,
      }),
    []
  );

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    clearOnDefault: true,
    columns,
    data: data.rows,
    enableAdvancedFilter,
    getRowId: (originalRow) => originalRow.productId,
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
    <div className="grid h-full w-full bg-muted/30">
      <DataTable
        actionBar={<ProductTableActionBar table={table} />}
        className="h-[calc(100vh-136px)] w-full p-4"
        table={table}
      >
        {advanceFilter}
      </DataTable>
    </div>
  );
}
