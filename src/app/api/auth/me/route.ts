import { validateSessionToken } from "@/core/auth/validate-session-token";

import { getSessionToken, setSessionCookie } from "../_lib/session-cookie";

/** Usuário autenticado atual (útil para validar o backend antes do front). */
export async function GET(): Promise<Response> {
  const token = await getSessionToken();
  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  const { session, user } = await validateSessionToken(token);
  if (!user) {
    return Response.json({ user: null }, { status: 401 });
  }

  // Reflete no cookie a eventual renovação de expiração feita na validação.
  await setSessionCookie(token, session.expiresAt);

  return Response.json({ user });
}
