import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductVariantsCreateForm } from "@/features/product/components/product-variants/product-variants-create-form";
import { Plus, X } from "lucide-react";

export const ProductVariantsCreate = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant={"default"}>
        Create
        <Plus />
      </Button>
    </SheetTrigger>
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
        <ProductVariantsCreateForm />
      </div>
    </SheetContent>
  </Sheet>
);
