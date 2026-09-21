import { getActiveContext } from "@/lib/auth/get-active-context";
import { dedupe } from "flags/next";

export interface FlagEntities {
  organization?: {
    organizationId: string;
  };
  user?: {
    userId: string;
    email: string;
  };
}

export const identify = dedupe(async (): Promise<FlagEntities> => {
  const { user, organization } = await getActiveContext();

  if (!(user && organization)) {
    return {};
  }

  return {
    organization: organization && {
      organizationId: organization.organizationId,
    },
    user: user && {
      email: user.email,
      userId: user.userId,
    },
  };
});
