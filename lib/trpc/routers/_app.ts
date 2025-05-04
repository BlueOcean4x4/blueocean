import { router, publicProcedure } from "@/lib/trpc/server"
import { slotRouter } from "./slot"
import { bookingRouter } from "./booking"
// Create a simple health check procedure
const healthRouter = router({
  check: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() }
  }),
})

export const appRouter = router({
  health: healthRouter,
  slot: slotRouter,
  booking: bookingRouter,
})

export type AppRouter = typeof appRouter
