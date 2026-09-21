import type { Row, RowData } from "@tanstack/react-table";
import Link from "next/link";

import type { DataTableFeatures } from "@/features/data-table/lib/table-features";

export function DataTableLinkCell<TData extends RowData>({
  value,
  row,
  href,
}: {
  value: unknown;
  row: Row<DataTableFeatures, TData>;
  href?: (row: Row<DataTableFeatures, TData>) => string;
}) {
  const text = String(value);
  const targetHref = href ? href(row) : text;

  return (
    <Link
      className="max-w-125 truncate font-normal text-primary underline-offset-4 hover:underline"
      href={targetHref}
    >
      {text}
    </Link>
  );
}
