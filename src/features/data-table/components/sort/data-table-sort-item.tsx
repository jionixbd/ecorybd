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
import { dataTableConfig } from "@/features/data-table/lib/config";
import type { ColumnSort, SortDirection } from "@tanstack/react-table";
import { useCallback, useState } from "react";

const REMOVE_SORT_SHORTCUTS = ["backspace", "delete"];

interface DataTableSortItemProps {
  columnLabels: Map<string, string>;
  columns: { id: string; label: string }[];
  onSortRemove: (sortId: string) => void;
  onSortUpdate: (sortId: string, updates: Partial<ColumnSort>) => void;
  sort: ColumnSort;
  sortItemId: string;
}

export function DataTableSortItem({
  sort,
  sortItemId,
  columns,
  columnLabels,
  onSortUpdate,
  onSortRemove,
}: DataTableSortItemProps) {
  const fieldListboxId = `${sortItemId}-field-listbox`;
  const fieldTriggerId = `${sortItemId}-field-trigger`;
  const directionListboxId = `${sortItemId}-direction-listbox`;

  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [showDirectionSelector, setShowDirectionSelector] = useState(false);

  const onItemKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (showFieldSelector || showDirectionSelector) {
        return;
      }

      if (REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase())) {
        event.preventDefault();
        onSortRemove(sort.id);
      }
    },
    [sort.id, showFieldSelector, showDirectionSelector, onSortRemove]
  );

  return (
    <SortableItem asChild value={sort.id}>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Ok */}
      {/* biome-ignore lint/a11y/useSemanticElements: Ok */}
      <div
        className="flex items-center gap-2"
        id={sortItemId}
        onKeyDown={onItemKeyDown}
        role="listitem"
        tabIndex={-1}
      >
        <Popover onOpenChange={setShowFieldSelector} open={showFieldSelector}>
          <PopoverTrigger asChild>
            <Button
              aria-controls={fieldListboxId}
              className="w-44 justify-between rounded font-normal"
              id={fieldTriggerId}
              variant="outline"
            >
              <span className="truncate">{columnLabels.get(sort.id)}</span>
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
            className="w-(--radix-popover-trigger-width) p-0"
            id={fieldListboxId}
          >
            <Command>
              <CommandInput placeholder="Search fields..." />
              <CommandList>
                <CommandEmpty>No fields found.</CommandEmpty>
                <CommandGroup>
                  {columns.map((column) => (
                    <CommandItem
                      key={column.id}
                      onSelect={(value) => onSortUpdate(sort.id, { id: value })}
                      value={column.id}
                    >
                      <span className="truncate">{column.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Select
          onOpenChange={setShowDirectionSelector}
          onValueChange={(value: SortDirection) =>
            onSortUpdate(sort.id, { desc: value === "desc" })
          }
          open={showDirectionSelector}
          value={sort.desc ? "desc" : "asc"}
        >
          <SelectTrigger
            aria-controls={directionListboxId}
            className="w-24 rounded"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className="min-w-(--radix-select-trigger-width)"
            id={directionListboxId}
          >
            <SelectGroup>
              {dataTableConfig.sortOrders.map((order) => (
                <SelectItem key={order.value} value={order.value}>
                  {order.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          aria-controls={sortItemId}
          className="size-8 shrink-0 rounded"
          onClick={() => onSortRemove(sort.id)}
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
          <Button
            className="size-8 shrink-0 rounded"
            size="icon"
            variant="outline"
          >
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
