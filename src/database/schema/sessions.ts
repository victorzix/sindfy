import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

/**
 * Sessão de login. O `id` é o SHA-256 (hex) do token opaco guardado no cookie —
 * o token em claro nunca é persistido.
 */
export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
