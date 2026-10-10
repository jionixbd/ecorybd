import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/drizzle/schema/order";
import type { Option } from "@/features/data-table/types";

import {
  CheckCircle2,
  Clock,
  Package,
  PackageCheck,
  RotateCcw,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export const orderStatusIcons: Record<OrderStatus, LucideIcon> = {
  cancelled: XCircle,
  confirmed: CheckCircle2,
  delivered: PackageCheck,
  fulfilled: Package,
  pending: Clock,
  refunded: RotateCcw,
  shipped: Truck,
};

export const orderStatusBG: Record<string, string> = {
  cancelled:
    "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800/50 dark:bg-rose-950/50 dark:text-rose-200",
  confirmed:
    "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800/50 dark:bg-blue-950/50 dark:text-blue-200",
  delivered:
    "border-green-300 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-950/50 dark:text-green-200",
  fulfilled:
    "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800/50 dark:bg-cyan-950/50 dark:text-cyan-200",
  pending:
    "border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800/50 dark:bg-orange-950/50 dark:text-orange-200",
  refunded:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
  shipped:
    "border-purple-300 bg-purple-50 text-purple-800 dark:border-purple-800/50 dark:bg-purple-950/50 dark:text-purple-200",
};

export const OrderTableStatusCell = ({
  value,
  options,
}: {
  value: unknown;
  options?: readonly Option[];
}) => {
  const stringValue = String(value);
  const option = options?.find((item) => item.value === stringValue);
  const label = option?.label ?? stringValue;

  const StatusIcon =
    orderStatusIcons[stringValue as keyof typeof orderStatusIcons];

  return (
    <Badge
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-medium ${
        orderStatusBG[stringValue] ?? ""
      }`}
      variant="outline"
    >
      {!!StatusIcon && <StatusIcon className="h-3.5 w-3.5 shrink-0" />}
      <span>{label}</span>
    </Badge>
  );
};
