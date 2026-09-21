import { env } from "@/lib/env";

export const sentryEnabled =
  Boolean(env.NEXT_PUBLIC_SENTRY_DSN) && env.NEXT_PUBLIC_SENTRY_ENABLED;
