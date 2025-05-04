import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  // Get counts for dashboard
  const bookingsCount = await prisma.booking.count()
  const pendingBookingsCount = await prisma.booking.count({
    where: { status: "PENDING" },
  })
  const confirmedBookingsCount = await prisma.booking.count({
    where: { status: "CONFIRMED" },
  })
  const slotsCount = await prisma.bookingSlot.count()

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookingsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingBookingsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Confirmed Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{confirmedBookingsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Available Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{slotsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
