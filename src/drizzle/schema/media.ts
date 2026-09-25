import { users } from "@/drizzle/schema";
import { organizations } from "@/drizzle/schema/organization";
import {
  index,
  integer,
  snakeCase,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const media = snakeCase.table(
  "media",
  {
    altText: varchar({ length: 255 }),
    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    height: integer(),
    key: varchar({ length: 512 }).notNull().unique("unq_media_key"),
    mediaId: uuid().primaryKey().defaultRandom(),
    mimeType: varchar({ length: 64 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    organizationId: uuid()
      .notNull()
      .references(() => organizations.organizationId, {
        onDelete: "cascade",
      }),
    size: integer(),
    ufsUrl: varchar().notNull(),
    updatedAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    uploadedBy: uuid().references(() => users.userId, {
      onDelete: "set null",
    }),
    width: integer(),
  },
  (t) => [
    index("idx_media_organization_id").on(t.organizationId),
    index("idx_media_user_id").on(t.uploadedBy),
  ]
);

export type Media = typeof media.$inferSelect;
