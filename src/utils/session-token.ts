import { createHash, randomBytes } from "node:crypto";

/** Gera o token opaco enviado ao cliente (cookie). Nunca é persistido em claro. */
export function generateSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Deriva o identificador da sessão no banco = SHA-256 do token (hex). */
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
