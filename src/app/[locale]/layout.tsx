import { ThemeProvider } from "@/components/application/theme/theme-provider";
import { AnalyticsProvider } from "@/features/analytics/components/analytics-provider";
import { routing } from "@/i18n/routing";
import { geistMono, geistSans } from "@/lib/fonts";
import { getBaseUrl } from "@/lib/get-base-url";
import { DEFAULT_METADATA } from "@/lib/metadata/constants";
import { generateAlternateLanguages } from "@/lib/metadata/generators";
import { ReactQueryProvider } from "@/lib/tanstack/react-query-provider";
import "@/styles/tailwind.css";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  alternates: {
    canonical: getBaseUrl(),
    languages: generateAlternateLanguages("/"),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
            enableSystem
          >
            <NuqsAdapter>
              <AnalyticsProvider>
                <NextIntlClientProvider>
                  {children}
                  {/* FIX: Failed to proxy http://127.0.0.1:25004/events?token= Error: socket hang up at ignore-listed frames {code: 'ECONNRESET'} */}
                  {shouldInjectToolbar && <VercelToolbar />}
                </NextIntlClientProvider>
              </AnalyticsProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
