import { SidebarProvider } from "@/components/ui/sidebar";
import { getClerkLocalization } from "@/features/auth/lib/get-clerk-localization";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { env } from "@/lib/env";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export default async function AuthLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const localization = await getClerkLocalization(locale);
  const cookie = await cookies();

  const isSidebarOpen = cookie.get("sidebar:state")?.value === "true";
  return (
    <AuthProvider
      afterSignOutUrl={`${env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL}${locale}`}
      localization={localization}
      signInFallbackRedirectUrl={`/${locale}${env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL}`}
      signInUrl={`/${locale}${env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
      signUpFallbackRedirectUrl={`/${locale}${env.NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL}`}
      signUpUrl={`/${locale}${env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
    >
      <SidebarProvider defaultOpen={isSidebarOpen}> {children}</SidebarProvider>
    </AuthProvider>
  );
}
