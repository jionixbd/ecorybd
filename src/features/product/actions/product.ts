"use server";

import {
  insertProductUseCase,
  updateProductUseCase,
} from "@/features/product/use-cases/product";
import {
  insertProductSchema,
  updateProductSchema,
} from "@/features/product/validations/product";
import { organizationAction } from "@/lib/safe-action";
import z from "zod";

export const updateProductAction = organizationAction
  .metadata({
    actionName: "product:update",
  })
  .inputSchema(
    z.object({
      input: updateProductSchema,
      productId: z.uuid(),
    })
  )
  .action(
    async ({ parsedInput }) =>
      await updateProductUseCase({
        input: parsedInput.input,
        productId: parsedInput.productId,
      })
  );

export const createProductAction = organizationAction
  .metadata({
    actionName: "product:created",
  })
  .inputSchema(insertProductSchema)
  .action(
    async ({ parsedInput }) =>
      await insertProductUseCase({ input: parsedInput })
  );
