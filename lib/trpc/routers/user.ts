import { router, adminProcedure } from "@/lib/trpc/server"
import { z } from "zod"

const userUpdateSchema = z.object({
  id: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  isAdmin: z.boolean(),
})

export const userRouter = router({
  getAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }),
  update: adminProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.user.update({
        where: { id },
        data,
      })
    }),
}) 