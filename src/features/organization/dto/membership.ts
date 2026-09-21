import type { UpsertMembershipInput } from "@/features/organization/validations/membership";
import type { OrganizationMembershipJSON } from "@clerk/backend";

export const toParseMembershipClerkDto = ({
  data,
}: {
  data: OrganizationMembershipJSON;
}) => ({
  clerkOrganizationId: data.organization.id,
  clerkUserId: data.public_user_data.user_id,
});

export const toSyncMembershipClerkDto = ({
  data,
}: {
  data: OrganizationMembershipJSON;
}): UpsertMembershipInput => ({
  clerkMembershipId: data.id,
  role: data.role,
});

export const toDeleteMembershipClerkDto = ({
  data,
}: {
  data: OrganizationMembershipJSON;
}) => ({
  clerkMembershipId: data.id as string,
});
