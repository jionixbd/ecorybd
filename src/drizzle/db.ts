import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { relations } from "./relations";

declare global {
  var database: PostgresJsDatabase<typeof relations> | undefined;
}

let db: PostgresJsDatabase<typeof relations>;
let pg: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") {
  pg = postgres(process.env.DATABASE_URL as string);
  db = drizzle({
    client: pg,
    jit: true,
    logger: false,
    relations,
  });
} else {
  if (!global.database) {
    pg = postgres(process.env.DATABASE_URL as string);
    global.database = drizzle({
      client: pg,
      jit: true,
      logger: false,
      relations,
    });
  }
  db = global.database;
}

export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
export type DbClient = Database | Transaction;

export { db, pg };
