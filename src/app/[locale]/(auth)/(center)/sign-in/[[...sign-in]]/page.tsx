import { Button } from "@/components/ui/button";
import { SignIn } from "@/features/auth/components/sign-in";
import { Link } from "@/i18n/navigation";
import { getClerkUrl } from "@/lib/clerk/get-clerk-url";
import { Undo2 } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export const instant = false;

export default async function SignInPage(_: PageProps<"/[locale]">) {
  const locale = await getLocale();
  const url = getClerkUrl(locale);

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
          <SignIn
            forceRedirectUrl={url.fallbackRedirectUrl}
            path={url.signInUrl}
          />
        </Suspense>
      </div>
    </div>
  );
}
