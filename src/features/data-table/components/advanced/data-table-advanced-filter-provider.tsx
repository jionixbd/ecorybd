"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { createContext, useContext } from "react";

interface DataTableAdvancedFilterContextValue {
  enableAdvancedFilter: boolean;
  setEnableAdvancedFilter: (value: boolean | null) => void;
}

const DataTableAdvancedFilterContext =
  createContext<DataTableAdvancedFilterContextValue | null>(null);

export function useDataTableAdvancedFilter() {
  const context = useContext(DataTableAdvancedFilterContext);
  if (!context) {
    throw new Error(
      "useDataTableAdvancedFilter must be used within an DataTableAdvancedFilterProvider"
    );
  }
  return context;
}

interface AdvancedFilterProviderProps {
  children: React.ReactNode;
}

// 1. THIS ONLY PROVIDES STATE NOW (NO UI)
export function DataTableAdvancedFilterProvider({
  children,
}: AdvancedFilterProviderProps) {
  const [enableAdvancedFilter, setEnableAdvancedFilter] = useQueryState(
    "advanced",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
      shallow: false,
    })
  );

  return (
    <DataTableAdvancedFilterContext.Provider
      value={{ enableAdvancedFilter, setEnableAdvancedFilter }}
    >
      {children}
    </DataTableAdvancedFilterContext.Provider>
  );
}
