import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locale as getRootLocale } from "next/root-params";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await getRootLocale();

    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  const { default: messages } = await import(`../messages/${locale}/index`);

  return { locale, messages };
});
