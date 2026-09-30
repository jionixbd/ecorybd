import { Button } from "@/components/ui/button";
import { getOrganizationUrl } from "@/lib/clerk/get-clerk-url";
import { OrganizationList } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

export const instant = false;

export default async function OnboardingPage(
  _: PageProps<"/[locale]/create-organization/[[...create-organization]]">
) {
  const locale = await getLocale();
  const organizationUrl = getOrganizationUrl(locale);

  return (
    <div className="flex h-full w-full flex-col items-center gap-10">
      <div className="w-full p-2">
        <Button asChild size={"icon"} variant="ghost">
          <Link href="/">
            <Undo2 className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="container grid place-content-center items-center justify-self-center">
        <Suspense fallback={null}>
          <OrganizationList
            afterCreateOrganizationUrl={organizationUrl}
            afterSelectOrganizationUrl={organizationUrl}
            hidePersonal
          />
        </Suspense>
      </div>
    </div>
  );
}
