import { z } from "zod";

/**
 * Claims do `id_token` do Google que o painel consome no login.
 * `sub` é o identificador estável do usuário no Google (vira `googleId`).
 */
export const googleUserSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  email_verified: z.boolean().optional(),
});

export type GoogleUser = z.infer<typeof googleUserSchema>;
