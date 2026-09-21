import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { generateHomeMetadata } from "@/lib/metadata/pages/home";
import { resolvePublicUrl } from "@/lib/resolve-public-url";
import { ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateHomeMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  return (
    <div className="grid h-svh w-full place-content-center place-items-center">
      <Image
        alt="logo"
        height={150}
        src={resolvePublicUrl("/public/images/ecory-logo.png")}
        width={410}
      />

      <Button asChild variant={"link"}>
        <Link href={"/onboarding"}>
          Onboarding
          <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
}
