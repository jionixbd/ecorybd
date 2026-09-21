import { DataTableTextCell } from "@/features/data-table/components/cells/data-table-text-cell";
import { formatDate } from "@/features/data-table/lib/format-date";

export function DataTableDateCell({ value }: { value: unknown }) {
  if (!(value instanceof Date)) {
    return <DataTableTextCell value={value} />;
  }

  return <span>{formatDate(value)}</span>;
}
