"use server";

import {
  insertProductVariantUseCase,
  updateProductVariantUseCase,
} from "@/features/product/use-cases/product-variant";
import {
  insertProductVariantSchema,
  updateProductVariantSchema,
} from "@/features/product/validations/product-variant";
import { organizationAction } from "@/lib/safe-action";
import z from "zod";

export const createProductVariantAction = organizationAction
  .metadata({
    actionName: "product-variant:create",
  })
  .inputSchema(
    z.object({
      input: insertProductVariantSchema,
      slug: z.string(),
    })
  )
  .action(
    async ({ parsedInput }) =>
      await insertProductVariantUseCase({
        input: parsedInput.input,
        slug: parsedInput.slug,
      })
  );

export const updateProductVariantAction = organizationAction
  .metadata({
    actionName: "product-variant:update",
  })
  .inputSchema(
    z.object({
      input: updateProductVariantSchema,
      productSlug: z.string(),
      productVariantId: z.string(),
    })
  )
  .action(
    async ({ parsedInput }) =>
      await updateProductVariantUseCase({
        input: parsedInput.input,
        productSlug: parsedInput.productSlug,
        productVariantId: parsedInput.productVariantId,
      })
  );
