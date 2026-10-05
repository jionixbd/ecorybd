"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemContent } from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productVariants } from "@/drizzle/schema";
import { createProductVariantAction } from "@/features/product/actions/product-variant";
import {
  productVariantFormSchema,
  type ProductVariantFromInput,
} from "@/features/product/validations/product-variant";
import { useDebounceSlug } from "@/hooks/use-debounce-slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export const ProductVariantsCreateForm = () => {
  const { product } = useParams<{ product: string }>();
  const { executeAsync, isPending } = useAction(createProductVariantAction, {
    onError({ error }) {
      toast.error(
        `[${error.serverError?.code}]: ${error.serverError?.message}`
      );
    },
    onSuccess() {
      toast.success("Product Variant Created");
    },
  });

  const form = useForm<ProductVariantFromInput>({
    defaultValues: {
      badge: "",
      name: "",
      offerNote: "",
      price: undefined,
      salePrice: undefined,
      sku: "",
      slug: "",
      status: "draft",
      stockQuantity: undefined,
    },
    resolver: zodResolver(productVariantFormSchema),
  });

  const name = useWatch({
    control: form.control,
    name: "name",
  });

  useDebounceSlug({
    getValues: form.getValues,
    name,
    setValue: form.setValue,
  });

  async function onSubmit(values: ProductVariantFromInput) {
    try {
      await executeAsync({
        input: values,
        productSlug: product,
      });
    } catch {}
  }

  return (
    <Item size={"md"}>
      <ItemContent>
        <form
          id="product-variants-create-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="hidden"> Information</FieldLegend>
              <FieldGroup className="gap-4">
                {/* Status */}
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <Field
                      className="rounded-xl bg-muted px-4 py-4"
                      data-invalid={fieldState.invalid}
                      orientation="responsive"
                    >
                      <FieldContent>
                        <FieldLabel
                          className="font-normal text-xs"
                          htmlFor="product-update-form-status"
                        >
                          Variant Status
                        </FieldLabel>
                        <FieldDescription className="font-light text-muted-foreground text-xs">
                          Product variant current status, Draft will not be
                          published.
                        </FieldDescription>

                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          aria-invalid={fieldState.invalid}
                          className="w-full! max-w-1/3"
                          id="product-update-form-status"
                        >
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {productVariants.status.enumValues.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                {/* Sku */}
                <Controller
                  control={form.control}
                  name="sku"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Sku
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="ecbd-p-10"
                          {...field}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Name */}
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Name
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="Name"
                          {...field}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Slug */}
                <Controller
                  control={form.control}
                  name="slug"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Slug
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="Slug"
                          {...field}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Price */}
                  <Controller
                    control={form.control}
                    name="price"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="font-light text-muted-foreground text-xs"
                          htmlFor={field.name}
                        >
                          Price
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            aria-invalid={fieldState.invalid}
                            id={field.name}
                            placeholder="0.00"
                            step={"0.01"}
                            type="number"
                            {...field}
                            onChange={(event) => {
                              const { value } = event.target;

                              field.onChange(
                                value === "" ? undefined : Number(value)
                              );
                            }}
                            value={field.value ?? ""}
                          />
                        </InputGroup>
                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  {/*Sale Price */}
                  <Controller
                    control={form.control}
                    name="salePrice"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className="font-light text-muted-foreground text-xs"
                          htmlFor={field.name}
                        >
                          Sale Price
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            aria-invalid={fieldState.invalid}
                            id={field.name}
                            placeholder="0.00"
                            step={"0.01"}
                            type="number"
                            {...field}
                            onChange={(event) => {
                              const { value } = event.target;

                              field.onChange(
                                value === "" ? undefined : Number(value)
                              );
                            }}
                            value={field.value ?? ""}
                          />
                        </InputGroup>
                        {!!fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                {/*Stock */}

                <Controller
                  control={form.control}
                  name="stockQuantity"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Stock
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="0"
                          step={"1"}
                          type="number"
                          {...field}
                          onChange={(event) => {
                            const { value } = event.target;

                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                          value={field.value ?? ""}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Badge */}
                <Controller
                  control={form.control}
                  name="badge"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Badge
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="Badge"
                          {...field}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Offer Note */}
                <Controller
                  control={form.control}
                  name="offerNote"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor={field.name}
                      >
                        Offer Note
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                          placeholder="offerNote"
                          {...field}
                        />
                      </InputGroup>
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Field>
                <Button
                  className="max-w-max self-end"
                  disabled={isPending}
                  form="product-variants-create-form"
                  type="submit"
                >
                  Create
                  <Send />
                </Button>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </ItemContent>
    </Item>
  );
};
