import { users } from "@/drizzle/schema/user";
import {
  index,
  jsonb,
  pgEnum,
  snakeCase,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "pending",
  "in_review",
  "resolved",
  "closed",
]);

export const inquiryPriorityEnum = pgEnum("inquiry_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const inquiryTypeEnum = pgEnum("inquiry_type", [
  "general",
  "product_question",
  "order_issue",
  "return_request",
  "wholesale",
]);

export const inquiries = snakeCase.table(
  "inquiries",
  {
    adminNotes: jsonb(),
    assignedTo: uuid().references(() => users.userId, { onDelete: "set null" }),
    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    email: varchar({ length: 320 }),
    inquiryId: uuid().primaryKey().defaultRandom(),
    // TODO add type `$type<JSONContent>()` to message after tiptap setup
    message: jsonb(),
    name: varchar({ length: 64 }).notNull(),
    // TODO: add `orderId` ref after create order table.
    orderId: uuid(),
    phone: varchar({ length: 32 }),
    priority: inquiryPriorityEnum().default("medium").notNull(),
    // TODO: add `productId` ref after create product table.
    productId: uuid(),
    status: inquiryStatusEnum().default("pending").notNull(),
    subject: varchar({ length: 128 }).notNull(),
    // DEPRECATED: temporary util tiptap setup.
    tempMessage: text(),
    type: inquiryTypeEnum().default("general").notNull(),
    updatedAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userId: uuid().references(() => users.userId, { onDelete: "set null" }),
  },
  (t) => [
    index("idx_inquiries_user_id").on(t.userId),
    index("idx_inquiries_product_id").on(t.productId),
    index("idx_inquiries_order_id").on(t.orderId),
    index("idx_inquiries_assign_to").on(t.assignedTo),
  ]
);

export type Inquiry = typeof inquiries.$inferSelect;
export type InquiryStatus = (typeof inquiries.status.enumValues)[number];
export type InquiryPriority = (typeof inquiries.priority.enumValues)[number];
export type InquiryType = (typeof inquiries.type.enumValues)[number];
