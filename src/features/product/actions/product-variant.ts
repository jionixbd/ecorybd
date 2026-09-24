"use server";

import { insertProductVariantUseCase } from "@/features/product/use-cases/product-variant";
import { insertProductVariantSchema } from "@/features/product/validations/product-variant";
import { organizationAction } from "@/lib/safe-action";
import z from "zod";

export const createProductVariantAction = organizationAction
  .metadata({
    actionName: "product-variant:created",
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
