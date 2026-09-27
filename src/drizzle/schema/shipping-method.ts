import { organizations } from "@/drizzle/schema/organization";
import { productVariants } from "@/drizzle/schema/product-variant";
import { users } from "@/drizzle/schema/user";
import { sql } from "drizzle-orm";
import {
  check,
  decimal,
  index,
  primaryKey,
  snakeCase,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const shippingMethods = snakeCase.table(
  "shipping_methods",
  {
    charge: decimal({ mode: "number", precision: 10, scale: 2 }).notNull(),
    code: varchar({ length: 64 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid().references(() => users.userId, {
      onDelete: "set null",
    }),
    description: varchar({ length: 512 }),
    label: varchar({ length: 128 }),
    name: varchar({ length: 255 }).notNull(),
    organizationId: uuid()
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    shippingMethodId: uuid().primaryKey().defaultRandom().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("idx_shipping_methods_organization_id").on(t.organizationId),
    check("chk_shipping_methods_charge", sql`${t.charge} >= 0`),
    unique("unq_shipping_methods_org_code").on(t.organizationId, t.code),
  ]
);

export const productShippingMethods = snakeCase.table(
  "product_shipping_methods",
  {
    productVariantId: uuid()
      .notNull()
      .references(() => productVariants.productVariantId, {
        onDelete: "cascade",
      }),
    shippingMethodId: uuid()
      .notNull()
      .references(() => shippingMethods.shippingMethodId, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    primaryKey({ columns: [t.productVariantId, t.shippingMethodId] }),
    index("idx_product_shipping_methods_shipping_method_id").on(
      t.shippingMethodId
    ),
  ]
);

export type ShippingMethod = typeof shippingMethods.$inferSelect;
export type ProductShippingMethod = typeof productShippingMethods.$inferSelect;
