import type { User } from "@/drizzle/schema/user";
import { analyticsEvent } from "@/features/analytics/events/analytics-event";
import { trackEvent } from "@/features/analytics/lib/track-event";
import { posthogServer } from "@/lib/posthog/server";

export const trackUserCreated = async ({ data }: { data: User }) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: data.userId,
    event: analyticsEvent.user.created,
    identify: data,
  });
};

export const trackUserUpdated = async ({ data }: { data: User }) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: data.userId,
    event: analyticsEvent.user.updated,
    identify: data,
  });
};

export const trackUserDeleted = async ({ data }: { data: User }) => {
  if (!posthogServer) {
    return;
  }
  await trackEvent({
    distinctId: data.userId,
    event: analyticsEvent.user.deleted,
    identify: {
      deleted: true,
    },
  });
};

export const trackUserSynced = async ({ data }: { data: User }) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: data.userId,
    event: analyticsEvent.user.synced,
    identify: data,
  });
};
