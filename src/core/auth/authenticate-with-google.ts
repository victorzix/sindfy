import { usersRepository } from "@/database/repositories/users.repository";
import type { User } from "@/models/user";
import type { GoogleUser } from "@/schemas/google-user.schema";

/**
 * Garante um usuário do painel a partir do perfil Google: cria no primeiro
 * login e reaproveita pelo `googleId` nos seguintes.
 */
export async function authenticateWithGoogle(
  profile: GoogleUser,
): Promise<User> {
  const existing = await usersRepository.findByGoogleId(profile.sub);
  if (existing) {
    return existing;
  }
  return usersRepository.createFromGoogle(profile);
}
