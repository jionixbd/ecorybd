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
import { orders, type OrderStatus } from "@/drizzle/schema/order";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import {
  deleteOrdersBulkAction,
  updateOrderStatusBulkAction,
} from "@/features/order/actions/order";
import type { OrderWithRelations } from "@/features/order/types/order";
import type { Table } from "@tanstack/react-table";
import { CheckCircle2, Trash2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { toast } from "sonner";

interface OrdersTableActionBarProps {
  table: Table<DataTableFeatures, OrderWithRelations>;
}

export function OrdersTableActionBar({ table }: OrdersTableActionBarProps) {
  const { rows } = table.getFilteredSelectedRowModel();

  const { executeAsync: deleteOrders, isPending: ordersDeleting } = useAction(
    deleteOrdersBulkAction,
    {
      onError({ error }) {
        toast.error(
          `[${error.serverError?.code}]: ${error.serverError?.message}`
        );
      },
      onSuccess() {
        table.toggleAllRowsSelected(false);
      },
    }
  );

  const { executeAsync: updateOrderStatus, isPending: orderStatusUpdating } =
    useAction(updateOrderStatusBulkAction, {
      onError({ error }) {
        toast.error(
          `[${error.serverError?.code}]: ${error.serverError?.message}`
        );
      },
      onSuccess() {
        table.toggleAllRowsSelected(false);
      },
    });

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        table.toggleAllRowsSelected(false);
      }
    },
    [table]
  );

  const handleDeleteOrders = useCallback(() => {
    const orderIds = rows.map((o) => o.original.orderId);

    toast.promise(deleteOrders({ orderIds }), {
      loading: `${orderIds.length} orders deleting...`,
      success: ({ data }) => `${data?.length} Orders deleted`,
    });
  }, [rows, deleteOrders]);

  const handleUpdateOrdersStatus = useCallback(
    ({ status }: { status: OrderStatus }) => {
      const orderIds = rows.map((o) => o.original.orderId);

      toast.promise(updateOrderStatus({ input: { status }, orderIds }), {
        loading: `${orderIds.length} orders updating...`,
        success: ({ data }) => `${data?.length} Orders updated`,
      });
    },
    [rows, updateOrderStatus]
  );

  const disabled = ordersDeleting || orderStatusUpdating;

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
            {orders.status.enumValues.map((status) => (
              <DropdownMenuItem
                className="capitalize"
                key={status}
                onClick={() => handleUpdateOrdersStatus({ status })}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ActionBarItem
          disabled={disabled}
          onClick={handleDeleteOrders}
          variant="destructive"
        >
          <Trash2 />
          Delete
        </ActionBarItem>
      </ActionBarGroup>
    </ActionBar>
  );
}
