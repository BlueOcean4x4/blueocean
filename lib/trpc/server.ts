import { initTRPC, TRPCError } from "@trpc/server"
import { ZodError } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const createTRPCContext = async (opts: { headers: Headers }) => {
  try {
    const user = await getCurrentUser()

    return {
      prisma,
      user,
      ...opts,
    }
  } catch (error) {
    console.error("Error creating tRPC context:", error)
    return {
      prisma,
      user: null,
      ...opts,
    }
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
