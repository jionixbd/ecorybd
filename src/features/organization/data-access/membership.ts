import { type DbClient, db } from "@/drizzle/db";
import { memberships } from "@/drizzle/schema/membership";
import type { UpsertMembershipInput } from "@/features/organization/validations/membership";
import { and, eq } from "drizzle-orm";

export async function findMembershipId({
  client = db,
  membershipId,
}: {
  client?: DbClient;
  membershipId: string;
}) {
  const [result] = await client
    .select()
    .from(memberships)
    .where(eq(memberships.membershipId, membershipId));

  return result;
}

export async function findMembershipClerkId({
  client = db,
  clerkMembershipId,
}: {
  client?: DbClient;
  clerkMembershipId: string;
}) {
  const [result] = await client
    .select()
    .from(memberships)
    .where(eq(memberships.clerkMembershipId, clerkMembershipId));

  return result;
}

export async function findOrganizationMembershipId({
  client = db,
  organizationId,
  userId,
}: {
  client?: DbClient;
  organizationId: string;
  userId: string;
}) {
  const [result] = await client
    .select()
    .from(memberships)
    .where(
      and(
        eq(memberships.userId, userId),
        eq(memberships.organizationId, organizationId)
      )
    );

  return result;
}

export async function syncMembershipClerk({
  client = db,
  userId,
  organizationId,
  payload,
}: {
  client?: DbClient;
  organizationId: string;
  userId: string;
  payload: UpsertMembershipInput;
}) {
  const [result] = await client
    .insert(memberships)
    .values({
      organizationId,
      userId,
      ...payload,
    })
    .onConflictDoUpdate({
      set: {
        organizationId,
        userId,
        ...payload,
      },
      target: [memberships.organizationId, memberships.userId],
    })
    .returning();

  return result;
}

export async function deleteMembershipClerk({
  client = db,
  clerkMembershipId,
}: {
  client?: DbClient;
  clerkMembershipId: string;
}) {
  const [result] = await client
    .delete(memberships)
    .where(eq(memberships.clerkMembershipId, clerkMembershipId));

  return result;
}
