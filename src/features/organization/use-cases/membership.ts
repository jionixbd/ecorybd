import { db, type Transaction } from "@/drizzle/db";
import {
  deleteMembershipClerk,
  syncMembershipClerk,
} from "@/features/organization/data-access/membership";
import { findOrganizationClerkId } from "@/features/organization/data-access/organization";
import {
  toDeleteMembershipClerkDto,
  toParseMembershipClerkDto,
  toSyncMembershipClerkDto,
} from "@/features/organization/dto/membership";
import { findUserClerkId } from "@/features/user/data-access/user";
import { InternalError, NotFoundError, normalizeError } from "@/lib/error";
import type { OrganizationMembershipJSON } from "@clerk/backend";

export async function syncMembershipClerkUseCase({
  data,
}: {
  data: OrganizationMembershipJSON;
}) {
  try {
    const { clerkOrganizationId, clerkUserId } = toParseMembershipClerkDto({
      data,
    });

    if (!clerkUserId) {
      throw new NotFoundError("Membership event has no clerk user id.");
    }

    if (!clerkOrganizationId) {
      throw new NotFoundError(
        "Membership event has no clerk organization  id."
      );
    }

    const payload = toSyncMembershipClerkDto({ data });

    const result = await db.transaction(async (trx: Transaction) => {
      const user = await findUserClerkId({ clerkUserId, client: trx });

      if (!user) {
        throw new NotFoundError(
          `User ${clerkUserId} has not been synchronized.`
        );
      }

      const organization = await findOrganizationClerkId({
        clerkOrganizationId,
        client: trx,
      });

      if (!organization) {
        throw new NotFoundError(
          `Organization ${clerkOrganizationId} has not been synchronized.`
        );
      }

      const membership = await syncMembershipClerk({
        client: trx,
        organizationId: organization.organizationId,
        payload,
        userId: user.userId,
      });

      if (!membership) {
        throw new InternalError("Sync membership failed");
      }

      return membership;
    });

    return result;
  } catch (error) {
    throw normalizeError(error);
  }
}

export const deleteMembershipClerkUseCase = async ({
  data,
}: {
  data: OrganizationMembershipJSON;
}) => {
  try {
    const { clerkMembershipId } = toDeleteMembershipClerkDto({ data });

    return await deleteMembershipClerk({ clerkMembershipId });
  } catch (error) {
    throw normalizeError(error);
  }
};
