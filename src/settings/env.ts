import { z } from "zod";

/**
 * Ponto ÚNICO de acesso às variáveis de ambiente (ver CLAUDE.md).
 * Nunca leia `process.env` fora deste módulo.
 *
 * Módulo server-side: não importar em componentes client.
 */

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().url().optional(),
);

const envSchema = z.object({
  APP_ENV: z.enum(["development", "production"]).default("development"),
  APP_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().default("http://localhost:3000"),
  ),

  DATABASE_URL: optionalString,

  EVOLUTION_API_URL: optionalUrl,
  EVOLUTION_API_KEY: optionalString,
  EVOLUTION_INSTANCE_NAME: optionalString,

  N8N_BASE_URL: optionalUrl,
  N8N_WEBHOOK_URL: optionalUrl,
  N8N_API_KEY: optionalString,

  AI_PROVIDER: z.enum(["gemini", "openai"]).default("gemini"),
  GEMINI_API_KEY: optionalString,
  OPENAI_API_KEY: optionalString,
});

export const env = envSchema.parse(process.env);
