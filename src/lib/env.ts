import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_OUT_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_ENABLED: z
      .enum(["true", "false"])
      .transform((v) => v === "true"),
    NEXT_PUBLIC_POSTHOG_HOST: z.url().optional(),
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: z.string().min(1).optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).optional(),
    NEXT_PUBLIC_SENTRY_ENABLED: z
      .enum(["true", "false"])
      .transform((v) => v === "true"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_OUT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_POSTHOG_ENABLED: process.env.NEXT_PUBLIC_POSTHOG_ENABLED,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENABLED: process.env.NEXT_PUBLIC_SENTRY_ENABLED,
  },
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1).optional(),
    DATABASE_URL: z.string().min(1),
    NEWSLETTER_SUBSCRIPTION_TOKEN_SECRET: z.string().min(1).optional(),
    PGDATABASE: z.string().min(1).optional(),
    PGHOST: z.string().min(1).optional(),
    PGPASSWORD: z.string().min(1).optional(),
    PGUSER: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    RESEND_EMAIL_FROM: z.string().min(1).optional(),
    RESEND_SEGMENT_ID: z.string().min(1).optional(),
    RESEND_WEBHOOK_SECRET: z.string().min(1).optional(),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    SENTRY_HOST: z.string().min(1).optional(),
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
    SENTRY_PROJECT_ID: z.string().min(1).optional(),
  },
});
