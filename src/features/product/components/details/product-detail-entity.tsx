import { cn } from "cn";
import type { ReactNode } from "react";

interface ProductDetailEntityProps {
  bool?: boolean;
  hind?: boolean;
  label: string;
  mono?: boolean;
  start?: boolean;
  value: string | number | null | ReactNode;
}

export const ProductDetailEntity = ({
  label,
  value,
  mono,
  start,
  hind,
}: ProductDetailEntityProps) => (
  <div
    className={cn(
      "grid grid-cols-1 items-center gap-1 py-2 lg:grid-cols-2 lg:gap-2",
      {
        "items-start": start,
      }
    )}
  >
    <span className="text-muted-foreground"> {label}</span>
    <span className={cn(mono && "font-light font-mono", hind && "font-hind")}>
      {typeof value === "boolean" && `${!!value}`}
      {value}
    </span>
  </div>
);
