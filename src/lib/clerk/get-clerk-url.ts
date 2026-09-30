import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";
import type { Locale } from "next-intl";

function localizePath(locale: Locale, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return `${prefix}${normalizedPath}`;
}

export function getClerkUrl(locale: Locale) {
  return {
    afterSignOutUrl: localizePath(locale, env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL),
    fallbackRedirectUrl: localizePath(
      locale,
      env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL
    ),
    signInUrl: localizePath(locale, env.NEXT_PUBLIC_CLERK_SIGN_IN_URL),
    signUpUrl: localizePath(locale, env.NEXT_PUBLIC_CLERK_SIGN_UP_URL),
  };
}

export function getOrganizationUrl(locale: Locale): string {
  return localizePath(locale, "/workspace/:slug");
}
