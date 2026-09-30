import { SidebarProvider } from "@/components/ui/sidebar";
import { getClerkLocalization } from "@/features/auth/lib/get-clerk-localization";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { getClerkUrl } from "@/lib/clerk/get-clerk-url";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export default async function AuthLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const localization = await getClerkLocalization(locale);
  const cookie = await cookies();
  const url = getClerkUrl(locale);

  const isSidebarOpen = cookie.get("sidebar:state")?.value === "true";
  return (
    <AuthProvider
      afterSignOutUrl={url.afterSignOutUrl}
      localization={localization}
      signInFallbackRedirectUrl={url.fallbackRedirectUrl}
      signInUrl={url.signInUrl}
      signUpFallbackRedirectUrl={url.fallbackRedirectUrl}
      signUpUrl={url.signUpUrl}
    >
      <SidebarProvider defaultOpen={isSidebarOpen}> {children}</SidebarProvider>
    </AuthProvider>
  );
}
