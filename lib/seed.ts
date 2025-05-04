import { PrismaClient } from "@prisma/client"
import { addDays } from "date-fns"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Create admin user
  console.log("Creating admin user...")
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@blueocean4x4.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@blueocean4x4.com",
      clerkId: "admin_clerk_id", // Replace with actual Clerk ID when available
      isAdmin: true,
      role: "ADMIN",
    },
  })
  console.log(`Created admin user with ID: ${adminUser.id}`)

  // Create booking slots
  console.log("Creating booking slots...")
  const eventStartDate = new Date(2025, 9, 3) // October 3rd, 2025

  const mainEventSlot = await prisma.bookingSlot.upsert({
    where: { id: "main-event-2025" },
    update: {},
    create: {
      id: "main-event-2025",
      name: "Blue Ocean 4x4 Beach & Bush Rally 2025",
      startDate: eventStartDate,
      endDate: addDays(eventStartDate, 4), // 4 days event
      totalCapacity: 100,
      availableSpots: 100,
      price: 2500.0,
      description: "The main 4-day event including all activities, challenges, and evening entertainment.",
      isActive: true,
    },
  })
  console.log(`Created main event slot with ID: ${mainEventSlot.id}`)

  const familySlot = await prisma.bookingSlot.upsert({
    where: { id: "family-event-2025" },
    update: {},
    create: {
      id: "family-event-2025",
      name: "Family Package - Blue Ocean Rally 2025",
      startDate: eventStartDate,
      endDate: addDays(eventStartDate, 4),
      totalCapacity: 50,
      availableSpots: 50,
      price: 1800.0,
      description: "Family-friendly package with access to the 10KM novice route and all family activities.",
      isActive: true,
    },
  })
  console.log(`Created family event slot with ID: ${familySlot.id}`)

  const weekendSlot = await prisma.bookingSlot.upsert({
    where: { id: "weekend-event-2025" },
    update: {},
    create: {
      id: "weekend-event-2025",
      name: "Weekend Package (Oct 5-7)",
      startDate: addDays(eventStartDate, 2), // Starting on Sunday
      endDate: addDays(eventStartDate, 4),
      totalCapacity: 30,
      availableSpots: 30,
      price: 1200.0,
      description: "Weekend-only package covering the last two days of the rally.",
      isActive: true,
    },
  })
  console.log(`Created weekend event slot with ID: ${weekendSlot.id}`)

  console.log("✅ Database seeding completed!")
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
