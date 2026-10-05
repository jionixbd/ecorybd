"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import type { Product } from "@/drizzle/schema";
import {
  toTrackBeginCheckout,
  toTrackOrderPurchase,
} from "@/features/analytics/track/order";
import { insertOrderAction } from "@/features/order/actions/order";
import {
  type OrderFormInput,
  orderFormSchema,
} from "@/features/order/validation/order";
import { getAvailableVariantShippingAction } from "@/features/product/actions/product-variant-shipping";
import type { PublicProductVariantWithRelations } from "@/features/product/types/product-variant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { OrderDetails } from "@/components/web/order-form/order-details";
import { ProductVariantGrid } from "@/components/web/order-form/product-variant-grid";
import { ShippingAddressFields } from "@/components/web/order-form/shipping-address-fields";
import {
  type ShippingOption,
  type ShippingView,
  ShippingMethodFields,
} from "@/components/web/order-form/shipping-method-fields";

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
  const pathname = usePathname();
  const hasTrackedBeginCheckout = useRef(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    executeAsync: executeInsertOrder,
    isPending: isSubmittingOrder,
    reset: resetInsertOrder,
  } = useAction(insertOrderAction, {
    onError() {
      toast.error("অর্ডারটি দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    },
    onSuccess({ data }) {
      toTrackOrderPurchase(data);
      toast.success(`আপনার অর্ডার গ্রহণ করা হয়েছে। অর্ডার নম্বর: ${data.orderNumber}`);

      form.reset({
        address: "",
        name: "",
        phone: "",
        productVariantId:
          variants.find((v) => v.isDefault)?.productVariantId ??
          variants[0]?.productVariantId ??
          "",
        shippingMethodId: "",
      });
      setIsNavigating(true);
      resetInsertOrder();

      window.setTimeout(() => {
        router.push(`/${locale}/thank-you?order=${data.orderNumber}`);
      }, 0);
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
  const productVariantId = useWatch({
    control: form.control,
    name: "productVariantId",
  });

  const quantity = 1;
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Ok
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

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

  useEffect(() => {
    if (
      !variant ||
      variant.stockQuantity < 1 ||
      hasTrackedBeginCheckout.current
    ) {
      return;
    }
    hasTrackedBeginCheckout.current = true;

    toTrackBeginCheckout({
      items: [
        {
          productName: product.name,
          quantity,
          sku: variant.sku,
          unitPrice,
          variantName: variant.name,
        },
      ],
      value: subtotal,
    });
  }, [product.name, subtotal, unitPrice, variant]);

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

  const shippingView: ShippingView = (() => {
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

  const orderDisabled =
    form.formState.isSubmitting ||
    !variant ||
    variant.stockQuantity < 1 ||
    isSubmittingOrder ||
    isNavigating;

  return (
    <Card className="mx-auto max-w-5xl bg-[#f9fafb] py-4 lg:py-16">
      <CardContent className="px-4">
        <form
          className="mx-auto grid w-full max-w-xl gap-8 lg:max-w-4xl"
          id={ORDER_FROM}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* PRODUCT VARIANTS */}
          <FieldSet className="grid">
            <FieldLegend className="font-hind text-[#173c2d] text-xl!">
              যেকোনো একটি প্যাকেজ নির্বাচন করুন
            </FieldLegend>

            <FieldGroup>
              <Controller
                control={form.control}
                name="productVariantId"
                render={({ field }) => (
                  <ProductVariantGrid
                    name={field.name}
                    onChange={field.onChange}
                    orderFormId={ORDER_FROM}
                    value={field.value}
                    variants={variants}
                  />
                )}
              />
            </FieldGroup>
          </FieldSet>

          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="grid grid-cols-1 gap-8">
              {/* BILLING ADDRESS */}
              <FieldSet className="grid">
                <FieldLegend className="font-hind text-[#173c2d] text-lg!">
                  বিলিং বিবরণ
                </FieldLegend>

                <ShippingAddressFields
                  control={form.control}
                  orderFormId={ORDER_FROM}
                />
              </FieldSet>

              {/* SHIPPING METHOD */}
              <FieldSet className="grid">
                <FieldLegend className="font-hind text-[#173c2d] text-lg!">
                  শিপিং চার্জ
                </FieldLegend>

                <Controller
                  control={form.control}
                  name="shippingMethodId"
                  render={({ field, fieldState }) => (
                    <ShippingMethodFields
                      invalid={fieldState.invalid}
                      onChange={field.onChange}
                      orderFormId={ORDER_FROM}
                      productVariantId={productVariantId}
                      shippingError={shippingError}
                      shippingOptions={shippingOptions}
                      shippingView={shippingView}
                      value={field.value}
                    />
                  )}
                />
              </FieldSet>
            </div>

            <div>
              <OrderDetails
                delivery={delivery}
                disabled={orderDisabled}
                isNavigating={isNavigating}
                isSubmitting={isSubmittingOrder}
                orderFormId={ORDER_FROM}
                product={product}
                subtotal={subtotal}
                total={total}
                unitPrice={unitPrice}
                variant={variant}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
