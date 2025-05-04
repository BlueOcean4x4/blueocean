import { prisma } from "@/lib/prisma"

async function checkAdminStatus() {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: "bpchetter@gmail.com"
      }
    })
    
    console.log('User found:', user)
    console.log('Admin status:', user?.isAdmin)
  } catch (error) {
    console.error('Error checking admin status:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdminStatus() 