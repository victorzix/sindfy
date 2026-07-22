import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/core/auth/session-config";
import { validateSessionToken } from "@/core/auth/validate-session-token";
import type { User } from "@/models/user";

/**
 * Usuário autenticado atual, lido a partir do cookie de sessão. Uso em Server
 * Components/páginas. Retorna null quando não há sessão válida.
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  const { user } = await validateSessionToken(token);
  return user;
}
