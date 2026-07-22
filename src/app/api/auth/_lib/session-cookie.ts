import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/core/auth/session-config";
import { env } from "@/settings/env";

const secure = env.APP_ENV === "production";

/** Grava o cookie de sessão (httpOnly) com a mesma expiração da sessão. */
export async function setSessionCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    expires: expiresAt,
  });
}

/** Lê o token de sessão do cookie, se existir. */
export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}

/** Remove o cookie de sessão (logout). */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}
