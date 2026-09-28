import { env } from "@/lib/env";

export function getStorefrontContext() {
  const organizationId = env.ECORYBD_ORGANIZATION_ID;

  if (!organizationId) {
    throw new Error("Storefront organization is not configured");
  }

  return { organizationId };
}