import { authenticateWithGoogle } from "@/core/auth/authenticate-with-google";
import { createSession } from "@/core/auth/create-session";
import { getGoogleUserFromCode } from "@/services/google/get-google-user-from-code";
import { env } from "@/settings/env";

import {
  clearOAuthState,
  readOAuthState,
} from "../../_lib/oauth-state-cookies";
import { setSessionCookie } from "../../_lib/session-cookie";

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
    return new Response("Requisição OAuth inválida.", { status: 400 });
  }

  let userId: string;
  try {
    const profile = await getGoogleUserFromCode(code, stored.codeVerifier);
    const user = await authenticateWithGoogle(profile);
    userId = user.id;
  } catch {
    return new Response("Falha ao autenticar com o Google.", { status: 400 });
  }

  const session = await createSession(userId);
  await setSessionCookie(session.token, session.expiresAt);

  return Response.redirect(new URL("/", env.APP_URL).toString());
}
