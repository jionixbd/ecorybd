import { env } from "@/lib/env";
import { initializePostHog } from "@/lib/posthog/client";
import { sentryEnabled } from "@/lib/sentry-enabled";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dataCollection: {
    httpBodies: [],
    userInfo: false,
  },
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: sentryEnabled,
  integrations: [Sentry.replayIntegration()],
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 1,
});

initializePostHog();

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
