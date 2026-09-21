import type { Organization } from "@/drizzle/schema/organization";
import { analyticsEvent } from "@/features/analytics/events/analytics-event";
import { trackEvent } from "@/features/analytics/lib/track-event";
import { posthogServer } from "@/lib/posthog/server";

export const trackOrganizationCreated = async ({
  userId,
  data,
}: {
  userId: string;
  data: Organization;
}) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: userId,
    event: analyticsEvent.organization.created,
    group: {
      key: data.organizationId,
      properties: data,
      type: "organization",
    },
  });
};

export const trackOrganizationUpdated = async ({
  userId,
  data,
}: {
  userId: string;
  data: Organization;
}) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: userId,
    event: analyticsEvent.organization.updated,
    group: {
      key: data.organizationId,
      properties: data,
      type: "organization",
    },
  });
};

export const trackOrganizationSynced = async ({
  userId,
  data,
}: {
  userId: string;
  data: Organization;
}) => {
  if (!posthogServer) {
    return;
  }

  await trackEvent({
    distinctId: userId,
    event: analyticsEvent.organization.synced,
    group: {
      key: data.organizationId,
      properties: data,
      type: "organization",
    },
  });
};
