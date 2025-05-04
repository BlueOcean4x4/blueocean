import { router, publicProcedure } from "@/lib/trpc/server"
import { slotRouter } from "./slot"
import { bookingRouter } from "./booking"
import { accommodationRouter } from "./accommodation"
import { sponsorRouter } from "./sponsor"
import { sponsorRequestRouter } from "./sponsor-request"
import { scheduleRouter } from "./schedule"
import { vehicleTypeRouter } from "./vehicle-type"
import { userRouter } from "./user"

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
  accommodation: accommodationRouter,
  sponsor: sponsorRouter,
  sponsorRequest: sponsorRequestRouter,
  schedule: scheduleRouter,
  vehicleType: vehicleTypeRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
