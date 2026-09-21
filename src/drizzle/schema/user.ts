import {
  boolean,
  snakeCase,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = snakeCase.table("users", {
  avatar: varchar({ length: 2048 }),
  banned: boolean().default(false).notNull(),
  clerkUserId: varchar({ length: 64 })
    .notNull()
    .unique("unq_users_clerk_user_id"),
  createdAt: timestamp({
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  email: varchar({ length: 320 }).notNull().unique("unq_users_email"),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  locked: boolean().default(false).notNull(),
  updatedAt: timestamp({
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  userId: uuid().defaultRandom().primaryKey().notNull(),
  username: varchar({ length: 64 }).notNull().unique("unq_users_username"),
});

export type User = typeof users.$inferSelect;
