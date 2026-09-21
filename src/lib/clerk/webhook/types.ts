import type {
  DeletedObjectJSON,
  OrganizationJSON,
  OrganizationMembershipJSON,
  UserJSON,
} from "@clerk/backend";

interface D<T> {
  data: T;
}

interface EventDataMap {
  "organization.created": D<OrganizationJSON>;
  "organization.deleted": D<DeletedObjectJSON>;
  "organization.updated": D<OrganizationJSON>;
  "organizationMembership.created": D<OrganizationMembershipJSON>;
  "organizationMembership.deleted": D<OrganizationMembershipJSON>;
  "organizationMembership.updated": D<OrganizationMembershipJSON>;
  "user.created": D<UserJSON>;
  "user.deleted": D<DeletedObjectJSON>;
  "user.updated": D<UserJSON>;
}

export type HandlerFn<T extends keyof EventDataMap> = (
  payload: EventDataMap[T]
  //   biome-ignore lint/suspicious/noExplicitAny: intended
) => Promise<any | Response>;

export type HandlerMap = {
  [K in keyof EventDataMap]: HandlerFn<K>;
};
