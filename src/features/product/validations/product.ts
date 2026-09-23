import { productStatusEnum } from "@/drizzle/schema";
import { z } from "zod";

export const productFormSchema = z.object({
  badge: z.string().max(64).optional(),
  isFeatured: z.boolean(),
  name: z.string().min(5).max(255),
  slug: z.string().min(5).max(255),
  status: z.enum(productStatusEnum.enumValues),
  tempDescription: z.string(),
  tempShortDescription: z.string(),
});

export const updateProductSchema = productFormSchema.extend({
  badge: z
    .string()
    .max(64)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
