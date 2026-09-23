import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "@/drizzle/schema/product";
import { cn } from "cn";
import { Circle } from "lucide-react";

interface ProductDetailStatusProps {
  status: ProductStatus;
}

export const ProductDetailStatus = ({ status }: ProductDetailStatusProps) => (
  <Badge
    className={cn({
      "bg-emerald-400": status === "published",
      "bg-red-400": status === "archived",
      "bg-slate-400": status === "draft",
    })}
  >
    <Circle
      className={cn({
        "fill-emerald-700 stroke-emerald-700": status === "published",
        "fill-red-700 stroke-red-700": status === "archived",
        "fill-slate-700 stroke-slate-700": status === "draft",
      })}
    />
    {status}
  </Badge>
);
