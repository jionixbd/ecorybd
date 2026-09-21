import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Column, RowData } from "@tanstack/react-table";

export function getColumnPinningStyle<TData extends RowData>({
  column,
  withBorder = false,
}: {
  column: Column<DataTableFeatures, TData>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "start" && column.getIsLastColumn("start");
  const isFirstRightPinnedColumn =
    isPinned === "end" && column.getIsFirstColumn("end");

  return {
    background: isPinned ? "var(--background)" : "var(--background)",
    boxShadow: (() => {
      if (!withBorder) {
        return;
      }
      if (isLastLeftPinnedColumn) {
        return "-4px 0 4px -4px var(--border) inset";
      }
      if (isFirstRightPinnedColumn) {
        return "4px 0 4px -4px var(--border) inset";
      }
    })(),
    left: isPinned === "start" ? `${column.getStart("start")}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : "relative",
    right: isPinned === "end" ? `${column.getAfter("end")}px` : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : undefined,
  };
}
