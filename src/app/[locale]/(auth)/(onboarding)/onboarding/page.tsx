import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { OrganizationList } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export const instant = false;

export default async function OnboardingPage(
  _: PageProps<"/[locale]/onboarding">
) {
  const locale = await getLocale();

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
            afterCreateOrganizationUrl={`/${locale}/workspace/:slug`}
            afterSelectOrganizationUrl={`/${locale}/workspace/:slug`}
            hidePersonal
          />
        </Suspense>
      </div>
    </div>
  );
}
