import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/settings/env";

import * as schema from "./schema";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL não configurada (ver src/settings/env.ts).");
}

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });
