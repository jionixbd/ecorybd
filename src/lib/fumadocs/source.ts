import { docsI18n } from "@/lib/fumadocs/docs-i18n";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "fumadocs-mdx:collections/server";

export const source = loader({
  baseUrl: "/docs",
  i18n: docsI18n,
  plugins: [lucideIconsPlugin()],
  source: docs.toFumadocsSource(),
  url(slugs, locale) {
    return locale
      ? `/${locale}/docs/${slugs.join("/")}`
      : `/docs/${slugs.join("/")}`;
  },
});
