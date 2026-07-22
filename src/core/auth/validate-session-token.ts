import { sessionsRepository } from "@/database/repositories/sessions.repository";
import type { Session } from "@/models/session";
import type { User } from "@/models/user";
import { hashSessionToken } from "@/utils/session-token";

import {
  SESSION_DURATION_MS,
  SESSION_RENEW_THRESHOLD_MS,
} from "./session-config";

export type SessionValidation =
  | { session: Session; user: User }
  | { session: null; user: null };

const EMPTY: SessionValidation = { session: null, user: null };

/**
 * Valida o token do cookie: devolve sessão + usuário, renova quando perto de
 * expirar e remove quando já expirada.
 */
export async function validateSessionToken(
  token: string,
): Promise<SessionValidation> {
  const sessionId = hashSessionToken(token);
  const found = await sessionsRepository.findWithUser(sessionId);
  if (!found) {
    return EMPTY;
  }

  const { session, user } = found;
  const now = Date.now();

  if (now >= session.expiresAt.getTime()) {
    await sessionsRepository.delete(sessionId);
    return EMPTY;
  }

  if (now >= session.expiresAt.getTime() - SESSION_RENEW_THRESHOLD_MS) {
    const expiresAt = new Date(now + SESSION_DURATION_MS);
    await sessionsRepository.updateExpiry(sessionId, expiresAt);
    session.expiresAt = expiresAt;
  }

  return { session, user };
}
