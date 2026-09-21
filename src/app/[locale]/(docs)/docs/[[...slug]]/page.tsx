import { getMDXComponents } from "@/components/docs/mdx";
import { source } from "@/lib/fumadocs/source";
import { DocsBody, DocsPage } from "fumadocs-ui/layouts/docs/page";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return source.generateParams("slug", "locale");
}

export default async function DocPage(
  props: PageProps<"/[locale]/docs/[[...slug]]">
) {
  const locale = await getLocale();
  const { slug = [] } = await props.params;

  const page = source.getPage(slug, locale);

  if (!page) {
    notFound();
  }
  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
