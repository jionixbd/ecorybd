import { db } from "@/drizzle/db";
import type { Membership } from "@/drizzle/schema/membership";
import type { Organization } from "@/drizzle/schema/organization";
import type { User } from "@/drizzle/schema/user";
import { findOrganizationMembershipId } from "@/features/organization/data-access/membership";
import { findOrganizationClerkId } from "@/features/organization/data-access/organization";
import { findUserClerkId } from "@/features/user/data-access/user";
import { normalizeError } from "@/lib/error";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export interface ActiveContext {
  membership: Membership | null;
  organization: Organization | null;
  user: User | null;
}

export interface RequiredActiveContext {
  membership: Membership;
  organization: Organization;
  user: User;
}

export const getActiveContext = cache(async (): Promise<ActiveContext> => {
  try {
    const { userId: clerkUserId, orgId: clerkOrganizationId } = await auth();

    if (!clerkUserId) {
      return {
        membership: null,
        organization: null,
        user: null,
      };
    }

    const context = await db.transaction(async (trx) => {
      const user = await findUserClerkId({ clerkUserId, client: trx });

      if (!user) {
        return {
          membership: null,
          organization: null,
          user: null,
        };
      }

      if (!clerkOrganizationId) {
        return {
          membership: null,
          organization: null,
          user,
        };
      }

      const organization = await findOrganizationClerkId({
        clerkOrganizationId,
        client: trx,
      });

      if (!organization) {
        return {
          membership: null,
          organization: null,
          user,
        };
      }

      const membership = await findOrganizationMembershipId({
        client: trx,
        organizationId: organization.organizationId,
        userId: user.userId,
      });

      if (!membership) {
        return {
          membership: null,
          organization,
          user,
        };
      }

      return { membership, organization, user };
    });

    return context;
  } catch (error) {
    throw normalizeError(error);
  }
});
