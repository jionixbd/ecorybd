import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

dotenv.config({ override: true, path: ".env.production.local" });

console.info({
  _: "DATABASE_INFO",
  config: "drizzle-prod-config",
  env: ".env.production.local",
});

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  dialect: "postgresql",
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema/index.ts",
  strict: true,
  verbose: true,
} satisfies Config);
