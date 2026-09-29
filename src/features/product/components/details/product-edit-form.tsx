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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productStatusEnum, type Product } from "@/drizzle/schema";
import { updateProductAction } from "@/features/product/actions/product";
import {
  productFormSchema,
  type ProductFormInput,
} from "@/features/product/validations/product";
// import { useDebounceSlug } from "@/hooks/use-debounce-slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProductEditFormProps {
  product: Product;
}

export const ProductEditForm = ({ product }: ProductEditFormProps) => {
  const router = useRouter();

  const { executeAsync, isPending } = useAction(updateProductAction, {
    onError({ error }) {
      console.log(error);
      toast.error(
        `[${error.serverError?.code}]: ${error.serverError?.message}`
      );
    },
    onSuccess({ data }) {
      toast.success("Product Updated");

      const newSlug = data.slug;
      const oldSlug = product.slug;

      if (newSlug && newSlug !== oldSlug) {
        router.replace(`/workspace/ecorybd/products/${newSlug}`);
      }
    },
  });

  const form = useForm<ProductFormInput>({
    defaultValues: {
      badge: product.badge ?? "",
      isFeatured: product.isFeatured,
      name: product.name,
      slug: product.slug,
      status: product.status,
      tempDescription: product.tempDescription,
      tempShortDescription: product.tempShortDescription,
    },
    resolver: zodResolver(productFormSchema),
  });

  // const name = useWatch({
  //   control: form.control,
  //   name: "name",
  // });

  // useDebounceSlug({
  //   getValues: form.getValues,
  //   name,
  //   setValue: form.setValue,
  // });

  async function onSubmit(values: ProductFormInput) {
    try {
      await executeAsync({
        input: values,
        productId: product.productId,
      });
    } catch {}
  }

  return (
    <Item size={"md"}>
      <ItemContent>
        <form id="product-update-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                          Product Status
                        </FieldLabel>
                        <FieldDescription className="font-light text-muted-foreground text-xs">
                          Product current status, Draft will not be published.
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
                          {productStatusEnum.enumValues.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                {/* Product Featured */}
                <Controller
                  control={form.control}
                  name="isFeatured"
                  render={({ field, fieldState }) => (
                    <Field
                      className="rounded-xl bg-muted px-4 py-4"
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                    >
                      <FieldContent>
                        <FieldLabel
                          className="font-normal text-xs"
                          htmlFor="product-update-form-featured"
                        >
                          Featured ?
                        </FieldLabel>
                        <FieldDescription className="font-light text-muted-foreground text-xs">
                          Make this product featured.
                        </FieldDescription>
                      </FieldContent>
                      <Switch
                        aria-invalid={fieldState.invalid}
                        checked={field.value}
                        id="product-update-form-featured"
                        name={field.name}
                        onCheckedChange={field.onChange}
                      />
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

                {/* badge */}
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

                {/* Short Description */}
                <Controller
                  control={form.control}
                  name="tempShortDescription"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor="product-update-form-short-description"
                      >
                        Short Description
                      </FieldLabel>
                      <Textarea
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className="min-h-20"
                        id="product-update-form-short-description"
                        placeholder="I'm a software engineer..."
                      />
                      {!!fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Description */}
                <Controller
                  control={form.control}
                  name="tempDescription"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="font-light text-muted-foreground text-xs"
                        htmlFor="product-update-form-short-description"
                      >
                        Description
                      </FieldLabel>
                      <Textarea
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className="min-h-30"
                        id="product-update-form-short-description"
                        placeholder="I'm a software engineer..."
                      />
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
                  form="product-update-form"
                  type="submit"
                >
                  <Send />
                  Update
                </Button>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </ItemContent>
    </Item>
  );
};
