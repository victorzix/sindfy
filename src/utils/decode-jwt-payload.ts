/**
 * Decodifica (sem verificar assinatura) o payload de um JWT. O `id_token` vem
 * direto do endpoint de token do Google sobre TLS, então a verificação de
 * assinatura é dispensável neste ponto do fluxo.
 */
export function decodeJwtPayload(jwt: string): unknown {
  const payload = jwt.split(".")[1];
  if (!payload) {
    throw new Error("JWT inválido: payload ausente.");
  }
  const json = Buffer.from(payload, "base64url").toString("utf8");
  return JSON.parse(json);
}
