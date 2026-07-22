import { googleUserSchema, type GoogleUser } from "@/schemas/google-user.schema";
import { decodeJwtPayload } from "@/utils/decode-jwt-payload";

import { getGoogleOAuth } from "./oauth-client";

/**
 * Troca o `code` recebido no callback pelos tokens e devolve o perfil do
 * usuário (claims validadas do `id_token`).
 */
export async function getGoogleUserFromCode(
  code: string,
  codeVerifier: string,
): Promise<GoogleUser> {
  const tokens = await getGoogleOAuth().validateAuthorizationCode(
    code,
    codeVerifier,
  );
  const claims = decodeJwtPayload(tokens.idToken());
  return googleUserSchema.parse(claims);
}
