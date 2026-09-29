import { cn } from "cn";
import type { ReactNode } from "react";

interface OrderDetailEntityProps {
  bool?: boolean;
  hind?: boolean;
  label: string;
  middle?: boolean;
  start?: boolean;
  value: string | number | null | ReactNode;
}

export const OrderDetailEntity = ({
  label,
  value,
  hind,
  start,
  middle,
}: OrderDetailEntityProps) => (
  <div
    className={cn(
      "grid grid-cols-1 items-center gap-1 py-3 lg:grid-cols-2 lg:gap-2",
      {
        "items-start": start,
      }
    )}
  >
    <span className="text-muted-foreground"> {label}</span>
    <span
      className={cn(
        "text-end",
        hind && "font-hind font-normal text-base",
        middle && "text-start"
      )}
    >
      {typeof value === "boolean" && `${!!value}`}
      {value}
    </span>
  </div>
);
