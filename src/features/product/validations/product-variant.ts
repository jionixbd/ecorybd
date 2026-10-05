import { productStatusEnum } from "@/drizzle/schema/product";
import z from "zod";

const TWO_DECIMAL_PLACES_REGEX = /^\d+(\.\d{1,2})?$/;

export const insertProductVariantSchema = z.object({
  badge: z
    .string()
    .max(128)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  isDefault: z.boolean().default(true),
  name: z.string().min(5).max(255).default("Default"),
  offerNote: z
    .string()
    .max(255)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  price: z.coerce
    .number()
    .min(0)
    .max(99_999_999.99)
    .refine((v) => TWO_DECIMAL_PLACES_REGEX.test(v.toString())),
  salePrice: z.coerce
    .number()
    .min(0)
    .max(99_999_999.99)
    .refine((v) => TWO_DECIMAL_PLACES_REGEX.test(v.toString()))
    .nullish(),
  sku: z.string().min(5).max(64),
  slug: z.string().min(5).max(255),
  status: z.enum(productStatusEnum.enumValues).default("draft"),
  stockQuantity: z.preprocess(
    (v) => (v === "" || v === undefined ? 0 : v),
    z.coerce.number().int().min(0).max(2_147_483_647)
  ),
});

export const updateProductVariantSchema = insertProductVariantSchema
  .omit({
    isDefault: true,
  })
  .partial();

export const productVariantFormSchema = z.object({
  badge: z.string().max(128).optional(),
  name: z.string().min(5).max(255),
  offerNote: z.string().max(255).optional(),
  price: z
    .number()
    .min(0)
    .max(99_999_999.99)
    .refine((v) => TWO_DECIMAL_PLACES_REGEX.test(v.toFixed(2))),
  salePrice: z
    .number()
    .min(0)
    .max(99_999_999.99)
    .refine((v) => TWO_DECIMAL_PLACES_REGEX.test(v.toFixed(2)))
    .optional(),
  sku: z.string().min(5).max(64),
  slug: z.string().min(5).max(255),
  status: z.enum(productStatusEnum.enumValues),
  stockQuantity: z.number().int().min(0).max(2_147_483_647),
});

export const updateProductVariantFormSchema = productVariantFormSchema;

export type UpdateProductVariantFromInput = z.infer<
  typeof updateProductVariantFormSchema
>;
export type ProductVariantFromInput = z.infer<typeof productVariantFormSchema>;

export type InsertProductVariantInput = z.infer<
  typeof insertProductVariantSchema
>;
export type UpdateProductVariantInput = z.infer<
  typeof updateProductVariantSchema
>;
