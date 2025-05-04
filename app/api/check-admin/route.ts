import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    console.log('API check - session:', session)

    if (!session?.userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: session.userId,
      },
    })
    console.log('API check - Found user:', user)

    return NextResponse.json({
      userId: session.userId,
      user,
      isAdmin: user?.isAdmin || false
    })
  } catch (error) {
    console.error('Error checking admin status:', error)
    return NextResponse.json({ error: 'Failed to check admin status' }, { status: 500 })
  }
} 