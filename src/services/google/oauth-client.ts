import { Google } from "arctic";

import { env } from "@/settings/env";

let client: Google | null = null;

/**
 * Cliente OAuth do Google (arctic), construído sob demanda para não quebrar o
 * build quando as credenciais ainda não estão configuradas.
 */
export function getGoogleOAuth(): Google {
  if (client) {
    return client;
  }

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
      "GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET não configurados (ver src/settings/env.ts).",
    );
  }

  const redirectUri =
    env.GOOGLE_REDIRECT_URI ?? `${env.APP_URL}/api/auth/google/callback`;

  client = new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    redirectUri,
  );

  return client;
}
