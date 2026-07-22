import { sessionsRepository } from "@/database/repositories/sessions.repository";
import { generateSessionToken, hashSessionToken } from "@/utils/session-token";

import { SESSION_DURATION_MS } from "./session-config";

export interface CreatedSession {
  token: string;
  expiresAt: Date;
}

/** Cria uma sessão para o usuário e devolve o token opaco (vai para o cookie). */
export async function createSession(userId: string): Promise<CreatedSession> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await sessionsRepository.create({
    id: hashSessionToken(token),
    userId,
    expiresAt,
  });

  return { token, expiresAt };
}
