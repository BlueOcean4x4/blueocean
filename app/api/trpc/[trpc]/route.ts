import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/lib/trpc/routers/_app"
import { createTRPCContext } from "@/lib/trpc/server"
import superjson from "superjson"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => createTRPCContext({ headers: req.headers }),
    transformer: superjson,
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC error on ${path ?? "<no-path>"}: ${error.message}`)
          }
        : undefined,
  })

export { handler as GET, handler as POST }
