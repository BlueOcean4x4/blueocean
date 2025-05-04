import { initTRPC, TRPCError } from "@trpc/server"
import { ZodError } from "zod"
import { db } from "@/lib/db"

// Try to import Prisma, but don't fail if it's not available
let prisma: any
try {
  prisma = require("@/lib/prisma").prisma
  console.log("Prisma client loaded successfully")
} catch (e) {
  console.warn("Prisma client not available, using mock database")
  prisma = db
}

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const user = null

  // We'll implement user authentication later

  return {
    db: prisma,
    user,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure

// Protected procedure - requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

// Admin procedure - requires admin role
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
