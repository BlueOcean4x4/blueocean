import { createCallerFactory } from "./server"
import { appRouter, type AppRouter } from "./routers/_app"

export const api = createCallerFactory<AppRouter>(appRouter) 