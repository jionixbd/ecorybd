import type { AnalyticsEvent } from "@/features/analytics/types/analytics-event";
import { posthogServer } from "@/lib/posthog/server";

interface TrackEventParams {
  distinctId: string;
  event: AnalyticsEvent;
  group?: {
    type: string;
    key: string;
    properties?: Record<string, unknown>;
  };
  identify?: Record<string, unknown>;
  properties?: Record<string, unknown>;
}

export async function trackEvent({
  event,
  distinctId,
  properties,
  identify,
  group,
}: TrackEventParams) {
  if (!posthogServer) {
    return;
  }

  try {
    if (identify) {
      posthogServer.identify({
        distinctId,
        properties: identify,
      });
    }

    // NOTE: `posthog.groupIdentify()` not in free plan.
    if (group) {
      posthogServer.groupIdentify({
        distinctId,
        groupKey: group.key,
        groupType: group.type,
        properties: group.properties,
      });
    }

    posthogServer.capture({
      distinctId,
      event,
      properties,
    });

    await posthogServer.flush();
  } catch (error) {
    console.error("Analytics tracking failed", {
      distinctId,
      error,
      event,
    });
  }
}
