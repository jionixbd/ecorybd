import { type DbClient, db } from "@/drizzle/db";
import { organizations } from "@/drizzle/schema/organization";
import type { UpsertOrganizationInput } from "@/features/organization/validations/organization";
import { eq } from "drizzle-orm";

export async function findOrganizationId({
  client = db,
  organizationId,
}: {
  client?: DbClient;
  organizationId: string;
}) {
  const [result] = await client
    .select()
    .from(organizations)
    .where(eq(organizations.organizationId, organizationId));

  return result;
}

export async function findOrganizationClerkId({
  client = db,
  clerkOrganizationId,
}: {
  client?: DbClient;
  clerkOrganizationId: string;
}) {
  const [result] = await client
    .select()
    .from(organizations)
    .where(eq(organizations.clerkOrganizationId, clerkOrganizationId));

  return result;
}

export async function findOrganizationSlug({
  client = db,
  slug,
}: {
  client?: DbClient;
  slug: string;
}) {
  const [result] = await client
    .select()
    .from(organizations)
    .where(eq(organizations.slug, slug));

  return result;
}

export async function syncOrganizationClerk({
  client = db,
  payload,
}: {
  client?: DbClient;
  payload: UpsertOrganizationInput;
}) {
  const [result] = await client
    .insert(organizations)
    .values(payload)
    .onConflictDoUpdate({
      set: payload,
      target: organizations.clerkOrganizationId,
    })
    .returning();

  return result;
}

export async function deleteOrganizationClerk({
  client = db,
  clerkOrganizationId,
}: {
  client?: DbClient;
  clerkOrganizationId: string;
}) {
  const [result] = await client
    .delete(organizations)
    .where(eq(organizations.clerkOrganizationId, clerkOrganizationId))
    .returning();

  return result;
}
