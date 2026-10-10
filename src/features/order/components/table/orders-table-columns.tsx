"use client";

import { Button } from "@/components/ui/button";
import { orders } from "@/drizzle/schema";
import { DataTablePriceCell } from "@/features/data-table/components/cells/data-table-price-cell";
import { DataTableColumnHeader } from "@/features/data-table/components/common/data-table-column-header";
import { buildDataColumn } from "@/features/data-table/lib/build-data-column";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import { OrderTableStatusCell } from "@/features/order/components/table/cell/order-table-cell-status";
import type {
  OrdersTableRowAction,
  OrderWithRelations,
} from "@/features/order/types/order";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, CircleDashed } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

interface OrdersTableColumnsProps {
  setRowAction: Dispatch<
    SetStateAction<OrdersTableRowAction<OrderWithRelations> | null>
  >;
}

export function ordersTableColumns(
  _: OrdersTableColumnsProps
): ColumnDef<DataTableFeatures, OrderWithRelations>[] {
  const statusOptions = orders.status.enumValues.map((status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
  }));

  return [
    buildDataColumn({
      id: "select",
      label: "selection",
      type: "selection",
    }),
    buildDataColumn({
      accessorKey: "createdAt",
      label: "Date",
      type: "date",
    }),
    buildDataColumn({
      accessorKey: "orderNumber",
      enableFiltering: true,
      label: "Order Number",
      type: "text",
    }),
    buildDataColumn<OrderWithRelations, unknown>({
      accessorFn: (row) => row.billing.name ?? "N/A",
      id: "name",
      label: "Name",
      type: "text",
    }),
    buildDataColumn<OrderWithRelations, unknown>({
      accessorFn: (row) => row.billing.phone ?? "N/A",
      id: "phone",
      label: "Phone",
      type: "phone",
    }),
    {
      accessorKey: "subtotal",
      cell: ({ getValue }) => (
        <DataTablePriceCell currency="BDT" locale="bn-BD" value={getValue()} />
      ),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Subtotal" />
      ),
    },
    {
      accessorKey: "shippingTotal",
      cell: ({ getValue }) => (
        <DataTablePriceCell currency="BDT" locale="bn-BD" value={getValue()} />
      ),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Shipping" />
      ),
    },
    {
      accessorKey: "total",
      cell: ({ getValue }) => (
        <DataTablePriceCell currency="BDT" locale="bn-BD" value={getValue()} />
      ),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Order Total" />
      ),
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => (
        <OrderTableStatusCell options={statusOptions} value={getValue()} />
      ),
      enableColumnFilter: true,
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Status" />
      ),
      meta: {
        icon: CircleDashed,
        label: "Status",
        options: statusOptions,
        placeholder: "Search status...",
        variant: "multiSelect",
      },
    },
    {
      cell({ row }) {
        return (
          <div className="flex items-center justify-center">
            <Button asChild>
              <Link
                href={`/workspace/${row.original.organization.slug}/orders/${row.original.orderId}`}
              >
                View <ArrowUpRight />
              </Link>
            </Button>
          </div>
        );
      },
      id: "actions",
      size: 20,
    },
  ];
}
