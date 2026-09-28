"use server";

import { getAvailableVariantShippingUseCase } from "@/features/product/use-cases/storefront/product-variant-shipping";
import { publicAction } from "@/lib/safe-action";
import { z } from "zod";

export const getAvailableVariantShippingAction = publicAction
  .metadata({
    actionName: "storefront:product-variant-shipping:get-available",
  })
  .inputSchema(
    z.object({
      productVariantId: z.uuid(),
    })
  )
  .action(
    async ({ parsedInput }) =>
      await getAvailableVariantShippingUseCase(parsedInput)
  );
