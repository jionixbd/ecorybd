import { source } from "@/lib/fumadocs/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { getLocale } from "next-intl/server";

export default async function DocLayout({
  children,
}: LayoutProps<"/[locale]/docs">) {
  const locale = await getLocale();

  return (
    <DocsLayout
      sidebar={{
        collapsible: false,
        prefetch: false,
      }}
      tree={source.getPageTree(locale)}
    >
      {children}
    </DocsLayout>
  );
}
