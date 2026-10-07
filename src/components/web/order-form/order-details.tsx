"use client";

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/drizzle/schema";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { formatBDT } from "@/lib/format-bdt";
import { cn } from "cn";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface OrderDetailsProps {
  additional?: {
    product: Product;
    variant: PublicProductVariantWithRelations;
  } | null;
  delivery: number;
  product: Product;
  subtotal: number;
  total: number;
  unitPrice: number;
  variant: PublicProductVariantWithRelations | undefined;
}

export const OrderDetails = ({
  product,
  variant,
  unitPrice,
  subtotal,
  delivery,
  total,
  additional,
}: OrderDetailsProps) => (
  <FieldSet className="grid">
    <FieldLegend className="font-hind text-[#173c2d] text-lg!">
      আপনার অর্ডারের বিবরণ
    </FieldLegend>

    <FieldGroup>
      <div className="flex flex-col">
        <OrderDetailsItem
          product={product}
          unitPrice={unitPrice}
          variant={variant}
        />

        {additional ? (
          <OrderDetailsItem
            product={additional.product}
            unitPrice={additional.variant.salePrice ?? additional.variant.price}
            variant={additional.variant}
          />
        ) : null}
      </div>
      <Separator className="border border-[#173c2d]/50 border-dashed bg-transparent" />
      <OrderEntity label="Subtotal" value={formatBDT(subtotal)} />
      <OrderEntity label="Shipping" value={formatBDT(delivery)} />
      <Separator className="bg-[#173c2d]/50" />
      <OrderEntity bold label="Total" value={formatBDT(total)} />
    </FieldGroup>
  </FieldSet>
);

function OrderEntity({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-2">
      <span className="font-hind text-[#173c2d]/70">{label}</span>
      <span
        className={cn("text-end font-base text-[#173c2d]", bold && "font-bold")}
      >
        {value}
      </span>
    </div>
  );
}

const OrderDetailsItem = ({
  variant,
  product,
  unitPrice,
}: {
  variant: PublicProductVariantWithRelations | undefined;
  product: Product;
  unitPrice: number;
}) => (
  <div className="grid grid-cols-[56px_1fr_1fr] items-center gap-2 py-2">
    <div>
      {variant?.media ? (
        <Image
          alt={variant?.name}
          className="size-14 rounded-2xl"
          height={variant?.media.height || 48}
          src={variant?.media.ufsUrl}
          width={variant?.media.width || 48}
        />
      ) : (
        <div className="flex aspect-square size-14 items-center justify-center rounded-2xl bg-accent">
          <ImageIcon className="text-muted-foreground" />
        </div>
      )}
    </div>
    <div className="flex flex-col items-start">
      <FieldTitle className="font-hind text-base text-web-foreground">
        {product.name}
      </FieldTitle>
      <FieldDescription className="font-hind">{variant?.name}</FieldDescription>
    </div>
    <div className="flex flex-col items-end">
      <FieldTitle className="font-hind text-base text-web-foreground">
        {formatBDT(unitPrice)}
      </FieldTitle>
    </div>
  </div>
);
