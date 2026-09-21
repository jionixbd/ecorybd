import type { UpsertOrganizationInput } from "@/features/organization/validations/organization";
import type { DeletedObjectJSON, OrganizationJSON } from "@clerk/backend";

export const toSyncOrganizationClerkDto = ({
  data,
}: {
  data: OrganizationJSON;
}): UpsertOrganizationInput => ({
  clerkOrganizationId: data.id,
  logo: data.image_url,
  name: data.name,
  slug: data.slug,
});

export const toDeleteOrganizationClerk = ({
  data,
}: {
  data: DeletedObjectJSON;
}) => ({
  clerkOrganizationId: data.id as string,
});
