import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, publicProcedure, adminProcedure } from "@/lib/trpc/server"

export const slotRouter = router({
  // Get all active booking slots
  getActive: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.bookingSlot.findMany({
      where: { isActive: true },
      orderBy: { startDate: "asc" },
    })
  }),

  // Get all booking slots (including inactive ones) - admin only
  getAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.bookingSlot.findMany({
      orderBy: { startDate: "asc" },
    })
  }),

  // Create a new booking slot (admin only)
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2),
        startDate: z.date(),
        endDate: z.date(),
        totalCapacity: z.number().int().positive(),
        availableSpots: z.number().int().positive(),
        price: z.number().positive(),
        description: z.string().optional(),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Validate that end date is after start date
      if (input.endDate <= input.startDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        })
      }

      return ctx.prisma.bookingSlot.create({
        data: input,
      })
    }),

  // Update a booking slot (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        totalCapacity: z.number().int().positive().optional(),
        availableSpots: z.number().int().positive().optional(),
        price: z.number().positive().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      // Check if the slot exists
      const slot = await ctx.prisma.bookingSlot.findUnique({
        where: { id },
      })

      if (!slot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking slot not found",
        })
      }

      // If both dates are provided, validate that end date is after start date
      if (input.startDate && input.endDate && input.endDate <= input.startDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        })
      }

      return ctx.prisma.bookingSlot.update({
        where: { id },
        data,
      })
    }),

  // Delete a booking slot (admin only)
  delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    // Check if there are any bookings for this slot
    const bookingsCount = await ctx.prisma.booking.count({
      where: { slotId: input.id },
    })

    if (bookingsCount > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot delete a slot with existing bookings",
      })
    }

    return ctx.prisma.bookingSlot.delete({
      where: { id: input.id },
    })
  }),

  // Get a single booking slot by ID
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const slot = await ctx.prisma.bookingSlot.findUnique({
      where: { id: input.id },
    })

    if (!slot) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Booking slot not found",
      })
    }

    return slot
  }),
})
