import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, publicProcedure, adminProcedure } from "@/lib/trpc/server"

export const vehicleTypeRouter = router({
  // Get all active vehicle types
  getActive: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.vehicleType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    })
  }),

  // Get all vehicle types (including inactive ones) - admin only
  getAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.vehicleType.findMany({
      orderBy: { name: "asc" },
    })
  }),

  // Create a new vehicle type (admin only)
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if vehicle type with same name already exists
      const existing = await ctx.db.vehicleType.findUnique({
        where: { name: input.name },
      })

      if (existing) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A vehicle type with this name already exists",
        })
      }

      return ctx.db.vehicleType.create({
        data: input,
      })
    }),

  // Update a vehicle type (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2).optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      // Check if the vehicle type exists
      const vehicleType = await ctx.db.vehicleType.findUnique({
        where: { id },
      })

      if (!vehicleType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Vehicle type not found",
        })
      }

      // If name is being changed, check if new name already exists
      if (input.name && input.name !== vehicleType.name) {
        const existing = await ctx.db.vehicleType.findUnique({
          where: { name: input.name },
        })

        if (existing) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "A vehicle type with this name already exists",
          })
        }
      }

      return ctx.db.vehicleType.update({
        where: { id },
        data,
      })
    }),

  // Delete a vehicle type (admin only)
  delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    // Check if there are any bookings using this vehicle type
    const bookingsCount = await ctx.db.booking.count({
      where: {
        vehicleTypes: {
          some: {
            id: input.id,
          },
        },
      },
    })

    if (bookingsCount > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot delete a vehicle type that is being used in bookings",
      })
    }

    return ctx.db.vehicleType.delete({
      where: { id: input.id },
    })
  }),
}) 