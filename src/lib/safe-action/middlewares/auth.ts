import { getActiveContext } from "@/lib/auth/get-active-context";
import { AppError } from "@/lib/error";
import { createMiddleware } from "next-safe-action";

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const context = await getActiveContext();

  if (!context.user) {
    throw new AppError("Authentication required", "UNAUTHORIZED");
  }

  return next({
    ctx: {
      user: context.user,
    },
  });
});
