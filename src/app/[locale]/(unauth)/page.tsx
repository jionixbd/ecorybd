import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { Container } from "@/components/web/pages/layout/container";
import { Section } from "@/components/web/pages/layout/section";
import { H1 } from "@/components/web/pages/layout/typography";
import { generateHomeMetadata } from "@/lib/metadata/pages/home";
import { Leaf } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateHomeMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  return (
    <div className="grid">
      <Section className="h-dvh bg-[#f8f7f1]" id="hero">
        <Container className="flex h-full w-full max-w-xl flex-col items-end justify-center">
          <H1 className="col flex items-center gap-4 text-center text-7xl! text-[#173c2d] md:text-9xl!">
            <Image
              alt="ecory"
              className="max-w-20 md:max-w-32"
              height={192}
              src={"/favicon/apple-touch-icon-192x192.png"}
              width={192}
            />
            ইকোরি
          </H1>
          <AsyncBoundary>
            <ProductList />
          </AsyncBoundary>
        </Container>
      </Section>
    </div>
  );
}

const ProductList = async () => {
  const locale = await getLocale();

  return (
    <div className="flex flex-col gap-2 self-end">
      <Link
        className="flex gap-2 font-hind text-[#173c2d] hover:underline"
        href={`/${locale}/methimix`}
      >
        মেথিমিক্স (Methimix)
        <Leaf className="size-5" />
      </Link>
      <Link
        className="flex gap-2 font-hind text-[#173c2d] hover:underline"
        href={`/${locale}/thankuan`}
      >
        থানকুয়ান (Thankuan)
        <Leaf className="size-5" />
      </Link>
      <Link
        className="flex gap-2 font-hind text-[#173c2d] hover:underline"
        href={`/${locale}/kostocare`}
      >
        কোষ্টকেয়ার (kostocare)
        <Leaf className="size-5" />
      </Link>
    </div>
  );
};
