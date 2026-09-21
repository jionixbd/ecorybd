import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CreateOrganization } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function OrganizationCreatePage(
  _: PageProps<"/[locale]/organization/create">
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
        <CreateOrganization
          afterCreateOrganizationUrl={`/${locale}/workspace/:slug`}
        />
      </div>
    </div>
  );
}
