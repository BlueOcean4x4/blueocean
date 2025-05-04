import { router, publicProcedure } from "@/lib/trpc/server"
import { z } from "zod"

const sponsorSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string().url(),
  logoUrl: z.string().url(),
  tier: z.enum(["GOLD", "SILVER", "BRONZE"]),
  isActive: z.boolean(),
})

export const sponsorRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.sponsor.findMany()
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