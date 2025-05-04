import { z } from "zod"
import { router, protectedProcedure, publicProcedure } from "@/lib/trpc/server"

export const scheduleRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.schedule.findMany({
      where: { isActive: true },
      orderBy: { date: "asc" },
    })
  }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.schedule.findUnique({
        where: { id: input },
      })
    }),

  create: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        title: z.string(),
        description: z.string(),
        startTime: z.string(),
        location: z.string(),
        activities: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.schedule.create({
        data: input,
      })
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        startTime: z.string().optional(),
        location: z.string().optional(),
        activities: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.schedule.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.schedule.delete({
        where: { id: input },
      })
    }),
}) 