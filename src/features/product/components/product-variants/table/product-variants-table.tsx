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
import { ProductVariantsCreate } from "@/features/product/components/product-variants/product-veriants-create";
import { ProductVariantsTableActionBar } from "@/features/product/components/product-variants/table/products-table-action-bar";
import { productVariantsTableColumns } from "@/features/product/components/product-variants/table/products-table-columns";
import type {
  ProductVariantsRowAction,
  ProductVariantWithRelations,
} from "@/features/product/types/product-variant";
import type { getProductVariantsUseCase } from "@/features/product/use-cases/product-variant";
import { use, useMemo, useState } from "react";

interface ProductVariantsTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getProductVariantsUseCase>>]>;
  queryKeys?: Partial<QueryKeys>;
}

export function ProductVariantsTable({
  promises,
  queryKeys,
}: ProductVariantsTableProps) {
  "use no memo";

  const { enableAdvancedFilter } = useDataTableAdvancedFilter();
  const [data] = use(promises);

  const [, setRowAction] =
    useState<ProductVariantsRowAction<ProductVariantWithRelations> | null>(
      null
    );

  const columns = useMemo(
    () =>
      productVariantsTableColumns({
        setRowAction,
      }),
    []
  );

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    clearOnDefault: true,
    columns,
    data: data.rows,
    enableAdvancedFilter,
    getRowId: (originalRow) => originalRow.productVariantId,
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
      <DataTableSort table={table} />
      <ProductVariantsCreate />
    </DataTableToolbar>
  );

  return (
    <div className="grid h-full w-full max-w-5xl rounded-2xl bg-muted/30">
      <DataTable
        actionBar={<ProductVariantsTableActionBar table={table} />}
        className="w-full p-4"
        table={table}
      >
        {advanceFilter}
      </DataTable>
    </div>
  );
}
