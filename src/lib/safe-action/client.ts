import { AppError } from "@/lib/error";
import type { AppServerError } from "@/lib/safe-action/error";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
      category: z.string().optional(),
    }),

  handleServerError(error) {
    if (error instanceof AppError && error.isOperational) {
      return {
        code: error.code,
        message: error.message,
      } satisfies AppServerError;
    }

    return {
      code: "INTERNAL_ERROR",
      message: "Something went wrong. Please try again.",
    } satisfies AppServerError;
  },
});
