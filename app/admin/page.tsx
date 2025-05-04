import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Get counts for dashboard
  const bookingsCount = await prisma.booking.count();
  const pendingBookingsCount = await prisma.booking.count({
    where: { status: "PENDING" },
  });
  const confirmedBookingsCount = await prisma.booking.count({
    where: { status: "CONFIRMED" },
  });
  const slotsCount = await prisma.bookingSlot.count();

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              {bookingsCount}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              {pendingBookingsCount}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Confirmed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              {confirmedBookingsCount}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Available Slots
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">{slotsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
