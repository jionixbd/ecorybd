"use client";

import { Button } from "@/components/ui/button";
import { orders } from "@/drizzle/schema";
import { buildDataColumn } from "@/features/data-table/lib/build-data-column";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
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
    // buildDataColumn<OrderWithRelations, unknown>({
    //   accessorFn: (row) => row.item.productName ?? "N/A",
    //   id: "productName",
    //   label: "Product",
    //   type: "text",
    // }),
    // buildDataColumn<OrderWithRelations, unknown>({
    //   accessorFn: (row) => row.item.variantName ?? "N/A",
    //   id: "variantName",
    //   label: "Variant",
    //   type: "text",
    // }),
    buildDataColumn({
      accessorKey: "total",
      label: "Order Total",
      type: "price",
    }),
    buildDataColumn({
      accessorKey: "status",
      enableFiltering: true,
      icon: CircleDashed,
      label: "Status",
      options: orders.status.enumValues.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      type: "enum",
    }),
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
