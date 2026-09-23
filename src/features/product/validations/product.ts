import { productStatusEnum } from "@/drizzle/schema";
import { z } from "zod";

export const productFormSchema = z.object({
  badge: z.string().max(64).optional(),
  isFeatured: z.boolean(),
  name: z.string().min(5).max(255),
  slug: z.string().min(5).max(255),
  status: z.enum(productStatusEnum.enumValues),
  tempDescription: z.string().min(5),
  tempShortDescription: z.string().min(5),
});

export const updateProductSchema = productFormSchema.extend({
  badge: z
    .string()
    .max(64)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
});

export const productCreateFormSchema = z.object({
  badge: z.string().max(64).optional(),
  isFeatured: z.boolean(),
  name: z.string().min(5).max(255),
  slug: z.string().min(5).max(255),
  tempDescription: z.string().min(5),
  tempShortDescription: z.string().min(5),
});

export const insertProductSchema = productCreateFormSchema.extend({
  badge: z
    .string()
    .max(64)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  status: z.enum(productStatusEnum.enumValues),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
export type ProductCreateFormInput = z.infer<typeof productCreateFormSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type InsertProductInput = z.infer<typeof insertProductSchema>;
