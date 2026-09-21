import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Row, RowData } from "@tanstack/react-table";

export interface InquiryDataTableRowAction<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
  type: "open" | "edit";
}
