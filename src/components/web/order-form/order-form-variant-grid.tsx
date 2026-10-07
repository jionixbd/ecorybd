"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import { OrderFormVariantCard } from "@/components/web/order-form/order-form-variant-card";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";

interface OrderFormVariantGridProps {
  name: string;
  onChange: (value: string) => void;
  orderFormId: string;
  value: string;
  variants: PublicProductVariantWithRelations[];
}

export const OrderFormVariantGrid = ({
  orderFormId,
  name,
  value,
  variants,
  onChange,
}: OrderFormVariantGridProps) => (
  <RadioGroup
    className="grid grid-cols-1 lg:grid-cols-2"
    name={name}
    onValueChange={onChange}
    value={value}
  >
    {variants.map((variant) => (
      <OrderFormVariantCard
        key={variant.productVariantId}
        orderFormId={orderFormId}
        variant={variant}
      />
    ))}
  </RadioGroup>
);
