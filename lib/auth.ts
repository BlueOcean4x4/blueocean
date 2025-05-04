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
  const session = await auth()
  const userId = session?.userId
  console.log('Auth check - userId:', userId)

  if (!userId) {
    console.log('Auth check - No userId found')
    return null
  }

  try {
    // Get user from database
    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })
    console.log('Auth check - Found user in database:', user)

    // If user doesn't exist in our database yet, create them
    if (!user) {
      console.log('Auth check - User not found in database, creating new user')
      const clerkUser = await clerkClient.users.getUser(userId)
      console.log('Auth check - Clerk user:', clerkUser)

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
          isAdmin: clerkUser.publicMetadata.isAdmin === true,
        },
      })
      console.log('Auth check - Created new user:', user)
    }

    // Return user with isAdmin status
    return {
      ...user,
      publicMetadata: {
        isAdmin: user.isAdmin
      }
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function isAdmin() {
  console.log('isAdmin - Getting current user')
  const user = await getCurrentUser()
  console.log('isAdmin - Current user:', user)
  console.log('isAdmin - isAdmin value:', user?.isAdmin)
  return user?.isAdmin || false
}
