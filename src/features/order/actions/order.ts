"use server";

import { insertOrderUseCase } from "@/features/order/user-case/order";
import { orderFormSchema } from "@/features/order/validation/order";
import { publicAction } from "@/lib/safe-action";
import { getStorefrontContext } from "@/lib/storefront/get-storefront-context";

export const insertOrderAction = publicAction
  .metadata({
    actionName: "storefront:order:insert",
  })
  .inputSchema(orderFormSchema)
  .action(async ({ parsedInput }) => {
    const { organizationId } = getStorefrontContext();

    return await insertOrderUseCase({
      input: parsedInput,
      organizationId,
    });
  });
