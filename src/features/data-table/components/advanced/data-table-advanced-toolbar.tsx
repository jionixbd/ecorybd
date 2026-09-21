"use client";

import { DataTableViewOptions } from "@/features/data-table/components/common/data-table-view-options";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";

interface DataTableAdvancedToolbarProps<TData extends RowData>
  extends React.ComponentProps<"div"> {
  table: Table<DataTableFeatures, TData>;
}

export function DataTableAdvancedToolbar<TData extends RowData>({
  table,
  children,
  className,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
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
      <div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions align="end" table={table} />
      </div>
    </div>
  );
}
