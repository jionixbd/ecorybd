import {
  generateAlternateLanguages,
  generateMetadata,
} from "@/lib/metadata/generators";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateHomeMetadata(locale: Locale) {
  const t = await getTranslations("metadata.pages.home");

  return await generateMetadata(
    {
      alternateLanguages: generateAlternateLanguages("/"),
      description: t("description"),
      title: t("title"),
    },
    locale,
    "/"
  );
}
