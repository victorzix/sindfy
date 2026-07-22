import { generateCodeVerifier, generateState } from "arctic";

import { getGoogleOAuth } from "@/services/google/oauth-client";

import { storeOAuthState } from "../_lib/oauth-state-cookies";

/** Início do login: monta a URL de autorização do Google e redireciona. */
export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = getGoogleOAuth().createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  await storeOAuthState(state, codeVerifier);

  return Response.redirect(url.toString());
}
