import type { usersTable } from "@/database/schema/users";

/** Entidade de domínio do usuário do painel. */
export type User = typeof usersTable.$inferSelect;

/** Dados para inserir um novo usuário. */
export type NewUser = typeof usersTable.$inferInsert;
