"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "cn";

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<DataTableFeatures, TData, TValue>;
  label: string;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  label,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  "use no memo";

  if (!(column.getCanSort() || column.getCanHide())) {
    return <div className={cn(className)}>{label}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {label}
        {column.getCanSort() &&
          (() => {
            const sorted = column.getIsSorted();

            if (sorted === "desc") {
              return (
                <IconPlaceholder
                  hugeicons="ArrowDown01Icon"
                  lucide="ChevronDown"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  tabler="IconChevronDown"
                />
              );
            }

            if (sorted === "asc") {
              return (
                <IconPlaceholder
                  hugeicons="ArrowUp01Icon"
                  lucide="ChevronUp"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                  tabler="IconChevronUp"
                />
              );
            }

            return (
              <IconPlaceholder
                hugeicons="UnfoldMoreIcon"
                lucide="ChevronsUpDown"
                phosphor="CaretUpDownIcon"
                remixicon="RiArrowUpDownLine"
                tabler="IconSelector"
              />
            );
          })()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-28">
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === "asc"}
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              onClick={() => column.toggleSorting(false)}
            >
              <IconPlaceholder
                hugeicons="ArrowUp01Icon"
                lucide="ChevronUp"
                phosphor="CaretUpIcon"
                remixicon="RiArrowUpSLine"
                tabler="IconChevronUp"
              />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={column.getIsSorted() === "desc"}
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              onClick={() => column.toggleSorting(true)}
            >
              <IconPlaceholder
                hugeicons="ArrowDown01Icon"
                lucide="ChevronDown"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                tabler="IconChevronDown"
              />
              Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem
                className="pl-2 [&_svg]:text-muted-foreground"
                onClick={() => column.clearSorting()}
              >
                <IconPlaceholder
                  hugeicons="Cancel01Icon"
                  lucide="X"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                  tabler="IconX"
                />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            checked={!column.getIsVisible()}
            className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
            onClick={() => column.toggleVisibility(false)}
          >
            <IconPlaceholder
              hugeicons="ViewOffIcon"
              lucide="EyeOff"
              phosphor="EyeSlashIcon"
              remixicon="RiEyeOffLine"
              tabler="IconEyeClosed"
            />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
