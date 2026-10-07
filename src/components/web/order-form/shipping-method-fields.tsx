"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBDT } from "@/lib/format-bdt";
import { AnimatePresence, motion } from "motion/react";

export interface ShippingOption {
  charge: number;
  code: string;
  description: string | null;
  label: string | null;
  name: string;
  shippingMethodId: string;
}

export type ShippingView = "loading" | "error" | "options" | "empty" | "idle";

interface ShippingMethodFieldsProps {
  invalid?: boolean;
  onChange: (value: string) => void;
  orderFormId: string;
  productVariantId: string | undefined;
  shippingError: string;
  shippingOptions: ShippingOption[];
  shippingView: ShippingView;
  value: string;
}

export const ShippingMethodFields = ({
  orderFormId,
  productVariantId,
  shippingView,
  shippingError,
  shippingOptions,
  value,
  invalid,
  onChange,
}: ShippingMethodFieldsProps) => (
  <Field data-invalid={invalid}>
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-2"
        exit={{ opacity: 0, y: -4 }}
        initial={{ opacity: 0, y: 6 }}
        key={`${productVariantId}-${shippingView}`}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {shippingView === "loading" && (
          <div className="grid w-full grid-cols-1 gap-2">
            <Skeleton className="h-12 w-full bg-[#f1f3f3]" />
            <Skeleton className="h-12 w-full bg-[#f1f3f3]" />
          </div>
        )}

        {shippingView === "error" && <p role="alert">{shippingError}</p>}

        {shippingView === "empty" && (
          <p>No delivery methods for this option.</p>
        )}

        {shippingView === "options" && (
          <RadioGroup
            className="grid w-full grid-cols-1 gap-2 p-0"
            onValueChange={onChange}
            value={value}
          >
            {shippingOptions.map((option, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 8 }}
                key={option.shippingMethodId}
                transition={{
                  delay: index * 0.04,
                  duration: 0.18,
                  ease: "easeOut",
                }}
              >
                <FieldLabel
                  className="w-full rounded-2xl border border-web-card-foreground/10! bg-web-card px-4 has-data-checked:border-web-card-foreground has-data-checked:bg-web-inverse-muted/40"
                  htmlFor={`${orderFormId}-product-shipping-${option.shippingMethodId}`}
                >
                  <FieldContent className="flex min-h-12 flex-row items-center justify-between">
                    <FieldTitle className="font-hind text-base text-web-card-foreground">
                      {option.name}
                    </FieldTitle>
                    <FieldDescription className="font-hind text-web-card-foreground">
                      {formatBDT(option.charge)}
                    </FieldDescription>
                  </FieldContent>

                  <RadioGroupItem
                    id={`${orderFormId}-product-shipping-${option.shippingMethodId}`}
                    value={option.shippingMethodId}
                  />
                </FieldLabel>
              </motion.div>
            ))}
          </RadioGroup>
        )}
      </motion.div>
    </AnimatePresence>
    {!!invalid && <FieldError>একটি শিপিং পদ্ধতি নির্বাচন করুন</FieldError>}
  </Field>
);
