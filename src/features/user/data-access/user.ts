import { type DbClient, db } from "@/drizzle/db";
import { users } from "@/drizzle/schema/user";
import type { UpsertUserInput } from "@/features/user/validations/user";
import { eq } from "drizzle-orm";

export async function findUserId({
  client = db,
  userId,
}: {
  client?: DbClient;
  userId: string;
}) {
  const [result] = await client
    .select()
    .from(users)
    .where(eq(users.userId, userId));

  return result;
}

export async function findUserClerkId({
  client = db,
  clerkUserId,
}: {
  client?: DbClient;
  clerkUserId: string;
}) {
  const [result] = await client
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId));

  return result;
}

export async function findUserUsername({
  client = db,
  username,
}: {
  client?: DbClient;
  username: string;
}) {
  const [result] = await client
    .select()
    .from(users)
    .where(eq(users.username, username));

  return result;
}

export async function syncUserClerk({
  client = db,
  payload,
}: {
  client?: DbClient;
  payload: UpsertUserInput;
}) {
  const [result] = await client
    .insert(users)
    .values(payload)
    .onConflictDoUpdate({
      set: payload,
      target: users.clerkUserId,
    })
    .returning();

  return result;
}

export async function deleteUserClerk({
  client = db,
  clerkUserId,
}: {
  client?: DbClient;
  clerkUserId: string;
}) {
  const [result] = await client
    .delete(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .returning();

  return result;
}
