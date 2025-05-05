import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, publicProcedure, adminProcedure } from "@/lib/trpc/server"

export const accommodationRouter = router({
  // Get all accommodation options
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.accommodation.findMany({
      orderBy: { name: "asc" },
    })
  }),

  // Get all accommodation options (admin only)
  getAllAdmin: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.accommodation.findMany({
      orderBy: { name: "asc" },
    })
  }),

  // Create a new accommodation option (admin only)
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2),
        type: z.string(),
        description: z.string().optional(),
        price: z.number().positive(),
        capacity: z.number().int().positive(),
        availableUnits: z.number().int().positive(),
        amenities: z.array(z.string()),
        isActive: z.boolean().default(true),
        imageUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.accommodation.create({
        data: input,
      })
    }),

  // Update an accommodation option (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2).optional(),
        type: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        capacity: z.number().int().positive().optional(),
        availableUnits: z.number().int().positive().optional(),
        amenities: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
        imageUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      // Check if the accommodation exists
      const accommodation = await ctx.db.accommodation.findUnique({
        where: { id },
      })

      if (!accommodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation option not found",
        })
      }

      return ctx.db.accommodation.update({
        where: { id },
        data,
      })
    }),

  // Delete an accommodation option (admin only)
  delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    // Check if there are any bookings for this accommodation
    // const bookingsCount = await ctx.db.booking.count({
    //   where: { accommodation: {id: input.id }},
    // })

    // if (bookingsCount > 0) {
    //   throw new TRPCError({
    //     code: "BAD_REQUEST",
    //     message: "Cannot delete an accommodation option with existing bookings",
    //   })
    // }

    return ctx.db.accommodation.delete({
      where: { id: input.id },
    })
  }),
}) 