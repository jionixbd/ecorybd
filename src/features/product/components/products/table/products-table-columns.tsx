"use client";

import { products } from "@/drizzle/schema/product";
import { buildDataColumn } from "@/features/data-table/lib/build-data-column";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type {
  ProductsTableRowAction,
  ProductWithRelations,
} from "@/features/product/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleDashed } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface ProductsTableColumnsProps {
  setRowAction: Dispatch<
    SetStateAction<ProductsTableRowAction<ProductWithRelations> | null>
  >;
}

export function productsTableColumns(
  _: ProductsTableColumnsProps
): ColumnDef<DataTableFeatures, ProductWithRelations>[] {
  return [
    buildDataColumn({
      id: "select",
      label: "selection",
      type: "selection",
    }),
    buildDataColumn({
      accessorKey: "name",
      enableFiltering: true,
      label: "Name",
      type: "text",
    }),
    buildDataColumn({
      accessorKey: "isFeatured",
      label: "Featured",
      type: "boolean",
    }),
    buildDataColumn({
      accessorKey: "price",
      label: "Price",
      type: "price",
    }),
    buildDataColumn({
      accessorKey: "salePrice",
      label: "Sale Price",
      type: "price",
    }),
    buildDataColumn({
      accessorKey: "stockQuantity",
      label: "Stock",
      type: "number",
    }),
    buildDataColumn<ProductWithRelations, unknown>({
      accessorFn: (row) => row.createdBy?.avatar ?? "N/A",
      id: "userAvatar",
      label: "User",
      type: "image",
    }),
    buildDataColumn({
      accessorKey: "status",
      enableFiltering: true,
      icon: CircleDashed,
      label: "Status",
      options: products.status.enumValues.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      type: "enum",
    }),
  ];
}
