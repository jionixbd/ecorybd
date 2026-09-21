import { env } from "@/lib/env";

export const posthogEnabled =
  env.NEXT_PUBLIC_POSTHOG_ENABLED &&
  Boolean(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);
