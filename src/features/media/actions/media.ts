"use server";

import {
  deleteMediaUserCase,
  insertMediaUserCase,
} from "@/features/media/use-cases/media";
import { insertMediaSchema } from "@/features/media/validations/media";
import { organizationAction } from "@/lib/safe-action";
import z from "zod";

export const deleteMediaAction = organizationAction
  .metadata({
    actionName: "media:delete",
  })
  .inputSchema(
    z.object({
      mediaId: z.uuid(),
    })
  )
  .action(
    async ({ parsedInput, ctx }) =>
      await deleteMediaUserCase({
        mediaId: parsedInput.mediaId,
        organizationId: ctx.organization.organizationId,
      })
  );

export const createMediaAction = organizationAction
  .metadata({
    actionName: "media:create",
  })
  .inputSchema(insertMediaSchema)
  .action(
    async ({ parsedInput, ctx }) =>
      await insertMediaUserCase({
        input: parsedInput,
        organizationId: ctx.organization.organizationId,
        userId: ctx.user.userId,
      })
  );
