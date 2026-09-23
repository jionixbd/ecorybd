import {
  type RequiredActiveContext,
  getActiveContext,
} from "@/lib/auth/get-active-context";
import { ForbiddenError, UnauthorizedError } from "@/lib/error";
import { cache } from "react";

export const requireActiveContext = cache(
  async (): Promise<RequiredActiveContext> => {
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

    return context as RequiredActiveContext;
  }
);
