import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { router, publicProcedure, protectedProcedure, adminProcedure } from "@/lib/trpc/server"

export const bookingRouter = router({
  // Create a new booking
  create: protectedProcedure
    .input(
      z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(5),
        participants: z.number().int().positive(),
        vehicleTypes: z.array(z.string()),
        vehicleCount: z.number().int().positive(),
        accommodation: z.string().optional(),
        arrivalDate: z.string().transform((str) => new Date(str)),
        departureDate: z.string().transform((str) => new Date(str)),
        specialRequests: z.string().optional(),
        slotIds: z.array(z.string()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if all slots exist and have available spots
      const slots = await Promise.all(
        input.slotIds.map(async (slotId) => {
          const slot = await ctx.db.bookingSlot.findUnique({
            where: { id: slotId },
          })
          if (!slot) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Booking slot ${slotId} not found`,
            })
          }
          if (slot.availableSpots < input.participants) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Not enough available spots in ${slot.name} for this booking`,
            })
          }
          return slot
        })
      )

      // Get vehicle types
      const vehicleTypes = await Promise.all(
        input.vehicleTypes.map(async (name) => {
          const vehicleType = await ctx.db.vehicleType.findUnique({
            where: { name },
          })
          if (!vehicleType) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Vehicle type ${name} not found`,
            })
          }
          return vehicleType
        })
      )

      // Create the booking
      const booking = await ctx.db.booking.create({
        data: {
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          participants: input.participants,
          vehicleTypes: {
            connect: vehicleTypes.map((vt) => ({ id: vt.id })),
          },
          vehicleCount: input.vehicleCount,
          accommodation: input.accommodation || "none",
          arrivalDate: input.arrivalDate,
          departureDate: input.departureDate,
          specialRequests: input.specialRequests,
          userId: ctx.user?.id,
          slotId: input.slotIds[0], // Keep the first slot as primary for backward compatibility
          bookingSlots: {
            connect: input.slotIds.map((id) => ({ id })),
          },
        },
        include: {
          vehicleTypes: true,
          bookingSlots: true,
        },
      })

      // Update available spots in all slots
      await Promise.all(
        slots.map((slot) =>
          ctx.db.bookingSlot.update({
            where: { id: slot.id },
            data: {
              availableSpots: slot.availableSpots - input.participants,
            },
          })
        )
      )

      return booking
    }),

  // Get all bookings (admin only)
  getAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.booking.findMany({
      include: {
        slot: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  // Get booking by ID (admin or booking owner)
  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const booking = await ctx.db.booking.findUnique({
      where: { id: input.id },
      include: {
        slot: true,
      },
    })

    if (!booking) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Booking not found",
      })
    }

    // Check if user is admin or booking owner
    if (!ctx.user.isAdmin && booking.userId !== ctx.user.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to view this booking",
      })
    }

    return booking
  }),

  // Update booking status (admin only)
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input.id },
        include: { slot: true },
      })

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        })
      }

      // If cancelling a booking, add the spots back to available
      if (input.status === "CANCELLED" && booking.status !== "CANCELLED") {
        await ctx.db.bookingSlot.update({
          where: { id: booking.slotId },
          data: {
            availableSpots: booking.slot.availableSpots + booking.participants,
          },
        })
      }

      // If un-cancelling a booking, remove the spots from available
      if (booking.status === "CANCELLED" && input.status !== "CANCELLED") {
        await ctx.db.bookingSlot.update({
          where: { id: booking.slotId },
          data: {
            availableSpots: booking.slot.availableSpots - booking.participants,
          },
        })
      }

      return ctx.db.booking.update({
        where: { id: input.id },
        data: { status: input.status },
      })
    }),

  // Get user's bookings
  getUserBookings: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.booking.findMany({
      where: { userId: ctx.user.id },
      include: {
        slot: true,
        vehicleTypes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),
})
