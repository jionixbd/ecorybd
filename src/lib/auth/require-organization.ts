import { redirect } from "@/i18n/navigation";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function requireOrganization({
  organization,
}: {
  organization: string;
}) {
  const locale = await getLocale();
  const context = await getActiveContext();

  if (!context.user) {
    redirect({
      href: "/sign-in",
      locale,
    });
  }

  if (!context.organization) {
    redirect({
      href: "/onboarding",
      locale,
    });
  }

  if (context.organization?.slug !== organization) {
    notFound();
  }

  return context;
}
