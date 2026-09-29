"use server";

import { orders } from "@/drizzle/schema/order";
import {
  deleteOrderUseCase,
  insertOrderUseCase,
  updateOrderStatusUseCase,
} from "@/features/order/use-cases/order";
import { orderFormSchema } from "@/features/order/validation/order";
import { organizationAction, publicAction } from "@/lib/safe-action";
import { getStorefrontContext } from "@/lib/storefront/get-storefront-context";
import z from "zod";

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

export const updateOrderStatusAction = organizationAction
  .metadata({
    actionName: "order:update-status",
  })
  .inputSchema(
    z.object({
      input: z.object({
        status: z.enum(orders.status.enumValues),
      }),
      orderId: z.uuid(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await updateOrderStatusUseCase({
        input: parsedInput.input,
        orderId: parsedInput.orderId,
        organizationId: ctx.organization.organizationId,
      })
  );

export const deleteOrderAction = organizationAction
  .metadata({
    actionName: "order:delete",
  })
  .inputSchema(
    z.object({
      orderId: z.uuid(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await deleteOrderUseCase({
        orderId: parsedInput.orderId,
        organizationId: ctx.organization.organizationId,
      })
  );
