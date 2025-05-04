// This is a simplified database client that doesn't rely on Prisma initially
// We'll use this as a fallback if Prisma client generation fails

export type User = {
  id: string
  name: string | null
  email: string
  clerkId: string
  isAdmin: boolean
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"

export type Booking = {
  id: string
  fullName: string
  email: string
  phone: string
  participants: number
  vehicleTypes: string[]
  vehicleCount: number
  accommodation: string
  arrivalDate: Date
  departureDate: Date
  specialRequests: string | null
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
  userId: string | null
  slotId: string
}

export type BookingSlot = {
  id: string
  name: string
  startDate: Date
  endDate: Date
  totalCapacity: number
  availableSpots: number
  price: number
  description: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Mock database functions that will be replaced with Prisma once it's working
export const db = {
  user: {
    findUnique: async () => null as User | null,
    create: async () => null as User | null,
  },
  booking: {
    findMany: async () => [] as Booking[],
    findUnique: async () => null as Booking | null,
    create: async () => null as Booking | null,
    update: async () => null as Booking | null,
    count: async () => 0,
  },
  bookingSlot: {
    findMany: async () => [] as BookingSlot[],
    findUnique: async () => null as BookingSlot | null,
    create: async () => null as BookingSlot | null,
    update: async () => null as BookingSlot | null,
    delete: async () => null as BookingSlot | null,
    count: async () => 0,
  },
}
