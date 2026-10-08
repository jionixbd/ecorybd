import { Text } from "@/components/web/pages/layout/typography";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import { io } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
export const navigation = {
  company: [
    {
      href: "/terms-of-service",
      id: 1,
      title: "Team of Service",
    },
    {
      href: "/privacy-policy",
      id: 2,
      title: "Privacy Policy",
    },
    {
      href: "/license",
      id: 3,
      title: "License",
    },
  ],
  products: [
    {
      href: "/methimix",
      id: 1,
      title: "মেথিমিক্স",
    },
    {
      href: "/thankuan",
      id: 2,
      title: "থানকুয়ান",
    },
    {
      href: "/kostocare",
      id: 3,
      title: "কোষ্টকেয়ার",
    },
  ],
};

const FooterMenuDeveloper = () => (
  <div className="col-span-1 flex flex-col items-start justify-start gap-4 sm:col-span-1 md:items-end">
    <h3 className="font-base font-hind text-base text-zinc-50">Developer</h3>

    <div className="flex flex-col items-start justify-start gap-3 md:items-end">
      <Link
        className="flex items-center gap-1 font-hind font-light text-xs text-zinc-50 hover:underline"
        href={"https://www.sizar.dev"}
        target="_blank"
      >
        sizar.dev
        <ArrowUpRight className="size-3" />
      </Link>
    </div>
  </div>
);

const FooterMenuCompany = (_: { locale: Locale }) => {
  const { company } = navigation;

  return (
    <div className="col-span-1 flex flex-col items-start justify-start gap-4 sm:col-span-1 md:items-end">
      <h3 className="font-base font-hind text-base text-zinc-50">Company</h3>

      <div className="flex flex-col items-start justify-start gap-3 md:items-end">
        {company.map((item) => (
          <span
            className="pointer-events-none font-hind font-light text-xs text-zinc-50 hover:underline"
            // href={`/${locale}${item.href}`}
            key={item.id}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};

const FooterMenuProducts = ({ locale }: { locale: Locale }) => {
  const { products } = navigation;

  return (
    <div className="col-span-1 flex flex-col items-start justify-start gap-4 sm:col-span-1 md:items-end">
      <h3 className="font-base font-hind text-base text-zinc-50">Products</h3>

      <div className="flex flex-col items-start justify-start gap-3 md:items-end">
        {products.map((item) => (
          <Link
            className="font-hind font-light text-xs text-zinc-50 hover:underline"
            href={`/${locale}${item.href}`}
            key={item.id}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Footer = async () => {
  const locale = await getLocale();

  return (
    <footer className="mx-auto flex w-full items-center justify-center bg-web-inverse px-6 py-8">
      <div className="grid max-w-5xl grid-cols-2 gap-10">
        <div className="col-span-2 max-w-sm sm:col-span-1">
          <Image
            alt="Ecory"
            className="size-20 text-zinc-50"
            height={80}
            src="/favicon/apple-touch-icon-192x192.png"
            width={80}
          />
          <div className="mt-4 flex flex-col gap-2 font-hind">
            <Text className="font-hind font-light text-sm">
              স্বাস্থ্যকর জীবনের পথে প্রতিটি পদক্ষেপে আমরা দিচ্ছি প্রকৃতির খাঁটি উপহার—মধু,
              মেথিমিক্স (Methimix) সহ ন্যাচারাল ফুডের সমৃদ্ধ সংগ্রহ। আপনার পরিবারের সুস্থতা ও
              পুষ্টির নির্ভরযোগ্য সঙ্গী আমরা
            </Text>

            <Suspense fallback={null}>
              <Text className="font-hind font-light text-sm">
                Copyright © <CurrentYear /> Ecory. All rights reserved.
              </Text>
            </Suspense>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-10 sm:col-span-1">
          <FooterMenuCompany locale={locale} />
          <FooterMenuProducts locale={locale} />
          <FooterMenuDeveloper />
        </div>
      </div>
    </footer>
  );
};
async function CurrentYear() {
  await io();
  return new Date().getFullYear();
}
