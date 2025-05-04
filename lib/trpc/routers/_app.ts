import { router } from "@/lib/trpc/server"

// Create a simple health check procedure
const healthRouter = router({
  check: router.createCaller.procedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() }
  }),
})

export const appRouter = router({
  health: healthRouter,
})

export type AppRouter = typeof appRouter
