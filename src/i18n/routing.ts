import type { Locale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
  localePrefix: "as-needed",
  locales: ["en", "fr"],
  pathnames: {
    "/": "/",
    "/kostocare": "/kostocare",
    "/methimix": "/methimix",
    "/onboarding": "/onboarding",
    "/organization/create": "/organization/create",
    "/sign-in": "/sign-in",
    "/sign-up": "/sign-up",
    "/thankuan": "/thankuan",
    "/workspace/[organization]": "/workspace/[organization]",
    "/workspace/[organization]/library": "/workspace/[organization]/library",
    "/workspace/[organization]/orders": "/workspace/[organization]/orders",
    "/workspace/[organization]/orders/[order]":
      "/workspace/[organization]/orders/[order]",
    "/workspace/[organization]/products": "/workspace/[organization]/products",
    "/workspace/[organization]/products/[product]":
      "/workspace/[organization]/products/[product]",
    "/workspace/[organization]/products/create":
      "/workspace/[organization]/products/create",
  },
});

export const defaultLocale = routing.defaultLocale as Locale;
