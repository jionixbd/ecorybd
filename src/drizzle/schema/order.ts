import { billingAddress } from "@/drizzle/schema/billing-address";
import { organizations } from "@/drizzle/schema/organization";
import { products } from "@/drizzle/schema/product";
import { productVariants } from "@/drizzle/schema/product-variant";
import { shippingMethods } from "@/drizzle/schema/shipping-method";
import {
  check,
  decimal,
  index,
  integer,
  pgEnum,
  snakeCase,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "fulfilled",
  "cancelled",
  "shipped",
  "delivered",
  "refunded",
]);

export const orders = snakeCase.table(
  "orders",
  {
    billingAddressId: uuid()
      .notNull()
      .references(() => billingAddress.billingAddressId, {
        onDelete: "restrict",
      }),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    orderId: uuid().primaryKey().defaultRandom(),
    orderNumber: varchar({ length: 6 }).notNull(),
    organizationId: uuid()
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    shippingMethodCode: varchar({ length: 64 }).notNull(),
    shippingMethodId: uuid().references(
      () => shippingMethods.shippingMethodId,
      {
        onDelete: "set null",
      }
    ),
    shippingMethodName: varchar({ length: 255 }).notNull(),
    shippingTotal: decimal({
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    status: orderStatusEnum().default("pending").notNull(),
    subtotal: decimal({
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    total: decimal({
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("idx_orders_organization_id").on(t.organizationId),
    index("idx_orders_status").on(t.status),
    index("idx_orders_created_at").on(t.createdAt),
    unique("unq_orders_org_order_number").on(t.organizationId, t.orderNumber),
    check("chk_orders_subtotal", sql`${t.subtotal} >= 0`),
    check("chk_orders_shipping_total", sql`${t.shippingTotal} >= 0`),
    check("chk_orders_total", sql`${t.total} >= 0`),
    check(
      "chk_orders_total_matches_sum",
      sql`${t.total} = ${t.subtotal} + ${t.shippingTotal}`
    ),
  ]
);

export const orderItems = snakeCase.table(
  "order_items",
  {
    orderId: uuid()
      .notNull()
      .references(() => orders.orderId, { onDelete: "cascade" }),
    orderItemId: uuid().primaryKey().defaultRandom(),
    productId: uuid().references(() => products.productId, {
      onDelete: "set null",
    }),
    productName: varchar({ length: 255 }).notNull(),
    productVariantId: uuid().references(
      () => productVariants.productVariantId,
      { onDelete: "set null" }
    ),
    productVariantName: varchar({ length: 255 }).notNull(),
    quantity: integer().notNull(),
    sku: varchar({ length: 64 }).notNull(),
    subtotal: decimal({ mode: "number", precision: 12, scale: 2 }).notNull(),
    total: decimal({
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    unitPrice: decimal({ mode: "number", precision: 10, scale: 2 }).notNull(),
    variantName: varchar({ length: 255 }),
  },
  (t) => [
    index("idx_order_items_order_id").on(t.orderId),
    check("chk_order_items_quantity", sql`${t.quantity} > 0`),
    check("chk_order_items_unit_price", sql`${t.unitPrice} >= 0`),
    check("chk_order_items_subtotal", sql`${t.subtotal} >= 0`),
    check("chk_order_items_total", sql`${t.total} >= 0`),
  ]
);

export type OrderItem = typeof orderItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderStatus = (typeof orders.status.enumValues)[number];
