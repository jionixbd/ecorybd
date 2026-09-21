import {
  deleteUserClerk,
  syncUserClerk,
} from "@/features/user/data-access/user";
import {
  toDeleteUserClerk,
  toSyncUserClerkDto,
} from "@/features/user/dto/user";
import { normalizeError } from "@/lib/error";
import type { DeletedObjectJSON, UserJSON } from "@clerk/backend";

export async function syncUserClerkUseCase({ data }: { data: UserJSON }) {
  try {
    const payload = toSyncUserClerkDto({ data });

    return await syncUserClerk({ payload });
  } catch (error) {
    throw normalizeError(error);
  }
}

export const deleteUserClerkUseCase = async ({
  data,
}: {
  data: DeletedObjectJSON;
}) => {
  try {
    const { clerkUserId } = toDeleteUserClerk({ data });

    return await deleteUserClerk({ clerkUserId });
  } catch (error) {
    throw normalizeError(error);
  }
};
