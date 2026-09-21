import {
  type ActiveContext,
  getActiveContext,
} from "@/lib/auth/get-active-context";
import { ForbiddenError, UnauthorizedError } from "@/lib/error";
import { cache } from "react";

export const requireActiveContext = cache(async (): Promise<ActiveContext> => {
  const context = await getActiveContext();

  if (!context.user) {
    throw new UnauthorizedError();
  }

  if (!context.organization) {
    throw new UnauthorizedError();
  }

  if (!context.membership) {
    throw new ForbiddenError();
  }

  return context;
});
