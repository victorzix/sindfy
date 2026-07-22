import { eq } from "drizzle-orm";

import { db } from "@/database/client";
import { sessionsTable } from "@/database/schema/sessions";
import { usersTable } from "@/database/schema/users";
import type { Session } from "@/models/session";
import type { User } from "@/models/user";

export const sessionsRepository = {
  async create(session: Session): Promise<void> {
    await db.insert(sessionsTable).values(session);
  },

  async findWithUser(
    sessionId: string,
  ): Promise<{ session: Session; user: User } | null> {
    const [row] = await db
      .select({ session: sessionsTable, user: usersTable })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .where(eq(sessionsTable.id, sessionId))
      .limit(1);
    return row ?? null;
  },

  async updateExpiry(sessionId: string, expiresAt: Date): Promise<void> {
    await db
      .update(sessionsTable)
      .set({ expiresAt })
      .where(eq(sessionsTable.id, sessionId));
  },

  async delete(sessionId: string): Promise<void> {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  },
};
