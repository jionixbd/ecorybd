"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/features/data-table/lib/format-date";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Column, RowData } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import type { DateRange } from "react-day-picker";

type DateSelection = Date[] | DateRange;

function getIsDateRange(value: DateSelection): value is DateRange {
  // biome-ignore lint/suspicious/noUnnecessaryConditions: Ok
  return value && typeof value === "object" && !Array.isArray(value);
}

function parseAsDate(timestamp: number | string | undefined): Date | undefined {
  if (!timestamp) {
    return undefined;
  }
  const numericTimestamp =
    typeof timestamp === "string" ? Number(timestamp) : timestamp;
  const date = new Date(numericTimestamp);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseColumnFilterValue(value: unknown) {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .filter(
        (item): item is string | number =>
          typeof item === "number" || typeof item === "string"
      )
      .map((item) => item);
  }

  if (typeof value === "string" || typeof value === "number") {
    return [value];
  }

  return [];
}

interface DataTableDateFilterProps<TData extends RowData> {
  column: Column<DataTableFeatures, TData>;
  multiple?: boolean;
  title?: string;
}

export function DataTableDateFilter<TData extends RowData>({
  column,
  title,
  multiple,
}: DataTableDateFilterProps<TData>) {
  "use no memo";

  const columnFilterValue = column.getFilterValue();

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : [];
    }

    if (multiple) {
      const timestamps = parseColumnFilterValue(columnFilterValue);
      return {
        from: parseAsDate(timestamps[0]),
        to: parseAsDate(timestamps[1]),
      };
    }

    const timestamps = parseColumnFilterValue(columnFilterValue);
    const date = parseAsDate(timestamps[0]);
    return date ? [date] : [];
  }, [columnFilterValue, multiple]);

  const onSelect = useCallback(
    (date: Date | DateRange | undefined) => {
      if (!date) {
        column.setFilterValue(undefined);
        return;
      }

      if (multiple && !("getTime" in date)) {
        const from = date.from?.getTime();
        const to = date.to?.getTime();
        column.setFilterValue(from || to ? [from, to] : undefined);
      } else if (!multiple && "getTime" in date) {
        column.setFilterValue(date.getTime());
      }
    },
    [column, multiple]
  );

  const onReset = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      column.setFilterValue(undefined);
    },
    [column]
  );

  const hasValue = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) {
        return false;
      }
      return selectedDates.from || selectedDates.to;
    }
    if (!Array.isArray(selectedDates)) {
      return false;
    }
    return selectedDates.length > 0;
  }, [multiple, selectedDates]);

  const formatDateRange = useCallback((range: DateRange) => {
    if (!(range.from || range.to)) {
      return "";
    }
    if (range.from && range.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return formatDate(range.from ?? range.to);
  }, []);

  const label = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) {
        return null;
      }

      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText = hasSelectedDates
        ? formatDateRange(selectedDates)
        : "Select date range";

      return (
        <span className="flex items-center gap-2">
          <span>{title}</span>
          {!!hasSelectedDates && (
            <>
              <Separator
                className="mx-0.5 data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <span>{dateText}</span>
            </>
          )}
        </span>
      );
    }

    if (getIsDateRange(selectedDates)) {
      return null;
    }

    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate
      ? formatDate(selectedDates[0])
      : "Select date";

    return (
      <span className="flex items-center gap-2">
        <span>{title}</span>
        {hasSelectedDate && (
          <>
            <Separator
              className="mx-0.5 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <span>{dateText}</span>
          </>
        )}
      </span>
    );
  }, [selectedDates, multiple, formatDateRange, title]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-dashed font-normal" variant="outline">
          {hasValue ? (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Ok
            // biome-ignore lint/a11y/useSemanticElements: Ok
            <div
              aria-label={`Clear ${title} filter`}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={onReset}
              role="button"
              tabIndex={0}
            >
              <IconPlaceholder
                hugeicons="Cancel01Icon"
                lucide="XCircle"
                phosphor="XCircleIcon"
                remixicon="RiCloseCircleLine"
                tabler="IconCircleX"
              />
            </div>
          ) : (
            <IconPlaceholder
              hugeicons="CalendarIcon"
              lucide="CalendarIcon"
              phosphor="CalendarIcon"
              remixicon="RiCalendarLine"
              tabler="IconCalendar"
            />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        {multiple ? (
          <Calendar
            autoFocus
            captionLayout="dropdown"
            mode="range"
            onSelect={onSelect}
            selected={
              getIsDateRange(selectedDates)
                ? selectedDates
                : { from: undefined, to: undefined }
            }
          />
        ) : (
          <Calendar
            captionLayout="dropdown"
            mode="single"
            onSelect={onSelect}
            selected={
              getIsDateRange(selectedDates) ? undefined : selectedDates[0]
            }
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
