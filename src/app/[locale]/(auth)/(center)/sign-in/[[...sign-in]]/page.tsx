import { Button } from "@/components/ui/button";
import { SignIn } from "@/features/auth/components/sign-in";
import { Link } from "@/i18n/navigation";
import { env } from "@/lib/env";
import { Undo2 } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export const instant = false;

export default async function SignInPage(_: PageProps<"/[locale]">) {
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
          <SignIn
            forceRedirectUrl={`/${locale}${env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL}`}
            path={`/${locale}${env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
          />
        </Suspense>
      </div>
    </div>
  );
}
