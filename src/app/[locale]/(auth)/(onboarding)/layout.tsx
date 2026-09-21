import { redirect } from "@/i18n/navigation";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { getLocale } from "next-intl/server";

// FIX: Error: Route "/[locale]/onboarding": Next.js encountered runtime data during prerendering. cause : redirect
export const instant = false;

export default async function OnboardingGroupLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const context = await getActiveContext();

  if (!context.user) {
    redirect({ href: "/sign-in", locale });
  }

  // if (context.organization) {
  //   redirect({
  //     href: {
  //       params: { organization: context.organization.slug },
  //       pathname: "/[organization]",
  //     },
  //     locale,
  //   });
  // }

  return <>{children}</>;
}
