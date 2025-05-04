import { router, publicProcedure } from "@/lib/trpc/server"
import { z } from "zod"

const sponsorSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string().url(),
  logoUrl: z.string().url(),
  tier: z.enum(["GOLD", "SILVER", "BRONZE"]),
  amount: z.number().min(0),
  isActive: z.boolean(),
})

export const sponsorRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.sponsor.findMany()
  }),
  getTotalAmount: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.sponsor.aggregate({
      _sum: {
        amount: true
      }
    })
    return result._sum.amount || 0
  }),
  create: publicProcedure
    .input(sponsorSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sponsor.create({ data: input })
    }),
  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(sponsorSchema))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.sponsor.update({ where: { id }, data })
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sponsor.delete({ where: { id: input.id } })
    }),
}) 