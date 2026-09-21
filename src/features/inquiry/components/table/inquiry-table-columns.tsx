"use client";

import { inquiries, type Inquiry } from "@/drizzle/schema/inquiry";
import { buildDataColumn } from "@/features/data-table/lib/build-data-column";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { InquiryDataTableRowAction } from "@/features/inquiry/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleDashed } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface InquiryTableColumnsProps {
  setRowAction: Dispatch<
    SetStateAction<InquiryDataTableRowAction<Inquiry> | null>
  >;
}

export function inquiryTableColumns(
  _: InquiryTableColumnsProps
): ColumnDef<DataTableFeatures, Inquiry>[] {
  "use no memo";

  return [
    buildDataColumn({
      id: "select",
      label: "selection",
      type: "selection",
    }),
    buildDataColumn({
      accessorKey: "name",
      label: "Name",
      type: "text",
    }),
    buildDataColumn({
      accessorKey: "companyName",
      label: "Company Name",
      type: "text",
    }),
    buildDataColumn({
      accessorKey: "email",
      label: "Email",
      type: "email",
    }),
    buildDataColumn({
      accessorKey: "phone",
      label: "Phone",
      type: "phone",
    }),
    buildDataColumn({
      accessorKey: "status",
      enableFiltering: true,
      icon: CircleDashed,
      label: "Status",
      options: inquiries.status.enumValues.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      type: "enum",
    }),
    buildDataColumn({
      accessorKey: "project",
      enableFiltering: true,
      icon: CircleDashed,
      label: "project",
      options: inquiries.project.enumValues.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      type: "enum",
    }),
    buildDataColumn({
      accessorKey: "service",
      enableFiltering: true,
      icon: CircleDashed,
      label: "service",
      options: inquiries.service.enumValues.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      type: "enum",
    }),
    buildDataColumn({
      accessorKey: "createdAt",
      enableFiltering: true,
      label: "Submitted At",
      type: "datetime",
    }),
  ];
}
