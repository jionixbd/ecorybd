import type { Membership } from "@/drizzle/schema/membership";
import { analyticsEvent } from "@/features/analytics/events/analytics-event";
import { trackEvent } from "@/features/analytics/lib/track-event";
import { posthogServer } from "@/lib/posthog/server";

export const trackOrganizationCreated = async ({
  userId,
  data,
}: {
  userId: string;
  data: Membership;
}) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: userId,
    event: analyticsEvent.organization.created,
    group: {
      key: data.organizationId,
      type: "organization",
    },
  });
};
