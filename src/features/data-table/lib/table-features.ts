import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";

import type {
  DataTableColumnMeta,
  DataTableMeta,
} from "@/features/data-table/types";

export const dataTableFeatures = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnMeta: metaHelper<DataTableColumnMeta>(),
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  facetedMinMaxValues: createFacetedMinMaxValues(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  tableMeta: metaHelper<DataTableMeta>(),
});

export type DataTableFeatures = typeof dataTableFeatures;
