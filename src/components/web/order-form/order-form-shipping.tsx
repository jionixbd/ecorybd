"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import type { OrderFormInput } from "@/features/order/validation/order";
import { Controller, type Control } from "react-hook-form";

interface OrderFormShippingProps {
  control: Control<OrderFormInput>;
  orderFormId: string;
}

export const OrderFormShipping = ({
  control,
  orderFormId,
}: OrderFormShippingProps) => (
  <FieldGroup className="gap-4">
    <Controller
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            className="font-hind font-light text-web-card-foreground"
            htmlFor={field.name}
          >
            আপনার সম্পূর্ণ নাম লিখুন
          </FieldLabel>
          <InputGroup className="h-12! bg-web-surface">
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              className="h-12! font-hind text-web-card-foreground placeholder:text-web-muted-foreground"
              id={field.name}
              placeholder="আপনার নাম"
              {...field}
            />
          </InputGroup>
          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={control}
      name="phone"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            className="font-hind font-light text-web-card-foreground"
            htmlFor={field.name}
          >
            আপনার ফোন নাম্বার
          </FieldLabel>
          <InputGroup className="h-12! bg-web-surface">
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              className="h-12! font-hind text-web-card-foreground placeholder:text-web-muted-foreground"
              id={field.name}
              placeholder="+৮৮০ ১৭০০ ১২৩ ৪৫৬"
              {...field}
            />
          </InputGroup>
          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={control}
      name="address"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            className="font-hind font-light text-web-card-foreground"
            htmlFor={`${orderFormId}-product-billing-address`}
          >
            সম্পূর্ণ ঠিকানা পুরন করুন
          </FieldLabel>
          <Textarea
            {...field}
            aria-invalid={fieldState.invalid}
            className="min-h-16! bg-web-surface font-hind text-web-card-foreground placeholder:text-web-muted-foreground"
            id={`${orderFormId}-product-billing-address`}
            placeholder="১২৩ রোড, যশোর, বাংলাদেশ"
          />
          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </FieldGroup>
);
