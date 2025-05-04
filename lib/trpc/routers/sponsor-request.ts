import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, publicProcedure, protectedProcedure, adminProcedure } from "@/lib/trpc/server"

export const sponsorRequestRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().min(1),
        website: z.string().url().optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sponsorRequest.create({
        data: input,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.sponsorRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sponsorRequest.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sponsorRequest.delete({
        where: { id: input.id },
      });
    }),
}) 