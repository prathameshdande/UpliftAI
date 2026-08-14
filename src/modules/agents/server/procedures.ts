import { z } from 'zod';
import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, baseProcedure, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema } from '../schemas';
import { eq, getTableColumns, sql } from 'drizzle-orm';

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));

    return existingAgent;
  }),

  getMany: baseProcedure.query(async () => {
    return await db.select({
      meetingsCount: sql<number>`5`,
      ...getTableColumns(agents),
    }).from(agents);
  }),

  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
    const [createdAgent] = await db
      .insert(agents)
      .values({
        ...input,
        userId: ctx.auth.user.id,
      })
      .returning();

    return createdAgent;
  }),
});
