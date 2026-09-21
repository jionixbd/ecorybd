import {
  deleteMembershipClerkUseCase,
  syncMembershipClerkUseCase,
} from "@/features/organization/use-cases/membership";
import {
  deleteOrganizationClerkUseCase,
  syncOrganizationClerkUseCase,
} from "@/features/organization/use-cases/organization";
import {
  deleteUserClerkUseCase,
  syncUserClerkUseCase,
} from "@/features/user/use-cases/user";
import type { HandlerMap } from "@/lib/clerk/webhook/types";
import { normalizeError } from "@/lib/error";
import type { WebhookEvent } from "@clerk/backend";

const handlerMap: HandlerMap = {
  "organization.created": syncOrganizationClerkUseCase,
  "organization.deleted": deleteOrganizationClerkUseCase,
  "organization.updated": syncOrganizationClerkUseCase,
  "organizationMembership.created": syncMembershipClerkUseCase,
  "organizationMembership.deleted": deleteMembershipClerkUseCase,
  "organizationMembership.updated": syncMembershipClerkUseCase,
  "user.created": syncUserClerkUseCase,
  "user.deleted": deleteUserClerkUseCase,
  "user.updated": syncUserClerkUseCase,
};

export async function handleEvent(event: WebhookEvent) {
  const handler = handlerMap[event.type as keyof typeof handlerMap];

  if (!handler) {
    return;
  }

  if (handler) {
    try {
      const { data } = event;

      //   biome-ignore lint/suspicious/noExplicitAny: intended
      await handler({ data: data as any as never });
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
