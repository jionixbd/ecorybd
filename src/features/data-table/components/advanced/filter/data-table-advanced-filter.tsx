"use client";

import { useDebouncedCallback } from "@/features/data-table/hooks/use-debounced-callback";
import { getDefaultFilterOperator } from "@/features/data-table/lib/filter-operator";
import type { ExtendedColumnFilter } from "@/features/data-table/types";
import type { RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sortable,
  SortableContent,
  SortableOverlay,
} from "@/components/ui/sortable";
import { DataTableFilterItem } from "@/features/data-table/components/advanced/filter/data-table-advanced-filter-item";
import { generateId } from "@/features/data-table/lib/generate-id";
import { getFiltersStateParser } from "@/features/data-table/lib/parsers";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;
const FILTER_SHORTCUT_KEY = "f";
const REMOVE_FILTER_SHORTCUTS = ["backspace", "delete"];

interface DataTableAdvancedFilterProps<TData extends RowData>
  extends React.ComponentProps<typeof PopoverContent> {
  debounceMs?: number;
  disabled?: boolean;
  shallow?: boolean;
  table: Table<DataTableFeatures, TData>;
  throttleMs?: number;
}

export function DataTableAdvancedFilter<TData extends RowData>({
  table,
  debounceMs = DEBOUNCE_MS,
  throttleMs = THROTTLE_MS,
  shallow = true,
  disabled,
  ...props
}: DataTableAdvancedFilterProps<TData>) {
  "use no memo";

  const id = useId();
  const labelId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((column) => column.columnDef.enableColumnFilter),
    [table]
  );

  const [filters, setFilters] = useQueryState(
    table.options.meta?.queryKeys?.filters ?? "filters",
    getFiltersStateParser<TData>(columns.map((field) => field.id))
      .withDefault([])
      .withOptions({
        clearOnDefault: true,
        shallow,
        throttleMs,
      })
  );
  const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs);

  const [joinOperator, setJoinOperator] = useQueryState(
    table.options.meta?.queryKeys?.joinOperator ?? "",
    parseAsStringEnum(["and", "or"]).withDefault("and").withOptions({
      clearOnDefault: true,
      shallow,
    })
  );

  const onFilterAdd = useCallback(() => {
    // biome-ignore lint/style/useDestructuring: Ok
    const column = columns[0];

    if (!column) {
      return;
    }

    debouncedSetFilters([
      ...filters,
      {
        filterId: generateId({ length: 8 }),
        id: column.id as Extract<keyof TData, string>,
        operator: getDefaultFilterOperator(
          column.columnDef.meta?.variant ?? "text"
        ),
        value: "",
        variant: column.columnDef.meta?.variant ?? "text",
      },
    ]);
  }, [columns, filters, debouncedSetFilters]);

  const onFilterUpdate = useCallback(
    (
      filterId: string,
      updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>
    ) => {
      debouncedSetFilters((prevFilters) => {
        const updatedFilters = prevFilters.map((filter) => {
          if (filter.filterId === filterId) {
            return { ...filter, ...updates } as ExtendedColumnFilter<TData>;
          }
          return filter;
        });
        return updatedFilters;
      });
    },
    [debouncedSetFilters]
  );

  const onFilterRemove = useCallback(
    (filterId: string) => {
      const updatedFilters = filters.filter(
        (filter) => filter.filterId !== filterId
      );
      setFilters(updatedFilters);
      requestAnimationFrame(() => {
        addButtonRef.current?.focus();
      });
    },
    [filters, setFilters]
  );

  const onFiltersReset = useCallback(() => {
    setFilters(null);
    setJoinOperator("and");
  }, [setFilters, setJoinOperator]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement &&
          event.target.contentEditable === "true")
      ) {
        return;
      }

      if (
        event.key.toLowerCase() === FILTER_SHORTCUT_KEY &&
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey
      ) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (
        REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase()) &&
        filters.length > 0
      ) {
        event.preventDefault();
        onFilterRemove(filters.at(-1)?.filterId ?? "");
      }
    },
    [filters, onFilterRemove]
  );

  return (
    <Sortable
      getItemValue={(item) => item.filterId}
      onValueChange={setFilters}
      value={filters}
    >
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="font-normal"
            disabled={disabled}
            onKeyDown={onTriggerKeyDown}
            variant="outline"
          >
            <IconPlaceholder
              className="text-muted-foreground"
              hugeicons="LeftToRightListBulletIcon"
              lucide="ListFilter"
              phosphor="ListIcon"
              remixicon="RiListUnordered"
              tabler="IconListDetails"
            />
            Filter
            {filters.length > 0 && (
              <Badge
                className="h-[18.24px] rounded-md px-[5.12px] font-mono font-normal text-[10.4px]"
                variant="secondary"
              >
                {filters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          className="flex w-full max-w-(--radix-popover-content-available-width) flex-col gap-3.5 p-4 sm:min-w-95"
          {...props}
        >
          <div className="flex flex-col gap-1">
            <h4 className="font-medium leading-none" id={labelId}>
              {filters.length > 0 ? "Filters" : "No filters applied"}
            </h4>
            <p
              className={cn(
                "text-muted-foreground text-sm",
                filters.length > 0 && "sr-only"
              )}
              id={descriptionId}
            >
              {filters.length > 0
                ? "Modify filters to refine your rows."
                : "Add filters to refine your rows."}
            </p>
          </div>
          {filters.length > 0 ? (
            <SortableContent asChild>
              {/* biome-ignore lint/a11y/useSemanticElements: Ok */}
              <div
                className="flex max-h-75 flex-col gap-2 overflow-y-auto p-1"
                role="list"
              >
                {filters.map((filter, index) => (
                  <DataTableFilterItem<TData>
                    columns={columns}
                    filter={filter}
                    filterItemId={`${id}-filter-${filter.filterId}`}
                    index={index}
                    joinOperator={joinOperator}
                    key={filter.filterId}
                    onFilterRemove={onFilterRemove}
                    onFilterUpdate={onFilterUpdate}
                    setJoinOperator={setJoinOperator}
                  />
                ))}
              </div>
            </SortableContent>
          ) : null}
          <div className="flex w-full items-center gap-2">
            <Button
              className="rounded"
              onClick={onFilterAdd}
              ref={addButtonRef}
            >
              Add filter
            </Button>
            {filters.length > 0 ? (
              <Button
                className="rounded"
                onClick={onFiltersReset}
                variant="outline"
              >
                Reset filters
              </Button>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
      <SortableOverlay>
        <div className="flex items-center gap-2">
          <div className="h-8 min-w-18 rounded-sm bg-primary/10" />
          <div className="h-8 w-32 rounded-sm bg-primary/10" />
          <div className="h-8 w-32 rounded-sm bg-primary/10" />
          <div className="h-8 min-w-36 flex-1 rounded-sm bg-primary/10" />
          <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
          <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
        </div>
      </SortableOverlay>
    </Sortable>
  );
}
