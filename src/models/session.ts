import type { sessionsTable } from "@/database/schema/sessions";

/** Entidade de domínio da sessão de login. */
export type Session = typeof sessionsTable.$inferSelect;
