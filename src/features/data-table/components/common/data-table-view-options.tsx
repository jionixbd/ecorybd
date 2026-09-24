"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";
import * as React from "react";

interface DataTableViewOptionsProps<TData extends RowData>
  extends React.ComponentProps<typeof PopoverContent> {
  disabled?: boolean;
  table: Table<DataTableFeatures, TData>;
}

export function DataTableViewOptions<TData extends RowData>({
  table,
  disabled,
  className,
  ...props
}: DataTableViewOptionsProps<TData>) {
  "use no memo";

  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        ),
    [table]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          className="ml-auto hidden h-8 font-normal lg:flex"
          disabled={disabled}
          role="combobox"
          variant="outline"
        >
          <IconPlaceholder
            className="text-muted-foreground"
            hugeicons="Settings05Icon"
            lucide="Settings2"
            phosphor="GearIcon"
            remixicon="RiSettingsLine"
            tabler="IconSettings"
          />
          {/* View */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-44 p-0", className)} {...props}>
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  data-checked={column.getIsVisible()}
                  key={column.id}
                  onSelect={() =>
                    column.toggleVisibility(!column.getIsVisible())
                  }
                >
                  <span className="truncate">
                    {column.columnDef.meta?.label ?? column.id}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
