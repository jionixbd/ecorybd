"use client";

import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products } from "@/drizzle/schema/product";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { OrderWithRelations } from "@/features/order/types/order";
import type { Table } from "@tanstack/react-table";
import { CheckCircle2, Download, Trash2, X } from "lucide-react";
import { useCallback } from "react";

interface OrdersTableActionBarProps {
  table: Table<DataTableFeatures, OrderWithRelations>;
}

export function OrdersTableActionBar({ table }: OrdersTableActionBarProps) {
  const { rows } = table.getFilteredSelectedRowModel();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        table.toggleAllRowsSelected(false);
      }
    },
    [table]
  );

  return (
    <ActionBar onOpenChange={onOpenChange} open={rows.length > 0}>
      <ActionBarSelection>
        <span className="font-medium">{rows.length}</span>
        <span>selected</span>
        <ActionBarSeparator />
        <ActionBarClose>
          <X />
        </ActionBarClose>
      </ActionBarSelection>

      <ActionBarSeparator />

      <ActionBarGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ActionBarItem>
              <CheckCircle2 />
              Status
            </ActionBarItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {products.status.enumValues.map((status) => (
              <DropdownMenuItem
                className="capitalize"
                key={status}
                onClick={() => {}}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ActionBarItem onClick={() => {}}>
          <Download />
          Export
        </ActionBarItem>

        <ActionBarItem onClick={() => {}} variant="destructive">
          <Trash2 />
          Delete
        </ActionBarItem>
      </ActionBarGroup>
    </ActionBar>
  );
}
