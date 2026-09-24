"use client";

import { products } from "@/drizzle/schema/product";
import { buildDataColumn } from "@/features/data-table/lib/build-data-column";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import { ProductVariantRowActions } from "@/features/product/components/product-variants/table/product-variants-row-actions";
import type {
  ProductVariantsRowAction,
  ProductVariantWithRelations,
} from "@/features/product/types/product-variant";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleDashed } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface ProductVariantsTableColumnsProps {
  setRowAction: Dispatch<
    SetStateAction<ProductVariantsRowAction<ProductVariantWithRelations> | null>
  >;
}

export function productVariantsTableColumns({
  setRowAction,
}: ProductVariantsTableColumnsProps): ColumnDef<
  DataTableFeatures,
  ProductVariantWithRelations
>[] {
  return [
    buildDataColumn({
      id: "select",
      label: "selection",
      type: "selection",
    }),
    buildDataColumn({
      accessorKey: "sku",
      label: "SKU",
      type: "text",
    }),
    buildDataColumn({
      accessorKey: "isDefault",
      label: "Default",
      type: "boolean",
    }),
    buildDataColumn({
      accessorKey: "name",
      enableFiltering: true,
      label: "Name",
      type: "text",
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
    // buildDataColumn<ProductVariantWithRelations, unknown>({
    //   accessorFn: (row) => row.createdBy?.avatar ?? "N/A",
    //   id: "userAvatar",
    //   label: "User",
    //   type: "image",
    // }),
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
    {
      cell({ row }) {
        return (
          <ProductVariantRowActions row={row} setRowAction={setRowAction} />
        );
      },
      id: "actions",
      size: 10,
    },
  ];
}
