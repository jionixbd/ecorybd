import { media } from "@/drizzle/schema/media";
import { organizations } from "@/drizzle/schema/organization";
import { products } from "@/drizzle/schema/product";
import { users } from "@/drizzle/schema/user";
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  decimal,
  index,
  integer,
  pgEnum,
  snakeCase,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// FIX: move this
const productStatusEnum = pgEnum("product_status", [
  "draft",
  "published",
  "archived",
]);

export const productVariants = snakeCase.table(
  "product_variants",
  {
    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    createdBy: uuid().references(() => users.userId, {
      onDelete: "set null",
    }),
    isDefault: boolean().default(true).notNull(),
    name: varchar({ length: 255 }).notNull(),
    organizationId: uuid()
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    productId: uuid()
      .notNull()
      .references(() => products.productId, {
        onDelete: "cascade",
      }),
    productVariantId: uuid().primaryKey().defaultRandom(),
    salePrice: decimal({ precision: 10, scale: 2 }),
    sku: varchar({ length: 64 }).notNull().unique("unq_product_variant_sku"),
    slug: varchar({ length: 255 }).notNull().unique("unq_product_variant_slug"),
    status: productStatusEnum().default("draft").notNull(),
    stockQuantity: integer().notNull(),
    updatedAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("unq_product_default_variant")
      .on(t.productId)
      .where(sql`${t.isDefault} = true`),
    check("chk_product_variants_price", sql`${t.price} >= 0`),
    check(
      "chk_product_variants_sale_price",
      sql`${t.salePrice} IS NULL OR ${t.salePrice} >= 0`
    ),
    check(
      "chk_product_variants_sale_price_less_than_price",
      sql`${t.salePrice} IS NULL OR ${t.salePrice} < ${t.price}`
    ),
    check("chk_product_variants_stock_quantity", sql`${t.stockQuantity} >= 0`),
  ]
);

export const productVariantMedia = snakeCase.table(
  "product_variant_media",
  {
    mediaId: uuid()
      .notNull()
      .references(() => media.mediaId, {
        onDelete: "cascade",
      }),
    position: integer().notNull(),
    productVariantId: uuid()
      .references(() => productVariants.productVariantId, {
        onDelete: "cascade",
      })
      .notNull(),
    productVariantMediaId: uuid().primaryKey().defaultRandom(),
  },
  (t) => [
    index("idx_product_variant_media_product_variant_id").on(
      t.productVariantId
    ),
    index("idx_product_variant_media_media_id").on(t.mediaId),
    unique("unq_product_variant_media").on(t.productVariantId, t.mediaId),
  ]
);

export type ProductVariant = typeof productVariants.$inferSelect;
export type ProductVariantMedia = typeof productVariantMedia.$inferSelect;
