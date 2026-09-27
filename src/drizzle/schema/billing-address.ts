import { organizations } from "@/drizzle/schema/organization";
import { snakeCase, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const billingAddress = snakeCase.table("billing_address", {
  address: text().notNull(),
  billingAddressId: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  customerId: uuid().references(() => organizations.organizationId, {
    onDelete: "cascade",
  }),
  email: varchar({ length: 320 }),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 32 }).notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type BillingAddress = typeof billingAddress.$inferSelect;
