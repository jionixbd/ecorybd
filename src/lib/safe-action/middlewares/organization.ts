import { requireActiveContext } from "@/lib/auth/required-active-context";
import { createMiddleware } from "next-safe-action";

export const organizationMiddleware = createMiddleware().define(
  async ({ next }) => {
    const context = await requireActiveContext();

    return next({
      ctx: {
        membership: context.membership,
        organization: context.organization,
        user: context.user,
      },
    });
  }
);
