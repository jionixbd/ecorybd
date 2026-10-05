"use client";

import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "@/drizzle/schema";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { formatBDT } from "@/lib/format-bdt";
import { cn } from "cn";
import { Image as ImageIcon, Truck } from "lucide-react";
import Image from "next/image";

interface OrderDetailsProps {
  delivery: number;
  disabled: boolean;
  isNavigating: boolean;
  isSubmitting: boolean;
  orderFormId: string;
  product: Product;
  subtotal: number;
  total: number;
  unitPrice: number;
  variant: PublicProductVariantWithRelations | undefined;
}

export const OrderDetails = ({
  orderFormId,
  product,
  variant,
  unitPrice,
  subtotal,
  delivery,
  total,
  disabled,
  isSubmitting,
  isNavigating,
}: OrderDetailsProps) => {
  const buttonLabel = (() => {
    if (isSubmitting) {
      return "অর্ডারটি নিশ্চিত করা হচ্ছে...";
    }
    if (isNavigating) {
      return "অর্ডার সম্পন্ন হয়েছে";
    }
    return "অর্ডার করুন";
  })();

  return (
    <FieldSet className="grid">
      <FieldLegend className="font-hind text-[#173c2d] text-lg!">
        আপনার অর্ডারের বিবরণ
      </FieldLegend>

      <FieldGroup>
        <div className="grid grid-cols-2 items-center gap-2 py-2">
          <div>
            {variant?.media ? (
              <Image
                alt={variant.name}
                className="size-14 rounded-2xl"
                height={variant.media.height || 48}
                src={variant.media.ufsUrl}
                width={variant.media.width || 48}
              />
            ) : (
              <div className="flex aspect-square size-14 items-center justify-center rounded-2xl bg-accent">
                <ImageIcon className="text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <FieldTitle className="font-hind text-[#173c2d] text-base">
              {product.name}
            </FieldTitle>
            <FieldDescription className="font-hind">
              {variant?.name}
            </FieldDescription>
          </div>
        </div>

        <Separator className="border border-[#173c2d]/50 border-dashed bg-transparent" />
        <OrderEntity label="Price" value={formatBDT(unitPrice)} />
        <OrderEntity label="Subtotal" value={formatBDT(subtotal)} />
        <OrderEntity label="Shipping" value={formatBDT(delivery)} />
        <Separator className="bg-[#173c2d]/50" />
        <OrderEntity bold label="Total" value={formatBDT(total)} />

        <div className="grid grid-cols-[56px_1fr] items-center gap-2">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#173c2d]/10">
            <Truck className="text-[#173c2d]/70" />
          </div>
          <div>
            <div className="font-hind text-[#173c2d] text-lg!">
              ক্যাশঅন ডেলিভারি
            </div>
            <p className="font-hind text-[#173c2d]">
              পন্য হাতে পেয়ে মূল্য পরিশোধ করবেন
            </p>
          </div>
        </div>

        <Button
          className="min-h-12 w-full bg-[#e87541] font-hind text-[#f8f7f1]! text-lg hover:bg-[#e87541]/80! disabled:opacity-70!"
          disabled={disabled}
          form={orderFormId}
          type="submit"
        >
          {!!(isSubmitting || isNavigating) && <Spinner />}
          {buttonLabel}
        </Button>
      </FieldGroup>
    </FieldSet>
  );
};

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
