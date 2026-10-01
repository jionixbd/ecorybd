"use client";

import { PostHogProvider } from "@/features/analytics/components/posthog-provider";
import { env } from "@/lib/env";
import { isGtmEnabled } from "@/lib/google/gtm-enabled";
import { GoogleTagManager } from "@next/third-parties/google";

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const gtmId = isGtmEnabled() ? env.NEXT_PUBLIC_GTM_ID : undefined;

  return (
    <PostHogProvider>
      {!!gtmId && <GoogleTagManager gtmId={gtmId} />}
      {/* <VercelAnalyticsProvider> */}
      {/* <GoogleAnalyticsProvider> */}
      {children}
      {/* </GoogleAnalyticsProvider> */}
      {/* </VercelAnalyticsProvider> */}
    </PostHogProvider>
  );
};
