import type { analyticsEvent } from "@/features/analytics/events/analytics-event";

type AnalyticsEventGroup = typeof analyticsEvent;

export type AnalyticsEvent = {
  [K in keyof AnalyticsEventGroup]: AnalyticsEventGroup[K][keyof AnalyticsEventGroup[K]];
}[keyof AnalyticsEventGroup];
