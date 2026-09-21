import type { UpsertUserInput } from "@/features/user/validations/user";
import type { DeletedObjectJSON, UserJSON } from "@clerk/backend";

export const toSyncUserClerkDto = ({
  data,
}: {
  data: UserJSON;
}): UpsertUserInput => ({
  avatar: data.image_url,
  banned: data.banned,
  clerkUserId: data.id,
  email: data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  )?.email_address as string,
  firstName: data.first_name,
  lastName: data.last_name,
  locked: data.locked,
  username: data.username as string,
});

export const toDeleteUserClerk = ({ data }: { data: DeletedObjectJSON }) => ({
  clerkUserId: data.id as string,
});
