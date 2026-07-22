import { authenticateWithGoogle } from "@/core/auth/authenticate-with-google";
import { createSession } from "@/core/auth/create-session";
import { getGoogleUserFromCode } from "@/services/google/get-google-user-from-code";
import { env } from "@/settings/env";

import {
  clearOAuthState,
  readOAuthState,
} from "../../_lib/oauth-state-cookies";
import { setSessionCookie } from "../../_lib/session-cookie";

/** Resposta de erro: loga a causa real e, em dev, revela a mensagem. */
function fail(message: string, error?: unknown): Response {
  if (error !== undefined) {
    console.error("[auth/google/callback]", message, error);
  }
  const detail =
    env.APP_ENV === "development" && error instanceof Error
      ? ` — ${error.message}`
      : "";
  return new Response(`${message}${detail}`, { status: 400 });
}

/** Callback do Google: valida o `code`, autentica o usuário e abre a sessão. */
export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const code = params.get("code");
  const state = params.get("state");

  const stored = await readOAuthState();
  await clearOAuthState();

  if (
    !code ||
    !state ||
    !stored.state ||
    !stored.codeVerifier ||
    state !== stored.state
  ) {
    return fail("Requisição OAuth inválida.");
  }

  let userId: string;
  try {
    const profile = await getGoogleUserFromCode(code, stored.codeVerifier);
    const user = await authenticateWithGoogle(profile);
    userId = user.id;
  } catch (error) {
    return fail("Falha ao autenticar com o Google.", error);
  }

  try {
    const session = await createSession(userId);
    await setSessionCookie(session.token, session.expiresAt);
  } catch (error) {
    return fail("Falha ao criar a sessão.", error);
  }

  return Response.redirect(new URL("/", env.APP_URL).toString());
}
