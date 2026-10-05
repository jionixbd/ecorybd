"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import { ProductVariantCard } from "@/components/web/order-form/product-variant-card";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";

interface ProductVariantGridProps {
  name: string;
  onChange: (value: string) => void;
  orderFormId: string;
  value: string;
  variants: PublicProductVariantWithRelations[];
}

export const ProductVariantGrid = ({
  orderFormId,
  name,
  value,
  variants,
  onChange,
}: ProductVariantGridProps) => (
  <RadioGroup
    className="grid grid-cols-1 lg:grid-cols-2"
    name={name}
    onValueChange={onChange}
    value={value}
  >
    {variants.map((variant) => (
      <ProductVariantCard
        key={variant.productVariantId}
        orderFormId={orderFormId}
        variant={variant}
      />
    ))}
  </RadioGroup>
);
