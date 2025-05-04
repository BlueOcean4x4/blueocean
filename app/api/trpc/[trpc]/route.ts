import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/lib/trpc/routers/_app"
import { createTRPCContext } from "@/lib/trpc/server"

// Ensure Prisma is initialized
import { prisma } from "@/lib/prisma"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      // Test prisma connection to ensure it's working
      try {
        await prisma.$queryRaw`SELECT 1`
      } catch (e) {
        console.error("Failed to connect to database", e)
      }

      return createTRPCContext({ headers: req.headers })
    },
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC error on ${path ?? "<no-path>"}: ${error.message}`)
          }
        : undefined,
  })

export { handler as GET, handler as POST }
