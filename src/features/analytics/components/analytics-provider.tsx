"use client";

import { PostHogProvider } from "@/features/analytics/components/posthog-provider";

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PostHogProvider>
      {/* <VercelAnalyticsProvider> */}
      {/* <GoogleAnalyticsProvider> */}
      {children}
      {/* </GoogleAnalyticsProvider> */}
      {/* </VercelAnalyticsProvider> */}
    </PostHogProvider>
  );
};
