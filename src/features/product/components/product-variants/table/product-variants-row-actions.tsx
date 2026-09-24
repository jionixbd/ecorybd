import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type {
  ProductVariantsRowAction,
  ProductVariantWithRelations,
} from "@/features/product/types/product-variant";
import type { Row } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface ProductVariantRowActionsProps {
  row: Row<DataTableFeatures, ProductVariantWithRelations>;
  setRowAction: Dispatch<
    SetStateAction<ProductVariantsRowAction<ProductVariantWithRelations> | null>
  >;
}

export const ProductVariantRowActions = ({
  row,
  setRowAction,
}: ProductVariantRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size={"icon"} variant="ghost">
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem
          onSelect={() => setRowAction({ row, variant: "update" })}
        >
          Update
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
);
