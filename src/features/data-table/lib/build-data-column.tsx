import { Checkbox } from "@/components/ui/checkbox";
import { DataTableBooleanCell } from "@/features/data-table/components/cells/data-table-boolean-cell";
import { DataTableDateCell } from "@/features/data-table/components/cells/data-table-date-cell";
import { DataTableEmailCell } from "@/features/data-table/components/cells/data-table-email-cell";
import { DataTableEnumCell } from "@/features/data-table/components/cells/data-table-enum-cell";
import { DataTableImageCell } from "@/features/data-table/components/cells/data-table-image-cell";
import { DataTableLinkCell } from "@/features/data-table/components/cells/data-table-link-cell";
import { DataTableNullCell } from "@/features/data-table/components/cells/data-table-null-cell";
import { DataTableNumberCell } from "@/features/data-table/components/cells/data-table-number-cell";
import { DataTablePhoneCell } from "@/features/data-table/components/cells/data-table-phone-cell";
import { DataTablePriceCell } from "@/features/data-table/components/cells/data-table-price-cell";
import { DataTableTextCell } from "@/features/data-table/components/cells/data-table-text-cell";
import { DataTableColumnHeader } from "@/features/data-table/components/common/data-table-column-header";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { DataTableColumnMeta, Option } from "@/features/data-table/types";
import type {
  CellContext,
  CellData,
  ColumnDef,
  Row,
  RowData,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type DataColumnType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "enum"
  | "email"
  | "link"
  | "phone"
  | "selection"
  | "image"
  | "price";

export interface BuildDataColumnConfig<
  TData extends RowData,
  TValue extends CellData = unknown,
> {
  accessorFn?: (row: TData) => TValue;
  accessorKey?: Extract<keyof TData, string>;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  href?: (row: Row<DataTableFeatures, TData>) => string;
  icon?: DataTableColumnMeta["icon"];
  id?: string;
  label: string;
  options?: Option[];
  placeholder?: string;
  render?: (
    value: TValue,
    context: CellContext<DataTableFeatures, TData, TValue>
  ) => ReactNode;
  type: DataColumnType;
}

const FILTER_VARIANTS = {
  boolean: "boolean",
  date: "date",
  datetime: "dateRange",
  email: "text",
  enum: "multiSelect",
  image: "text",
  link: "text",
  number: "number",
  phone: "text",
  price: "number",
  text: "text",
} as const;

type FilterableDataColumnType = Exclude<DataColumnType, "selection">;

type FilterVariant = (typeof FILTER_VARIANTS)[keyof typeof FILTER_VARIANTS];

function getFilterVariant(type: FilterableDataColumnType): FilterVariant {
  return FILTER_VARIANTS[type];
}

function renderDefault<TData extends RowData>(
  type: DataColumnType,
  value: unknown,
  row: Row<DataTableFeatures, TData>,
  options?: readonly Option[],
  href?: (row: Row<DataTableFeatures, TData>) => string
) {
  switch (type) {
    case "number":
      return <DataTableNumberCell value={value} />;

    case "boolean":
      return <DataTableBooleanCell value={value} />;

    case "date":
    case "datetime":
      return <DataTableDateCell value={value} />;

    case "enum":
      return <DataTableEnumCell options={options} value={value} />;

    case "email":
      return <DataTableEmailCell value={value} />;

    case "link":
      return <DataTableLinkCell href={href} row={row} value={value} />;

    case "image":
      return <DataTableImageCell value={value} />;

    case "price":
      return <DataTablePriceCell value={value} />;

    case "phone":
      return <DataTablePhoneCell value={value} />;

    case "text":
    default:
      return <DataTableTextCell value={value} />;
  }
}

export function buildDataColumn<
  TData extends RowData,
  TValue extends CellData = unknown,
>({
  accessorFn,
  accessorKey,
  id,
  label,
  type,
  icon,
  enableSorting = true,
  enableFiltering = false,
  placeholder,
  options,
  href,
  render,
}: BuildDataColumnConfig<TData, TValue>): ColumnDef<
  DataTableFeatures,
  TData,
  TValue
> {
  if (type === "selection") {
    return {
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          className="translate-y-0.5"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableHiding: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          className="translate-y-0.5"
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      id: id ?? "select",
      size: 40,
    };
  }

  const columnId = id ?? accessorKey;

  if (!(accessorKey || accessorFn)) {
    throw new Error(
      "accessorKey or accessorFn is required for non-selection columns"
    );
  }

  if (!columnId) {
    throw new Error("id is required when using accessorFn");
  }

  return {
    ...(accessorFn ? { accessorFn } : { accessorKey }),
    cell: (context) => {
      const value = context.cell.getValue();

      if (value === null || value === undefined) {
        return <DataTableNullCell />;
      }

      if (render) {
        return render(value, context);
      }

      return renderDefault(type, value, context.row, options, href);
    },

    enableColumnFilter: enableFiltering,
    enableSorting,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label={label} />
    ),
    id: columnId,
    meta: {
      icon,
      label,
      options,
      placeholder: placeholder ?? `Search ${label.toLowerCase()}...`,
      variant: getFilterVariant(type),
    },
  };
}
