import { Button } from "@/components/ui/button";
import { generateHomeMetadata } from "@/lib/metadata/pages/home";
import { ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateHomeMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  const locale = await getLocale();
  return (
    <div className="grid h-svh w-full place-content-center place-items-center">
      <Image
        alt="logo"
        height={150}
        src={"/images/ecory-logo.png"}
        width={410}
      />

      <Button asChild variant={"link"}>
        <Link href={`/${locale}/sign-in`}>
          Signin
          <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
}
