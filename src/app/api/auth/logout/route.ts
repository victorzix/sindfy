import { invalidateSession } from "@/core/auth/invalidate-session";

import { clearSessionCookie, getSessionToken } from "../_lib/session-cookie";

/** Logout: encerra a sessão no banco e remove o cookie. */
export async function POST(): Promise<Response> {
  const token = await getSessionToken();
  if (token) {
    await invalidateSession(token);
  }
  await clearSessionCookie();
  return Response.json({ ok: true });
}
