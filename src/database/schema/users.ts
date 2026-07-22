import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Usuário do painel. Campos obrigatórios vêm do Google (login OAuth).
 * Campos opcionais do domínio serão adicionados depois.
 */
export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  googleId: text("google_id").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
