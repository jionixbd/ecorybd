import type { Locale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
  localePrefix: "always",
  locales: ["en", "fr"],
  pathnames: {
    "/": "/",
    "/onboarding": "/onboarding",
    "/organization/create": "/organization/create",
    "/sign-in": "/sign-in",
    "/sign-up": "/sign-up",
    "/workspace/[organization]": "/workspace/[organization]",
  },
});

export const defaultLocale = routing.defaultLocale as Locale;
