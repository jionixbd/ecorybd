import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/features/data-table/components/common/data-table-pagination";
import { getColumnPinningStyle } from "@/features/data-table/lib/column-pinning-style";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import {
  flexRender,
  type RowData,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { cn } from "cn";
import type * as React from "react";
interface DataTableProps<TData extends RowData>
  extends React.ComponentProps<"div"> {
  actionBar?: React.ReactNode;
  table: TanstackTable<DataTableFeatures, TData>;
}

export function DataTable<TData extends RowData>({
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  "use no memo";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-2.5 overflow-auto rounded-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2.5 rounded-md bg-sidebar py-1">
        {children}
      </div>

      <div className="overflow-hidden rounded-md border">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="h-14"
                      colSpan={header.colSpan}
                      key={header.id}
                      style={{
                        ...getColumnPinningStyle({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="h-14"
                        key={cell.id}
                        style={{
                          ...getColumnPinningStyle({ column: cell.column }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={table.getAllColumns().length}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="mt-auto flex flex-col gap-2.5 rounded-md bg-sidebar py-1">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
