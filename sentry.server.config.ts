import { env } from "@/lib/env";
import { sentryEnabled } from "@/lib/sentry-enabled";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dataCollection: {
    httpBodies: [],
    userInfo: false,
  },
  debug: false,
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: sentryEnabled,
  tracesSampleRate: 1,
});
