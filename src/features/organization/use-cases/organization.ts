import {
  deleteOrganizationClerk,
  syncOrganizationClerk,
} from "@/features/organization/data-access/organization";
import {
  toDeleteOrganizationClerk,
  toSyncOrganizationClerkDto,
} from "@/features/organization/dto/organization";
import { normalizeError } from "@/lib/error";
import type { DeletedObjectJSON, OrganizationJSON } from "@clerk/backend";

export async function syncOrganizationClerkUseCase({
  data,
}: {
  data: OrganizationJSON;
}) {
  try {
    const payload = toSyncOrganizationClerkDto({ data });

    return await syncOrganizationClerk({ payload });
  } catch (error) {
    throw normalizeError(error);
  }
}

export const deleteOrganizationClerkUseCase = async ({
  data,
}: {
  data: DeletedObjectJSON;
}) => {
  try {
    const { clerkOrganizationId } = toDeleteOrganizationClerk({ data });

    return await deleteOrganizationClerk({ clerkOrganizationId });
  } catch (error) {
    throw normalizeError(error);
  }
};
