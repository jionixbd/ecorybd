import { Input } from "@/components/ui/input";
import { DataTableDateFilter } from "@/features/data-table/components/base/filter/data-table-date-filter";
import { DataTableFacetedFilter } from "@/features/data-table/components/base/filter/data-table-faceted-filter";
import { DataTableSliderFilter } from "@/features/data-table/components/base/filter/data-table-slider-filter";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "cn";
import { useCallback } from "react";

interface DataTableFilterProps<TData extends RowData> {
  column: Column<DataTableFeatures, TData>;
}

export function DataTableFilter<TData extends RowData>({
  column,
}: DataTableFilterProps<TData>) {
  "use no memo";

  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = useCallback(() => {
      if (!columnMeta?.variant) {
        return null;
      }

      switch (columnMeta.variant) {
        case "text":
          return (
            <Input
              className="h-8 w-40 lg:w-56"
              onChange={(event) => column.setFilterValue(event.target.value)}
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              // biome-ignore lint/suspicious/noUnnecessaryConditions: OK
              value={(column.getFilterValue() as string) ?? ""}
            />
          );

        case "number":
          return (
            <div className="relative">
              <Input
                className={cn("h-8 w-30", columnMeta.unit && "pr-8")}
                inputMode="numeric"
                onChange={(event) => column.setFilterValue(event.target.value)}
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                type="number"
                // biome-ignore lint/suspicious/noUnnecessaryConditions: Ok
                value={(column.getFilterValue() as string) ?? ""}
              />
              {!!columnMeta.unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        case "range":
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          );

        case "date":
        case "dateRange":
          return (
            <DataTableDateFilter
              column={column}
              multiple={columnMeta.variant === "dateRange"}
              title={columnMeta.label ?? column.id}
            />
          );

        case "select":
        case "multiSelect":
          return (
            <DataTableFacetedFilter
              column={column}
              multiple={columnMeta.variant === "multiSelect"}
              options={columnMeta.options ?? []}
              title={columnMeta.label ?? column.id}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
