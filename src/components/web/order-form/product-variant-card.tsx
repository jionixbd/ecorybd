"use client";

import { Badge } from "@/components/ui/badge";
import {
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { formatBDT } from "@/lib/format-bdt";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProductVariantCardProps {
  orderFormId: string;
  variant: PublicProductVariantWithRelations;
}

export const ProductVariantCard = ({
  orderFormId,
  variant,
}: ProductVariantCardProps) => {
  const price = variant.salePrice ?? variant.price;
  const inputId = `${orderFormId}-product-${variant.productVariantId}`;

  return (
    <FieldLabel
      className="relative w-full rounded-2xl border border-[#173c2d]/10! bg-[#f8f7f1]/60 p-2 has-data-checked:border-[#173c2d] has-data-checked:bg-[#173c2d]/10"
      htmlFor={inputId}
    >
      <FieldContent className="grid grid-cols-[80px_1fr] items-center gap-4">
        <div>
          {variant.media ? (
            <Image
              alt={variant.name}
              className="size-16 rounded-2xl md:size-20"
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
          <FieldTitle className="font-hind text-[#173c2d]! text-base">
            {variant.name}
          </FieldTitle>

          {!!variant.badge && (
            <Badge className="absolute top-1 right-1 bg-[#e87541] px-3! font-hind text-[#f8f7f1]!">
              {variant.badge}
            </Badge>
          )}

          {!!variant.offerNote && (
            <FieldDescription className="font-hind text-[#173c2d]/60!">
              {variant.offerNote}
            </FieldDescription>
          )}

          <FieldDescription className="flex gap-2 font-hind text-[#173c2d]">
            <span className="text-[#173c2d]/60! line-through">
              {formatBDT(variant.price)}
            </span>
            {formatBDT(price)}
          </FieldDescription>
        </div>
      </FieldContent>

      <RadioGroupItem
        disabled={variant.stockQuantity < 1}
        id={inputId}
        value={variant.productVariantId}
      />
    </FieldLabel>
  );
};
