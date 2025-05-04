import { router } from "@/lib/trpc/server"
import { bookingRouter } from "./booking"
import { slotRouter } from "./slot"

export const appRouter = router({
  booking: bookingRouter,
  slot: slotRouter,
})

export type AppRouter = typeof appRouter
