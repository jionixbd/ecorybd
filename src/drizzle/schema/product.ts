import { media } from "@/drizzle/schema/media";
import { organizations } from "@/drizzle/schema/organization";
import { users } from "@/drizzle/schema/user";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  snakeCase,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "published",
  "archived",
]);

export const products = snakeCase.table(
  "products",
  {
    badge: varchar({ length: 64 }),
    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    createdBy: uuid().references(() => users.userId, {
      onDelete: "set null",
    }),
    // TODO add type `$type<JSONContent>()` to message after tiptap setup
    description: jsonb(),
    isFeatured: boolean().default(false).notNull(),
    metaDescription: text(),
    metaTitle: varchar({ length: 255 }),
    name: varchar({ length: 255 }).notNull(),
    organizationId: uuid()
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    productId: uuid().primaryKey().defaultRandom(),
    // TODO add type `$type<JSONContent>()` to message after tiptap setup
    shortDescription: jsonb(),
    slug: varchar({ length: 255 }).notNull().unique("unq_product_slug"),
    status: productStatusEnum().default("draft").notNull(),
    // DEPRECATED: temporary `tempDescription`, `tempShortDescription` util tiptap setup.
    tempDescription: text().notNull(),
    tempShortDescription: text().notNull(),
    updatedAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("idx_products_organization_id").on(t.organizationId),
    index("idx_products_created_by").on(t.createdBy),
  ]
);

export const productMedia = snakeCase.table(
  "product_media",
  {
    isFeatured: boolean().default(false).notNull(),
    mediaId: uuid()
      .references(() => media.mediaId, {
        onDelete: "cascade",
      })
      .notNull(),
    position: integer().notNull(),
    productId: uuid()
      .references(() => products.productId, {
        onDelete: "cascade",
      })
      .notNull(),
    productMediaId: uuid().primaryKey().defaultRandom(),
  },
  (t) => [
    index("idx_product_media_product_id").on(t.productId),
    index("idx_product_media_media_id").on(t.mediaId),
    unique("unq_product_media").on(t.productId, t.mediaId),
    uniqueIndex("unq_product_featured_media")
      .on(t.productId)
      .where(sql`${t.isFeatured} = true`),
  ]
);

export type Product = typeof products.$inferSelect;
export type ProductStatus = (typeof productStatusEnum.enumValues)[number];
export type ProductMedia = typeof productMedia.$inferSelect;
