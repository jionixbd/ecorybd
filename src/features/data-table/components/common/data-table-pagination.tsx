import { Button } from "@/components/ui/button";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";

interface DataTablePaginationProps<TData extends RowData>
  extends React.ComponentProps<"div"> {
  pageSizeOptions?: number[];
  table: Table<DataTableFeatures, TData>;
}

export function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  "use no memo";

  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className
      )}
      {...props}
    >
      <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={`${table.store.state.pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-18 data-size:h-8">
              <SelectValue
                placeholder={table.store.state.pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center font-medium text-sm">
          Page {table.store.state.pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            className="hidden size-8 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            size="icon"
            variant="outline"
          >
            <IconPlaceholder
              hugeicons="ArrowLeftDoubleIcon"
              lucide="ChevronsLeft"
              phosphor="CaretDoubleLeftIcon"
              remixicon="RiSkipLeftLine"
              tabler="IconChevronsLeft"
            />
          </Button>
          <Button
            aria-label="Go to previous page"
            className="size-8"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="outline"
          >
            <IconPlaceholder
              hugeicons="ArrowLeft01Icon"
              lucide="ChevronLeft"
              phosphor="CaretLeftIcon"
              remixicon="RiArrowLeftSLine"
              tabler="IconChevronLeft"
            />
          </Button>
          <Button
            aria-label="Go to next page"
            className="size-8"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="outline"
          >
            <IconPlaceholder
              hugeicons="ArrowRight01Icon"
              lucide="ChevronRight"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              tabler="IconChevronRight"
            />
          </Button>
          <Button
            aria-label="Go to last page"
            className="hidden size-8 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            size="icon"
            variant="outline"
          >
            <IconPlaceholder
              hugeicons="ArrowRightDoubleIcon"
              lucide="ChevronsRight"
              phosphor="CaretDoubleRightIcon"
              remixicon="RiSkipRightLine"
              tabler="IconChevronsRight"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
