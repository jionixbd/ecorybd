import { env } from "@/lib/env";
import { posthogEnabled } from "@/lib/posthog/enabled";
import { PostHog } from "posthog-node";

export const posthogServer =
  posthogEnabled && env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
    ? new PostHog(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
        flushAt: 1,
        flushInterval: 0,
        host: env.NEXT_PUBLIC_POSTHOG_HOST,
      })
    : null;
