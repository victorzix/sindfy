/** Duração de uma sessão a partir da criação/renovação. */
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias

/** Renova a sessão quando faltar menos que isto para expirar. */
export const SESSION_RENEW_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // 15 dias

/** Nome do cookie que carrega o token de sessão. */
export const SESSION_COOKIE_NAME = "sindfy_session";
