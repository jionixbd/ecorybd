import { dataTableConfig } from "@/features/data-table/lib/config";
import type {
  FilterOperator,
  FilterVariant,
} from "@/features/data-table/types";

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<
    FilterVariant,
    { label: string; value: FilterOperator }[]
  > = {
    boolean: dataTableConfig.booleanOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    multiSelect: dataTableConfig.multiSelectOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    select: dataTableConfig.selectOperators,
    text: dataTableConfig.textOperators,
  };

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators;
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant);

  return operators[0]?.value ?? (filterVariant === "text" ? "iLike" : "eq");
}
