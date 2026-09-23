import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Product } from "@/drizzle/schema";
import { ProductEditForm } from "@/features/product/components/details/product-edit-form";
import { EllipsisVertical, X } from "lucide-react";

interface ProductSettingsProps {
  product: Product;
}

export const ProductSettings = ({ product }: ProductSettingsProps) => (
  <Sheet>
    <Tooltip>
      <TooltipTrigger asChild>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <EllipsisVertical />
          </Button>
        </SheetTrigger>
      </TooltipTrigger>
      <TooltipContent>Setting</TooltipContent>
    </Tooltip>
    <SheetContent
      className="data-[side=right]:sm:max-w-xl"
      showCloseButton={false}
    >
      <SheetHeader className="flex flex-row items-center justify-between px-4 md:px-8">
        <SheetTitle>Edit Product</SheetTitle>
        <SheetClose asChild>
          <Button size={"icon"} variant={"secondary"}>
            <X />
          </Button>
        </SheetClose>
      </SheetHeader>
      <div className="scrollbar-none overflow-y-auto">
        <ProductEditForm product={product} />
      </div>
    </SheetContent>
  </Sheet>
);
