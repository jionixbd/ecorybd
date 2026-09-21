"use client";

import { dataTableConfig } from "@/features/data-table/lib/config";
import {
  getDefaultFilterOperator,
  getFilterOperators,
} from "@/features/data-table/lib/filter-operator";
import type {
  ExtendedColumnFilter,
  FilterOperator,
  JoinOperator,
} from "@/features/data-table/types";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "cn";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortableItem, SortableItemHandle } from "@/components/ui/sortable";

import { onFilterInputRender } from "@/features/data-table/components/advanced/filter/data-table-advanced-filter-input-render";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import { useCallback, useState } from "react";

const REMOVE_FILTER_SHORTCUTS = ["backspace", "delete"];

interface DataTableFilterItemProps<TData extends RowData> {
  columns: Column<DataTableFeatures, TData>[];
  filter: ExtendedColumnFilter<TData>;
  filterItemId: string;
  index: number;
  joinOperator: JoinOperator;
  onFilterRemove: (filterId: string) => void;
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>
  ) => void;
  setJoinOperator: (value: JoinOperator) => void;
}

export function DataTableFilterItem<TData extends RowData>({
  filter,
  index,
  filterItemId,
  joinOperator,
  setJoinOperator,
  columns,
  onFilterUpdate,
  onFilterRemove,
}: DataTableFilterItemProps<TData>) {
  "use no memo";

  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [showOperatorSelector, setShowOperatorSelector] = useState(false);
  const [showValueSelector, setShowValueSelector] = useState(false);
  // biome-ignore lint/suspicious/noShadow: ok
  const column = columns.find((column) => column.id === filter.id);

  const joinOperatorListboxId = `${filterItemId}-join-operator-listbox`;
  const fieldListboxId = `${filterItemId}-field-listbox`;
  const operatorListboxId = `${filterItemId}-operator-listbox`;
  const inputId = `${filterItemId}-input`;

  const columnMeta = column?.columnDef.meta;
  const filterOperators = getFilterOperators(filter.variant);

  const onItemKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (showFieldSelector || showOperatorSelector || showValueSelector) {
        return;
      }

      if (REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase())) {
        event.preventDefault();
        onFilterRemove(filter.filterId);
      }
    },
    [
      filter.filterId,
      showFieldSelector,
      showOperatorSelector,
      showValueSelector,
      onFilterRemove,
    ]
  );

  if (!column) {
    return null;
  }

  return (
    <SortableItem asChild value={filter.filterId}>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Ok */}
      {/* biome-ignore lint/a11y/useSemanticElements: Ok */}
      <div
        className="flex items-center gap-2"
        id={filterItemId}
        onKeyDown={onItemKeyDown}
        role="listitem"
        tabIndex={-1}
      >
        <div className="min-w-18 text-center">
          {(() => {
            if (index === 0) {
              return (
                <span className="text-muted-foreground text-sm">Where</span>
              );
            }

            if (index === 1) {
              return (
                <Select
                  onValueChange={(value: JoinOperator) =>
                    setJoinOperator(value)
                  }
                  value={joinOperator}
                >
                  <SelectTrigger
                    aria-controls={joinOperatorListboxId}
                    aria-label="Select join operator"
                    className="rounded lowercase"
                  >
                    <SelectValue placeholder={joinOperator} />
                  </SelectTrigger>
                  <SelectContent
                    className="min-w-(--radix-select-trigger-width) lowercase"
                    id={joinOperatorListboxId}
                    position="popper"
                  >
                    <SelectGroup>
                      {dataTableConfig.joinOperators.map((op) => (
                        <SelectItem key={op} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }

            return (
              <span className="text-muted-foreground text-sm">
                {joinOperator}
              </span>
            );
          })()}
        </div>
        <Popover onOpenChange={setShowFieldSelector} open={showFieldSelector}>
          <PopoverTrigger asChild>
            <Button
              aria-controls={fieldListboxId}
              className="w-32 justify-between rounded font-normal"
              variant="outline"
            >
              <span className="truncate">
                {
                  // biome-ignore lint/suspicious/noShadow: ok
                  columns.find((column) => column.id === filter.id)?.columnDef
                    .meta?.label ?? "Select field"
                }
              </span>
              <IconPlaceholder
                className="opacity-50"
                hugeicons="UnfoldMoreIcon"
                lucide="ChevronsUpDown"
                phosphor="CaretUpDownIcon"
                remixicon="RiArrowUpDownLine"
                tabler="IconSelector"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-40 p-0"
            id={fieldListboxId}
          >
            <Command>
              <CommandInput placeholder="Search fields..." />
              <CommandList>
                <CommandEmpty>No fields found.</CommandEmpty>
                <CommandGroup>
                  {
                    // biome-ignore lint/suspicious/noShadow: ok
                    columns.map((column) => (
                      <CommandItem
                        key={column.id}
                        onSelect={(value) => {
                          onFilterUpdate(filter.filterId, {
                            id: value as Extract<keyof TData, string>,
                            operator: getDefaultFilterOperator(
                              column.columnDef.meta?.variant ?? "text"
                            ),
                            value: "",
                            variant: column.columnDef.meta?.variant ?? "text",
                          });

                          setShowFieldSelector(false);
                        }}
                        value={column.id}
                      >
                        <span className="truncate">
                          {column.columnDef.meta?.label}
                        </span>
                        <IconPlaceholder
                          className={cn(
                            "ml-auto",
                            column.id === filter.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                          hugeicons="Tick02Icon"
                          lucide="Check"
                          phosphor="CheckIcon"
                          remixicon="RiCheckLine"
                          tabler="IconCheck"
                        />
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Select
          onOpenChange={setShowOperatorSelector}
          onValueChange={(value: FilterOperator) =>
            onFilterUpdate(filter.filterId, {
              operator: value,
              value:
                value === "isEmpty" || value === "isNotEmpty"
                  ? ""
                  : filter.value,
            })
          }
          open={showOperatorSelector}
          value={filter.operator}
        >
          <SelectTrigger
            aria-controls={operatorListboxId}
            className="w-32 rounded lowercase"
          >
            <div className="truncate">
              <SelectValue placeholder={filter.operator} />
            </div>
          </SelectTrigger>
          <SelectContent id={operatorListboxId}>
            <SelectGroup>
              {filterOperators.map((operator) => (
                <SelectItem
                  className="lowercase"
                  key={operator.value}
                  value={operator.value}
                >
                  {operator.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="min-w-36 max-w-60 flex-1">
          {onFilterInputRender({
            column,
            columnMeta,
            filter,
            inputId,
            onFilterUpdate,
            setShowValueSelector,
            showValueSelector,
          })}
        </div>
        <Button
          aria-controls={filterItemId}
          className="size-8 rounded"
          onClick={() => onFilterRemove(filter.filterId)}
          size="icon"
          variant="outline"
        >
          <IconPlaceholder
            hugeicons="Delete02Icon"
            lucide="Trash2"
            phosphor="TrashIcon"
            remixicon="RiDeleteBinLine"
            tabler="IconTrash"
          />
        </Button>
        <SortableItemHandle asChild>
          <Button className="size-8 rounded" size="icon" variant="outline">
            <IconPlaceholder
              hugeicons="DragDropVerticalIcon"
              lucide="GripVertical"
              phosphor="DotsSixVerticalIcon"
              remixicon="RiDraggable"
              tabler="IconGripVertical"
            />
          </Button>
        </SortableItemHandle>
      </div>
    </SortableItem>
  );
}
