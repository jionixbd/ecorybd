import { Badge } from "@/components/ui/badge";
import type { Option } from "@/features/data-table/types";

export function DataTableEnumCell({
  value,
  options,
}: {
  value: unknown;
  options?: readonly Option[];
}) {
  const stringValue = String(value);
  const option = options?.find((item) => item.value === stringValue);

  return (
    <Badge className="py-1 [&>svg]:size-3.5" variant="outline">
      <span>{option?.label ?? stringValue}</span>
    </Badge>
  );
}
