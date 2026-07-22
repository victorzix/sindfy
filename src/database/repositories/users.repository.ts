import { eq } from "drizzle-orm";

import { db } from "@/database/client";
import { usersTable } from "@/database/schema/users";
import type { User } from "@/models/user";
import type { GoogleUser } from "@/schemas/google-user.schema";

export const usersRepository = {
  async findByGoogleId(googleId: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleId))
      .limit(1);
    return user ?? null;
  },

  async createFromGoogle(profile: GoogleUser): Promise<User> {
    const [user] = await db
      .insert(usersTable)
      .values({
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      })
      .returning();
    return user;
  },
};
