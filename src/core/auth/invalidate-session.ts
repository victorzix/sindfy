import { sessionsRepository } from "@/database/repositories/sessions.repository";
import { hashSessionToken } from "@/utils/session-token";

/** Encerra a sessão correspondente ao token (logout). */
export async function invalidateSession(token: string): Promise<void> {
  await sessionsRepository.delete(hashSessionToken(token));
}
