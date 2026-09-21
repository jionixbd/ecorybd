"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type {
  DataTableColumnMeta,
  ExtendedColumnFilter,
} from "@/features/data-table/types";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "cn";

import {
  Faceted,
  FacetedBadgeList,
  FacetedContent,
  FacetedEmpty,
  FacetedGroup,
  FacetedInput,
  FacetedItem,
  FacetedList,
  FacetedTrigger,
} from "@/components/ui/faceted";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DataTableRangeFilter } from "@/features/data-table/components/base/filter/data-table-range-filter";
import { formatDate } from "@/features/data-table/lib/format-date";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Ok
export function onFilterInputRender<TData extends RowData>({
  filter,
  inputId,
  column,
  columnMeta,
  onFilterUpdate,
  showValueSelector,
  setShowValueSelector,
}: {
  filter: ExtendedColumnFilter<TData>;
  inputId: string;
  column: Column<DataTableFeatures, TData>;
  columnMeta?: DataTableColumnMeta;
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>
  ) => void;
  showValueSelector: boolean;
  setShowValueSelector: (value: boolean) => void;
}) {
  if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
    return (
      <div
        aria-label={`${columnMeta?.label} filter is ${
          filter.operator === "isEmpty" ? "empty" : "not empty"
        }`}
        aria-live="polite"
        className="h-8 w-full rounded border bg-transparent dark:bg-input/30"
        id={inputId}
        role="status"
      />
    );
  }

  switch (filter.variant) {
    case "text":
    case "number":
    case "range": {
      if (
        (filter.variant === "range" && filter.operator === "isBetween") ||
        filter.operator === "isBetween"
      ) {
        return (
          <DataTableRangeFilter
            column={column}
            filter={filter}
            inputId={inputId}
            onFilterUpdate={onFilterUpdate}
          />
        );
      }

      const isNumber =
        filter.variant === "number" || filter.variant === "range";

      return (
        <Input
          aria-describedby={`${inputId}-description`}
          aria-label={`${columnMeta?.label} filter value`}
          className="h-8 w-full rounded"
          defaultValue={
            typeof filter.value === "string" ? filter.value : undefined
          }
          id={inputId}
          inputMode={isNumber ? "numeric" : undefined}
          onChange={(event) =>
            onFilterUpdate(filter.filterId, {
              value: event.target.value,
            })
          }
          placeholder={columnMeta?.placeholder ?? "Enter a value..."}
          type={isNumber ? "number" : filter.variant}
        />
      );
    }

    case "boolean": {
      if (Array.isArray(filter.value)) {
        return null;
      }

      const inputListboxId = `${inputId}-listbox`;

      return (
        <Select
          onOpenChange={setShowValueSelector}
          onValueChange={(value) =>
            onFilterUpdate(filter.filterId, {
              value,
            })
          }
          open={showValueSelector}
          value={filter.value}
        >
          <SelectTrigger
            aria-controls={inputListboxId}
            aria-label={`${columnMeta?.label} boolean filter`}
            className="w-full rounded"
            id={inputId}
          >
            <SelectValue placeholder={filter.value ? "True" : "False"} />
          </SelectTrigger>
          <SelectContent id={inputListboxId}>
            <SelectGroup>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    case "select":
    case "multiSelect": {
      const inputListboxId = `${inputId}-listbox`;

      const multiple = filter.variant === "multiSelect";
      const selectedValues = (() => {
        if (multiple) {
          return Array.isArray(filter.value) ? filter.value : [];
        }

        if (typeof filter.value === "string") {
          return filter.value;
        }
      })();

      return (
        <Faceted
          multiple={multiple}
          onOpenChange={setShowValueSelector}
          onValueChange={(value) => {
            onFilterUpdate(filter.filterId, {
              value,
            });
          }}
          open={showValueSelector}
          value={selectedValues}
        >
          <FacetedTrigger asChild>
            <Button
              aria-controls={inputListboxId}
              aria-label={`${columnMeta?.label} filter value${multiple ? "s" : ""}`}
              className="w-full rounded font-normal"
              id={inputId}
              variant="outline"
            >
              <FacetedBadgeList
                options={columnMeta?.options}
                placeholder={
                  columnMeta?.placeholder ??
                  `Select option${multiple ? "s" : ""}...`
                }
              />
            </Button>
          </FacetedTrigger>
          <FacetedContent className="w-50" id={inputListboxId}>
            <FacetedInput
              aria-label={`Search ${columnMeta?.label} options`}
              placeholder={columnMeta?.placeholder ?? "Search options..."}
            />
            <FacetedList>
              <FacetedEmpty>No options found.</FacetedEmpty>
              <FacetedGroup>
                {columnMeta?.options?.map((option) => (
                  <FacetedItem key={option.value} value={option.value}>
                    {!!option.icon && <option.icon />}
                    <span>{option.label}</span>
                    {!!option.count && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </FacetedItem>
                ))}
              </FacetedGroup>
            </FacetedList>
          </FacetedContent>
        </Faceted>
      );
    }

    case "date":
    case "dateRange": {
      const inputListboxId = `${inputId}-listbox`;

      const dateValue = Array.isArray(filter.value)
        ? filter.value.filter(Boolean)
        : [filter.value, filter.value].filter(Boolean);

      const startDate = dateValue[0]
        ? new Date(Number(dateValue[0]))
        : undefined;
      const endDate = dateValue[1] ? new Date(Number(dateValue[1])) : undefined;

      const isSameDate =
        startDate &&
        endDate &&
        startDate.toDateString() === endDate.toDateString();

      const displayValue = (() => {
        if (
          filter.operator === "isBetween" &&
          dateValue.length === 2 &&
          !isSameDate
        ) {
          return `${formatDate(startDate, { month: "short" })} - ${formatDate(endDate, { month: "short" })}`;
        }

        if (startDate) {
          return formatDate(startDate, { month: "short" });
        }

        return "Pick a date";
      })();

      return (
        <Popover onOpenChange={setShowValueSelector} open={showValueSelector}>
          <PopoverTrigger asChild>
            <Button
              aria-controls={inputListboxId}
              aria-label={`${columnMeta?.label} date filter`}
              className={cn(
                "w-full justify-start rounded text-left font-normal",
                !filter.value && "text-muted-foreground"
              )}
              id={inputId}
              variant="outline"
            >
              <IconPlaceholder
                hugeicons="CalendarIcon"
                lucide="CalendarIcon"
                phosphor="CalendarIcon"
                remixicon="RiCalendarLine"
                tabler="IconCalendar"
              />
              <span className="truncate">{displayValue}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto p-0"
            id={inputListboxId}
          >
            {filter.operator === "isBetween" ? (
              <Calendar
                aria-label={`Select ${columnMeta?.label} date range`}
                autoFocus
                captionLayout="dropdown"
                mode="range"
                onSelect={(date) => {
                  onFilterUpdate(filter.filterId, {
                    value: date
                      ? [
                          (date.from?.getTime() ?? "").toString(),
                          (date.to?.getTime() ?? "").toString(),
                        ]
                      : [],
                  });
                }}
                selected={
                  dateValue.length === 2
                    ? {
                        from: new Date(Number(dateValue[0])),
                        to: new Date(Number(dateValue[1])),
                      }
                    : {
                        from: new Date(),
                        to: new Date(),
                      }
                }
              />
            ) : (
              <Calendar
                aria-label={`Select ${columnMeta?.label} date`}
                autoFocus
                captionLayout="dropdown"
                mode="single"
                onSelect={(date) => {
                  onFilterUpdate(filter.filterId, {
                    value: (date?.getTime() ?? "").toString(),
                  });
                  setShowValueSelector(false);
                }}
                selected={
                  dateValue[0] ? new Date(Number(dateValue[0])) : undefined
                }
              />
            )}
          </PopoverContent>
        </Popover>
      );
    }

    default:
      return null;
  }
}
