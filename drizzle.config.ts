import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import { env } from "./src/settings/env";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL não configurada (ver .env).");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/index.ts",
  out: "./drizzle",
  dbCredentials: { url: env.DATABASE_URL },
});
