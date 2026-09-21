import { parseResendError } from "@/lib/error/resend-error";
import { resend } from "@/lib/resend/client";

export async function getContactId({ contactId }: { contactId: string }) {
  const { data, error } = await resend.contacts.get({
    id: contactId,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function getContactEmail({ email }: { email: string }) {
  const { data, error } = await resend.contacts.get({
    email,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function createContact({
  email,
  firstName,
  lastName,
  unsubscribed,
  segmentIds,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: boolean;
  segmentIds: string[];
}) {
  const { data, error } = await resend.contacts.create({
    email,
    firstName,
    lastName,
    segments: segmentIds.map((id) => ({ id })),
    unsubscribed,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function updateContactId({
  contactId,
  values,
}: {
  contactId: string;
  values: {
    firstName?: string;
    lastName?: string;
    unsubscribed?: boolean;
  };
}) {
  const { data, error } = await resend.contacts.update({
    id: contactId,
    ...values,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function updateContactEmail({
  email,
  values,
}: {
  email: string;
  values: {
    firstName?: string;
    lastName?: string;
    unsubscribed?: boolean;
  };
}) {
  const { data, error } = await resend.contacts.update({
    email,
    ...values,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function deleteContactId({ contactId }: { contactId: string }) {
  const { data, error } = await resend.contacts.remove({
    id: contactId,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function addContactSegment({
  contactId,
  segmentId,
}: {
  contactId: string;
  segmentId: string;
}) {
  const { data, error } = await resend.contacts.segments.add({
    contactId,
    segmentId,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}

export async function deleteContactSegment({
  contactId,
  segmentId,
}: {
  contactId: string;
  segmentId: string;
}) {
  const { data, error } = await resend.contacts.segments.remove({
    contactId,
    segmentId,
  });

  if (error) {
    throw parseResendError(error);
  }

  return data;
}
