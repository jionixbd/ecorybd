import { type DbClient, db } from "@/drizzle/db";
import { newsletterSubscribers } from "@/drizzle/schema/newsletter-subscriber";
import type {
  InsertSubscriberInput,
  UpdateSubscriberInput,
} from "@/features/newsletter/validations/subscription";
import { eq } from "drizzle-orm";

export async function findSubscriberId({
  client = db,
  subscriberId,
}: {
  client: DbClient;
  subscriberId: string;
}) {
  const [result] = await client
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.subscriberId, subscriberId));

  return result;
}

export async function findSubscriberResendId({
  client = db,
  resendContactId,
}: {
  client: DbClient;
  resendContactId: string;
}) {
  const [result] = await client
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.resendContactId, resendContactId));

  return result;
}

export async function findSubscriberEmail({
  client = db,
  email,
}: {
  client: DbClient;
  email: string;
}) {
  const [result] = await client
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email));

  return result;
}

export async function insertSubscriber({
  client = db,
  values,
}: {
  client: DbClient;
  values: InsertSubscriberInput;
}) {
  const [result] = await client
    .insert(newsletterSubscribers)
    .values(values)
    .returning();

  return result;
}

export async function updateSubscriber({
  client = db,
  subscriberId,
  values,
}: {
  client: DbClient;
  subscriberId: string;
  values: UpdateSubscriberInput;
}) {
  const [result] = await client
    .update(newsletterSubscribers)
    .set(values)
    .where(eq(newsletterSubscribers.subscriberId, subscriberId))
    .returning();

  return result;
}

export async function setPendingSubscriber({
  client = db,
  subscriberId,
}: {
  client: DbClient;
  subscriberId: string;
}) {
  const [result] = await client
    .update(newsletterSubscribers)
    .set({
      status: "pending",
    })
    .where(eq(newsletterSubscribers.subscriberId, subscriberId))
    .returning();

  return result;
}

export async function setConfirmSubscriber({
  client = db,
  subscriberId,
}: {
  client: DbClient;
  subscriberId: string;
}) {
  const [result] = await client
    .update(newsletterSubscribers)
    .set({
      status: "subscribed",
      subscribedAt: new Date(),
    })
    .where(eq(newsletterSubscribers.subscriberId, subscriberId))
    .returning();

  return result;
}

export async function setUnsubscribeSubscriber({
  client = db,
  subscriberId,
}: {
  client?: DbClient;
  subscriberId: string;
}) {
  const [result] = await client
    .update(newsletterSubscribers)
    .set({
      status: "unsubscribed",
      unsubscribedAt: new Date(),
    })
    .where(eq(newsletterSubscribers.subscriberId, subscriberId))
    .returning();

  return result;
}
