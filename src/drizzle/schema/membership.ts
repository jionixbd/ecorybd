import { organizations } from "@/drizzle/schema/organization";
import { users } from "@/drizzle/schema/user";
import { snakeCase, unique, uuid, varchar } from "drizzle-orm/pg-core";

export const memberships = snakeCase.table(
  "memberships",
  {
    clerkMembershipId: varchar({ length: 64 })
      .notNull()
      .unique("unq_memberships_clerk_membership_id"),
    membershipId: uuid().defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    role: varchar({ length: 64 }).notNull().default("org:member"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.userId, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    unique("unq_memberships_user_id_organization_id").on(
      table.userId,
      table.organizationId
    ),
  ]
);

export type Membership = typeof memberships.$inferSelect;
