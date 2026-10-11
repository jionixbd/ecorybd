import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "./relations";

type AppDatabase = NodePgDatabase<typeof relations>;

type DatabaseGlobals = typeof globalThis & {
  __ecorybdPgPool?: Pool;
  __ecorybdDrizzle?: AppDatabase;
};

const globalForDatabase = globalThis as DatabaseGlobals;

function getConnectionString(): string {
  if (process.env.VERCEL && !process.env.DATABASE_URL_POOLER) {
    throw new Error("DATABASE_URL_POOLER must be set on Vercel.");
  }

  const connectionString =
    process.env.DATABASE_URL_POOLER ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or DATABASE_URL_POOLER must be set.");
  }

  return connectionString;
}

function createPool(): Pool {
  // const pool = new Pool({
  //   connectionString: getConnectionString(),
  //   connectionTimeoutMillis: 10_000,
  //   idleTimeoutMillis: 5000,
  //   keepAlive: true,
  //   max: 5,
  // });

  const pool = new Pool({
    connectionString: getConnectionString(),
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 5000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    max: 5,
    query_timeout: 25_000,
    statement_timeout: 20_000,
  });

  pool.on("connect", (client) => {
    client.on("error", (error) => {
      console.warn("[database] client error:", error.message);
    });
  });

  if (process.env.VERCEL) {
    attachDatabasePool(pool);
  }

  return pool;
}

export const pool = globalForDatabase.__ecorybdPgPool ?? createPool();
globalForDatabase.__ecorybdPgPool = pool;

export const db =
  globalForDatabase.__ecorybdDrizzle ??
  drizzle({
    client: pool,
    logger: false,
    relations,
  });

globalForDatabase.__ecorybdDrizzle = db;

export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
export type DbClient = Database | Transaction;
