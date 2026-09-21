import { Button } from "@/components/ui/button";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import { DataTableAdvancedFilterToggle } from "@/features/data-table/components/advanced/data-table-advanced-filter-toggle";
import { DataTableFilter } from "@/features/data-table/components/base/filter/data-table-filter";
import { DataTableViewOptions } from "@/features/data-table/components/common/data-table-view-options";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";
import { type ComponentProps, useCallback, useMemo } from "react";

interface DataTableToolbarProps<TData extends RowData>
  extends ComponentProps<"div"> {
  table: Table<DataTableFeatures, TData>;
}

export function DataTableToolbar<TData extends RowData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  "use no memo";

  const isFiltered = table.store.state.columnFilters.length > 0;

  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      role="toolbar"
      {...props}
    >
      <DataTableAdvancedFilterToggle />
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns.map((column) => (
          <DataTableFilter column={column} key={column.id} />
        ))}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            className="border-dashed"
            onClick={onReset}
            variant="outline"
          >
            <IconPlaceholder
              hugeicons="Cancel01Icon"
              lucide="X"
              phosphor="XIcon"
              remixicon="RiCloseLine"
              tabler="IconX"
            />
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions align="end" table={table} />
      </div>
    </div>
  );
}
