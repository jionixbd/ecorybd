"use server";

import {
  attachProductMediaUseCase,
  detachProductMediaUseCase,
  setFeaturedProductMediaUseCase,
} from "@/features/product/use-cases/product-media";
import { organizationAction } from "@/lib/safe-action";
import z from "zod";

export const attachProductMediaAction = organizationAction
  .metadata({
    actionName: "product:product-media:attach",
  })
  .inputSchema(
    z.object({
      mediaId: z.uuid(),
      productSlug: z.string(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await attachProductMediaUseCase({
        mediaId: parsedInput.mediaId,
        organizationId: ctx.organization.organizationId,
        productSlug: parsedInput.productSlug,
      })
  );

export const detachProductMediaAction = organizationAction
  .metadata({
    actionName: "product:product-media:detach",
  })
  .inputSchema(
    z.object({
      mediaId: z.uuid(),
      productSlug: z.string(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await detachProductMediaUseCase({
        mediaId: parsedInput.mediaId,
        organizationId: ctx.organization.organizationId,
        productSlug: parsedInput.productSlug,
      })
  );

export const updateFeaturedProductMediaAction = organizationAction
  .metadata({
    actionName: "product:product-media:featured",
  })
  .inputSchema(
    z.object({
      mediaId: z.uuid(),
      productSlug: z.string(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await setFeaturedProductMediaUseCase({
        mediaId: parsedInput.mediaId,
        organizationId: ctx.organization.organizationId,
        productSlug: parsedInput.productSlug,
      })
  );
