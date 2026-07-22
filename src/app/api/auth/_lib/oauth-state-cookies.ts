import { cookies } from "next/headers";

import { env } from "@/settings/env";

const STATE_COOKIE = "google_oauth_state";
const VERIFIER_COOKIE = "google_code_verifier";
const MAX_AGE_SECONDS = 60 * 10; // 10 minutos para concluir o login

const secure = env.APP_ENV === "production";

/** Guarda o `state` e o `code_verifier` (PKCE) entre a ida e a volta do OAuth. */
export async function storeOAuthState(
  state: string,
  codeVerifier: string,
): Promise<void> {
  const store = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
  store.set(STATE_COOKIE, state, options);
  store.set(VERIFIER_COOKIE, codeVerifier, options);
}

/** Lê o `state` e o `code_verifier` gravados no início do fluxo. */
export async function readOAuthState(): Promise<{
  state: string | null;
  codeVerifier: string | null;
}> {
  const store = await cookies();
  return {
    state: store.get(STATE_COOKIE)?.value ?? null,
    codeVerifier: store.get(VERIFIER_COOKIE)?.value ?? null,
  };
}

/** Limpa os cookies temporários do fluxo OAuth. */
export async function clearOAuthState(): Promise<void> {
  const store = await cookies();
  store.delete(STATE_COOKIE);
  store.delete(VERIFIER_COOKIE);
}
