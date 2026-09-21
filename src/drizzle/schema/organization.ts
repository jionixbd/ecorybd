import { snakeCase, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const organizations = snakeCase.table("organizations", {
  clerkOrganizationId: varchar({ length: 64 })
    .notNull()
    .unique("unq_organizations_clerk_organization_id"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  logo: varchar({ length: 2048 }),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  organizationId: uuid().defaultRandom().primaryKey(),
  slug: varchar("slug", {
    length: 255,
  })
    .notNull()
    .unique("unq_organizations_slug"),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type Organization = typeof organizations.$inferSelect;
