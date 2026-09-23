"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProductAction } from "@/features/product/actions/product";
import {
  productCreateFormSchema,
  type ProductCreateFormInput,
} from "@/features/product/validations/product";
import { useDebounceSlug } from "@/hooks/use-debounce-slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, ChevronDownIcon, FastForward, Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export const ProductCreateForm = () => {
  const router = useRouter();

  const [continueToProduct, setContinueToProduct] = useState(false);

  const { executeAsync, isPending } = useAction(createProductAction, {
    onError({ error }) {
      console.log(error);
      toast.error(
        `[${error.serverError?.code}]: ${error.serverError?.message}`
      );
    },
    onSuccess({ data }) {
      toast.success("Product Created");
      const { slug } = data;

      if (continueToProduct) {
        router.replace(`/workspace/ecorybd/products/${slug}`);
      }

      form.reset({
        badge: "",
        isFeatured: false,
        name: "",
        slug: "",
        tempDescription: "",
        tempShortDescription: "",
      });
    },
  });

  const form = useForm<ProductCreateFormInput>({
    defaultValues: {
      badge: "",
      isFeatured: false,
      name: "",
      slug: "",
      tempDescription: "",
      tempShortDescription: "",
    },
    resolver: zodResolver(productCreateFormSchema),
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

  async function onSubmit(values: ProductCreateFormInput) {
    try {
      await executeAsync({
        ...values,
        status: "draft",
      });
    } catch {}
  }

  const handleContinue = async () => {
    setContinueToProduct(true);
    try {
      const values = productCreateFormSchema.parse(form.getValues());

      await executeAsync({
        ...values,
        status: "draft",
      });
    } catch {
      setContinueToProduct(false);
    }
  };

  return (
    <form id="product-create-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="hidden"> Information</FieldLegend>
          <FieldGroup className="gap-4">
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
                      placeholder="Winter Jacket"
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
                        placeholder="Warm and cosy"
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
                        placeholder="New arrival"
                        {...field}
                      />
                    </InputGroup>
                    {!!fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Short Description */}
            <Controller
              control={form.control}
              name="tempShortDescription"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-light text-muted-foreground text-xs"
                    htmlFor="product-create-form-short-description"
                  >
                    Short Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="min-h-20"
                    id="product-create-form-short-description"
                    placeholder="A warm and cosy jacket"
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
                    htmlFor="product-create-form-short-description"
                  >
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="min-h-30"
                    id="product-create-form-short-description"
                    placeholder="A winter jacket has many features"
                  />
                  {!!fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                      htmlFor="product-create-form-featured"
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
                    id="product-create-form-featured"
                    name={field.name}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Field>
            <ButtonGroup className="max-w-max self-end">
              <Button
                disabled={isPending}
                form="product-create-form"
                type="submit"
              >
                <Send />
                Save as draft
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      disabled={isPending}
                      onSelect={handleContinue}
                    >
                      <FastForward />
                      Continue
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive />
                      Archived
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
