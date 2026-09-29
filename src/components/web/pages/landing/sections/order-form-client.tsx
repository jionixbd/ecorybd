"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/drizzle/schema";
import { insertOrderAction } from "@/features/order/actions/order";
import {
  type OrderFormInput,
  orderFormSchema,
} from "@/features/order/validation/order";
import { getAvailableVariantShippingAction } from "@/features/product/actions/product-variant-shipping";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { formatBDT } from "@/lib/format-bdt";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { Image as ImageIcon, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface ShippingOption {
  charge: number;
  code: string;
  description: string | null;
  label: string | null;
  name: string;
  shippingMethodId: string;
}

const ORDER_FROM = "order-submission-form";

export function OrderFormClient({
  variants,
  product,
}: {
  product: Product;
  variants: PublicProductVariantWithRelations[];
}) {
  const router = useRouter();
  const locale = useLocale();

  const { executeAsync: executeInsertOrder, isPending: isSubmittingOrder } =
    useAction(insertOrderAction, {
      onError({ error }) {
        console.log(error);

        toast.error("অর্ডারটি দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      },

      onSuccess({ data }) {
        toast.success(
          `আপনার অর্ডার গ্রহণ করা হয়েছে। অর্ডার নম্বর: ${data.orderNumber}`
        );

        router.replace(`/${locale}/thank-you?order=${data.orderNumber}`);
      },
    });

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingError, setShippingError] = useState("");

  const form = useForm<OrderFormInput>({
    defaultValues: {
      address: "",
      name: "",
      phone: "",
      productVariantId:
        variants.find((v) => v.isDefault)?.productVariantId ??
        variants[0]?.productVariantId ??
        "",
      shippingMethodId: "",
    },
    resolver: zodResolver(orderFormSchema),
  });

  const { executeAsync, isPending: isLoadingShipping } = useAction(
    getAvailableVariantShippingAction
  );

  const shippingMethodId = useWatch({
    control: form.control,
    name: "shippingMethodId",
  });
  const quantity = 1;
  const productVariantId = useWatch({
    control: form.control,
    name: "productVariantId",
  });

  const variant = variants.find(
    (item) => item.productVariantId === productVariantId
  );
  const shipping = shippingOptions.find(
    (item) => item.shippingMethodId === shippingMethodId
  );
  const unitPrice = variant ? (variant.salePrice ?? variant.price) : 0;
  const subtotal = unitPrice * quantity;
  const delivery = shipping?.charge ?? 0;
  const total = subtotal + delivery;

  const shippingView = (() => {
    if (isLoadingShipping) {
      return "loading";
    }
    if (shippingError) {
      return "error";
    }
    if (shippingOptions.length > 0) {
      return "options";
    }
    if (productVariantId) {
      return "empty";
    }
    return "idle";
  })();

  useEffect(() => {
    if (!productVariantId) {
      setShippingOptions([]);
      return;
    }

    let isCurrent = true;

    form.setValue("shippingMethodId", "");
    setShippingOptions([]);
    setShippingError("");

    executeAsync({ productVariantId })
      .then((result) => {
        if (!isCurrent) {
          return;
        }

        if (!result.data) {
          setShippingError("Could not load delivery methods.");
          return;
        }

        setShippingOptions(result.data);

        if (result.data.length === 1) {
          form.setValue("shippingMethodId", result.data[0].shippingMethodId);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setShippingError("Could not load delivery methods.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [executeAsync, form, productVariantId]);

  async function onSubmit(values: OrderFormInput) {
    const selected = variants.find(
      (item) => item.productVariantId === values.productVariantId
    );

    if (!selected) {
      return;
    }

    await executeInsertOrder({
      address: values.address,
      name: values.name,
      phone: values.phone,
      productVariantId: values.productVariantId,
      shippingMethodId: values.shippingMethodId,
    });
  }

  return (
    <Card className="bg-[#173c2d] p-8 lg:p-16">
      <CardContent>
        <form
          className="mx-auto grid w-full max-w-xl gap-8 lg:max-w-4xl"
          id={ORDER_FROM}
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.error("Form validation errors:", errors)
          )}
        >
          {/* PRODUCT VARIANTS */}
          <FieldSet className="grid">
            <FieldLegend className="font-hind text-[#f8f7f1] text-lg!">
              যেকোনো একটি প্যাকেজ নির্বাচন করুন
            </FieldLegend>

            <FieldGroup>
              <Controller
                control={form.control}
                name="productVariantId"
                render={({ field }) => (
                  <RadioGroup
                    className="grid grid-cols-1 lg:grid-cols-2"
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {/* biome-ignore lint/suspicious/noShadow: Ok */}
                    {variants.map((variant) => {
                      const price = variant.salePrice ?? variant.price;

                      return (
                        <FieldLabel
                          className="w-full rounded-2xl border bg-[#f8f7f1] p-2 has-data-checked:border-[#e87541] has-data-checked:bg-[#e87541]"
                          htmlFor={`${ORDER_FROM}-product-${variant.productVariantId}`}
                          key={variant.productVariantId}
                        >
                          <FieldContent className="grid grid-cols-[100px_1fr] items-center gap-4">
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
                              <FieldDescription className="font-hind">
                                {formatBDT(price)}
                              </FieldDescription>
                            </div>
                          </FieldContent>
                          <RadioGroupItem
                            disabled={variant.stockQuantity < 1}
                            id={`${ORDER_FROM}-product-${variant.productVariantId}`}
                            value={variant.productVariantId}
                          />
                        </FieldLabel>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="grid grid-cols-1 gap-8">
              {/* BILLING ADDRESS */}
              <FieldSet className="grid">
                <FieldLegend className="font-hind text-[#f8f7f1] text-lg!">
                  বিলিং বিবরণ
                </FieldLegend>

                <FieldGroup className="gap-4">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="font-light text-[#f8f7f1]/70 text-xs"
                          htmlFor={field.name}
                        >
                          আপনার সম্পূর্ণ নাম লিখুন
                        </FieldLabel>
                        <InputGroup className="h-12!">
                          <InputGroupInput
                            aria-invalid={fieldState.invalid}
                            className="h-12! placeholder:text-[#173c2d]/60 dark:placeholder:text-[#f8f7f1]/30"
                            id={field.name}
                            placeholder="আপনার নাম"
                            {...field}
                          />
                        </InputGroup>
                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="font-light text-[#f8f7f1]/70 text-xs"
                          htmlFor={field.name}
                        >
                          আপনার ফোন নাম্বার
                        </FieldLabel>
                        <InputGroup className="h-12!">
                          <InputGroupInput
                            aria-invalid={fieldState.invalid}
                            className="h-12! placeholder:text-[#173c2d]/60 dark:placeholder:text-[#f8f7f1]/30"
                            id={field.name}
                            placeholder="+৮৮০ ১৭০০ ১২৩ ৪৫৬"
                            {...field}
                          />
                        </InputGroup>
                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="address"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="font-light text-[#f8f7f1]/70 text-xs"
                          htmlFor={`${ORDER_FROM}-product-billing-address`}
                        >
                          সম্পূর্ণ ঠিকানা পুরন করুন
                        </FieldLabel>
                        <Textarea
                          {...field}
                          aria-invalid={fieldState.invalid}
                          className="min-h-16! placeholder:text-[#173c2d]/60 dark:placeholder:text-[#f8f7f1]/30"
                          id={`${ORDER_FROM}-product-billing-address`}
                          placeholder="১২৩ রোড, যশোর, বাংলাদেশ"
                        />
                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>

              {/* SHIPPING METHOD  */}
              <FieldSet className="grid">
                <FieldLegend className="font-hind text-[#f8f7f1] text-lg!">
                  শিপিং চার্জ
                </FieldLegend>

                <Controller
                  control={form.control}
                  name="shippingMethodId"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
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

                          {shippingView === "error" && (
                            <p role="alert">{shippingError}</p>
                          )}

                          {shippingView === "empty" && (
                            <p>No delivery methods for this option.</p>
                          )}

                          {shippingView === "options" && (
                            <RadioGroup
                              className="grid w-full grid-cols-1 gap-2 p-0"
                              onValueChange={field.onChange}
                              value={field.value}
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
                                    className="w-full rounded-2xl bg-[#f8f7f1]! px-4"
                                    htmlFor={`${ORDER_FROM}-product-shipping-${option.shippingMethodId}`}
                                  >
                                    <RadioGroupItem
                                      id={`${ORDER_FROM}-product-shipping-${option.shippingMethodId}`}
                                      value={option.shippingMethodId}
                                    />
                                    <FieldContent className="flex min-h-12 flex-row items-center justify-between">
                                      <FieldTitle className="font-hind text-[#173c2d] text-base">
                                        {option.name}
                                      </FieldTitle>
                                      <FieldDescription className="font-hind">
                                        {formatBDT(option.charge)}
                                      </FieldDescription>
                                    </FieldContent>
                                  </FieldLabel>
                                </motion.div>
                              ))}
                            </RadioGroup>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </Field>
                  )}
                />
              </FieldSet>
            </div>
            <div>
              {/* ORDER DETAILS */}
              <FieldSet className="grid">
                <FieldLegend className="font-hind text-[#f8f7f1] text-lg!">
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
                      <FieldTitle className="font-hind text-[#f8f7f1] text-base">
                        {product.name}
                      </FieldTitle>
                      <FieldDescription className="font-hind">
                        {variant?.name}
                      </FieldDescription>
                    </div>
                  </div>
                  <Separator className="border border-[#f8f7f1]/50 border-dashed bg-transparent" />
                  <OrderEntity label="Price" value={formatBDT(unitPrice)} />
                  <OrderEntity label="Subtotal" value={formatBDT(subtotal)} />
                  <OrderEntity label="Shipping" value={formatBDT(delivery)} />
                  <Separator className="bg-[#f8f7f1]/50" />
                  <OrderEntity bold label="Total" value={formatBDT(total)} />
                  <div className="grid grid-cols-[56px_1fr] items-center gap-2">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#7d918b]">
                      <Truck className="text-[#f8f7f1]/70" />
                    </div>
                    <div>
                      <div className="font-hind text-[#f8f7f1] text-lg!">
                        ক্যাশঅন ডেলিভারি
                      </div>
                      <p className="font-hind text-[#f8f7f1]">
                        পন্য হাতে পেয়ে মূল্য পরিশোধ করবেন
                      </p>
                    </div>
                  </div>
                  <Button
                    className="min-h-12 w-full bg-[#e87541] font-hind text-lg"
                    disabled={
                      form.formState.isSubmitting ||
                      !variant ||
                      variant.stockQuantity < 1 ||
                      isSubmittingOrder
                    }
                    form={ORDER_FROM}
                    type="submit"
                  >
                    অর্ডার করুন
                  </Button>
                </FieldGroup>
              </FieldSet>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

const OrderEntity = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div className="grid grid-cols-2 items-center gap-2">
    <span className="font-hind text-[#f8f7f1]/70"> {label}</span>
    <span
      className={cn("text-end font-base text-[#f8f7f1]", bold && "font-bold")}
    >
      {value}
    </span>
  </div>
);
