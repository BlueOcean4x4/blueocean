import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

// Try to import Prisma, but don't fail if it's not available
let prisma: any
try {
  prisma = require("@/lib/prisma").prisma
} catch (e) {
  console.warn("Prisma client not available, using mock database")
  prisma = db
}

export async function getCurrentUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    // Get user from database
    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    // If user doesn't exist in our database yet, create them
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId)

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        },
      })
    }

    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.isAdmin || false
}
