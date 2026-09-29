import { getActiveContext } from "@/lib/auth/get-active-context";
import { env } from "@/lib/env";
import { getLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

export async function requireOrganization({
  organization,
}: {
  organization: string;
}) {
  const locale = await getLocale();
  const context = await getActiveContext();

  if (!context.user) {
    redirect(`/${locale}/${env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`);
  }

  if (!context.organization) {
    redirect(`/${locale}/${env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL}`);
  }

  if (context.organization?.slug !== organization) {
    notFound();
  }

  return context;
}
