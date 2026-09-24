"use client";

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
import { DataTableSortItem } from "@/features/data-table/components/sort/data-table-sort-item";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { ColumnSort, RowData, Table } from "@tanstack/react-table";
import { cn } from "cn";
import * as React from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const SORT_SHORTCUT_KEY = "s";
const REMOVE_SORT_SHORTCUTS = ["backspace", "delete"];

interface DataTableSortListProps<TData extends RowData>
  extends React.ComponentProps<typeof PopoverContent> {
  disabled?: boolean;
  table: Table<DataTableFeatures, TData>;
}

export function DataTableSort<TData extends RowData>({
  table,
  disabled,
  className,
  ...props
}: DataTableSortListProps<TData>) {
  "use no memo";

  const id = useId();
  const labelId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const { sorting } = table.store.state;
  const onSortingChange = table.setSorting;

  const { columnLabels, columns } = useMemo(() => {
    const labels = new Map<string, string>();
    const sortingIds = new Set(sorting.map((s) => s.id));
    const availableColumns: { id: string; label: string }[] = [];

    for (const column of table.getAllColumns()) {
      if (!column.getCanSort()) {
        continue;
      }

      const label = column.columnDef.meta?.label ?? column.id;
      labels.set(column.id, label);

      if (!sortingIds.has(column.id)) {
        availableColumns.push({ id: column.id, label });
      }
    }

    return {
      columnLabels: labels,
      columns: availableColumns,
    };
  }, [sorting, table]);

  const onSortAdd = useCallback(() => {
    // biome-ignore lint/style/useDestructuring: Ok
    const firstColumn = columns[0];
    if (!firstColumn) {
      return;
    }

    onSortingChange((prevSorting) => [
      ...prevSorting,
      { desc: false, id: firstColumn.id },
    ]);
  }, [columns, onSortingChange]);

  const onSortUpdate = useCallback(
    (sortId: string, updates: Partial<ColumnSort>) => {
      onSortingChange((prevSorting) => {
        if (!prevSorting) {
          return prevSorting;
        }
        return prevSorting.map((sort) =>
          sort.id === sortId ? { ...sort, ...updates } : sort
        );
      });
    },
    [onSortingChange]
  );

  const onSortRemove = useCallback(
    (sortId: string) => {
      onSortingChange((prevSorting) =>
        prevSorting.filter((item) => item.id !== sortId)
      );
    },
    [onSortingChange]
  );

  const onSortingReset = useCallback(
    () => onSortingChange(table.initialState.sorting),
    [onSortingChange, table.initialState.sorting]
  );

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
        event.key.toLowerCase() === SORT_SHORTCUT_KEY &&
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

  const onTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (
        REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase()) &&
        sorting.length > 0
      ) {
        event.preventDefault();
        onSortingReset();
      }
    },
    [sorting.length, onSortingReset]
  );

  return (
    <Sortable
      getItemValue={(item) => item.id}
      onValueChange={onSortingChange}
      value={sorting}
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
              hugeicons="ArrowDataTransferHorizontalIcon"
              lucide="ArrowDownUp"
              phosphor="ArrowsVerticalIcon"
              remixicon="RiArrowUpDownLine"
              tabler="IconArrowsLeftRight"
            />
            {/* Sort */}
            {sorting.length > 0 && (
              <Badge
                className="h-[18.24px] rounded-md px-[5.12px] font-mono font-normal text-[10.4px]"
                variant="secondary"
              >
                {sorting.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          className={cn(
            "flex w-full max-w-(--radix-popover-content-available-width) flex-col gap-3.5 p-4 sm:min-w-95",
            className
          )}
          {...props}
        >
          <div className="flex flex-col gap-1">
            <h4 className="font-medium leading-none" id={labelId}>
              {sorting.length > 0 ? "Sort by" : "No sorting applied"}
            </h4>
            <p
              className={cn(
                "text-muted-foreground text-sm",
                sorting.length > 0 && "sr-only"
              )}
              id={descriptionId}
            >
              {sorting.length > 0
                ? "Modify sorting to organize your rows."
                : "Add sorting to organize your rows."}
            </p>
          </div>
          {sorting.length > 0 && (
            <SortableContent asChild>
              {/* biome-ignore lint/a11y/useSemanticElements: Ok */}
              <div
                className="flex max-h-75 flex-col gap-2 overflow-y-auto p-1"
                role="list"
              >
                {sorting.map((sort) => (
                  <DataTableSortItem
                    columnLabels={columnLabels}
                    columns={columns}
                    key={sort.id}
                    onSortRemove={onSortRemove}
                    onSortUpdate={onSortUpdate}
                    sort={sort}
                    sortItemId={`${id}-sort-${sort.id}`}
                  />
                ))}
              </div>
            </SortableContent>
          )}
          <div className="flex w-full items-center gap-2">
            <Button
              className="rounded"
              disabled={columns.length === 0}
              onClick={onSortAdd}
              ref={addButtonRef}
            >
              Add sort
            </Button>
            {sorting.length > 0 && (
              <Button
                className="rounded"
                onClick={onSortingReset}
                variant="outline"
              >
                Reset sorting
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <SortableOverlay>
        <div className="flex items-center gap-2">
          <div className="h-8 w-45 rounded-sm bg-primary/10" />
          <div className="h-8 w-24 rounded-sm bg-primary/10" />
          <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
          <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
        </div>
      </SortableOverlay>
    </Sortable>
  );
}
