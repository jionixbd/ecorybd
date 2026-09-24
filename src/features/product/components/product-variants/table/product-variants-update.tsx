import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductVariantUpdateForm } from "@/features/product/components/product-variants/product-variants-update-form";
import type { ProductVariantWithRelations } from "@/features/product/types/product-variant";
import { X } from "lucide-react";

interface ProductVariantUpdateProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  variant: ProductVariantWithRelations | null;
}

export const ProductVariantUpdate = ({
  variant,
  ...props
}: ProductVariantUpdateProps) => (
  <Sheet {...props}>
    <SheetContent
      className="data-[side=right]:sm:max-w-xl"
      showCloseButton={false}
    >
      <SheetHeader className="flex flex-row items-center justify-between px-4 md:px-8">
        <SheetTitle>Create Variant</SheetTitle>
        <SheetClose asChild>
          <Button size={"icon"} variant={"secondary"}>
            <X />
          </Button>
        </SheetClose>
      </SheetHeader>
      <div className="scrollbar-none overflow-y-auto">
        <ProductVariantUpdateForm variant={variant} />
      </div>
    </SheetContent>
  </Sheet>
);
