import type { Locale } from "next-intl";
import { createTranslator } from "next-intl";

type EmailNamespace = "newsletter-confirmation" | "newsletter-welcome";

export async function getEmailTranslator(
  locale: Locale,
  namespace: EmailNamespace
) {
  const messages = (await import(`./messages/${locale}.json`)).default;

  return createTranslator({ locale, messages, namespace });
}
