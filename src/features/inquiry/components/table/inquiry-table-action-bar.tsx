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
import { inquiries, type Inquiry } from "@/drizzle/schema/inquiry";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Table } from "@tanstack/react-table";
import { CheckCircle2, Download, Trash2, X } from "lucide-react";
import { useCallback } from "react";

interface InquiryTableActionBarProps {
  table: Table<DataTableFeatures, Inquiry>;
}

export function InquiryTableActionBar({ table }: InquiryTableActionBarProps) {
  "use no memo";

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
            {inquiries.status.enumValues.map((status) => (
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
