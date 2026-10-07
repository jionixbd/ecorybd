import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import type { OrderFormInput } from "@/features/order/validation/order";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { formatBDT } from "@/lib/format-bdt";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { Controller, type Control } from "react-hook-form";

interface OrderFormAddonProps {
  control: Control<OrderFormInput>;
  orderFormId: string;
  variant: PublicProductVariantWithRelations;
}

export const OrderFormAddon = ({
  control,
  variant,
  orderFormId,
}: OrderFormAddonProps) => {
  const price = variant.salePrice ?? variant.price;
  const inputId = `${orderFormId}-product-${variant.productVariantId}`;

  return (
    <div className="flex rounded-2xl border border-web-border bg-web-secondary p-2">
      <FieldSet>
        <FieldLegend className="px-2 font-hind text-lg! text-web-secondary-foreground">
          হ্যাঁ আমি অশ্বশক্তি নিতে চাই!
        </FieldLegend>
        <Controller
          control={control}
          name="additionalProductVariantId"
          render={({ field }) => (
            <FieldLabel
              className="relative w-full rounded-2xl border bg-web-card p-2 has-data-checked:border-web-border has-data-checked:bg-web-inverse-muted/40"
              htmlFor={inputId}
            >
              <FieldContent className="grid grid-cols-[64px_1fr] items-center gap-4 md:grid-cols-[112px_1fr]">
                <div>
                  {variant.media ? (
                    <Image
                      alt={variant.name}
                      className="size-16 rounded-2xl md:size-28"
                      height={variant.media.height || 100}
                      src={variant.media.ufsUrl}
                      width={variant.media.width || 100}
                    />
                  ) : (
                    <div className="flex aspect-square size-16 items-center justify-center rounded-2xl bg-accent md:size-20">
                      <ImageIcon className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div>
                  <FieldTitle className="font-hind text-lg text-web-card-foreground">
                    {variant.name}
                  </FieldTitle>

                  {!!variant.offerNote && (
                    <FieldDescription className="font-hind text-web-card-foreground/60!">
                      {variant.offerNote}
                    </FieldDescription>
                  )}

                  <FieldDescription className="flex gap-2 font-hind text-web-card-foreground">
                    <span className="text-web-card-foreground/60! line-through">
                      {formatBDT(variant.price)}
                    </span>
                    {formatBDT(price)}
                  </FieldDescription>
                </div>
              </FieldContent>

              <Checkbox
                checked={field.value === variant.productVariantId}
                className="bg-web-primary"
                id={inputId}
                onCheckedChange={(checked) =>
                  field.onChange(checked ? variant.productVariantId : undefined)
                }
              />
            </FieldLabel>
          )}
        />
      </FieldSet>
    </div>
  );
};
