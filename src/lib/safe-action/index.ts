import { AppError } from "@/lib/error";
import { actionClient } from "@/lib/safe-action/client";
import { authMiddleware } from "@/lib/safe-action/middlewares/auth";
import { organizationMiddleware } from "@/lib/safe-action/middlewares/organization";

export const publicAction = actionClient;

export const authAction = actionClient.use(authMiddleware);

export const organizationAction = actionClient.use(organizationMiddleware);

export const adminAction = organizationAction.use(async ({ next, ctx }) => {
  if (ctx.membership?.role !== "org:admin") {
    throw new AppError("Administrator access required", "FORBIDDEN");
  }

  return await next({
    ctx: {
      isAdmin: true,
    },
  });
});
