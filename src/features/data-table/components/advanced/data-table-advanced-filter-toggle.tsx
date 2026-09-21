"use client";

import { Toggle } from "@/components/ui/toggle";
import { useDataTableAdvancedFilter } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { SlidersHorizontal } from "lucide-react";
import { useQueryState } from "nuqs";

export function DataTableAdvancedFilterToggle() {
  const { enableAdvancedFilter, setEnableAdvancedFilter } =
    useDataTableAdvancedFilter();

  const [, setFilters] = useQueryState("filters");
  const [, setJoinOperator] = useQueryState("joinOperator");

  return (
    <Toggle
      className="h-8 px-3 text-xs data-[state=on]:bg-accent/70 data-[state=on]:hover:bg-accent/90"
      onPressedChange={(pressed) => {
        setEnableAdvancedFilter(pressed);

        if (!pressed) {
          setFilters(null);
          setJoinOperator(null);
        }
      }}
      pressed={enableAdvancedFilter}
      size="sm"
      variant="outline"
    >
      <SlidersHorizontal className="mr-2 size-3.5 shrink-0" />
      Advanced Filters
    </Toggle>
  );
}
