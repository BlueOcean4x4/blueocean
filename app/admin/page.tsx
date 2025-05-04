import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

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
  const totalSponsoredAmount = await prisma.sponsor.aggregate({
    _sum: {
      amount: true,
    },
  });

  // Get total confirmed participants
  const confirmedParticipants = await prisma.booking.aggregate({
    where: {
      status: "CONFIRMED",
    },
    _sum: {
      participants: true,
    },
  });

  // Get total accommodations
  const accommodationsCount = await prisma.accommodation.count();

  // Get date range of all slots
  const slots = await prisma.bookingSlot.findMany({
    select: {
      startDate: true,
      endDate: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  const earliestDate = slots[0]?.startDate;
  const latestDate = slots[slots.length - 1]?.endDate;

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
              Available Event Packages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">{slotsCount}</div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Total Sponsored Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              R{totalSponsoredAmount._sum.amount?.toLocaleString("en-ZA") || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Event Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-sm sm:text-base font-medium">
              {earliestDate && latestDate ? (
                <>
                  {format(earliestDate, "dd MMM yyyy")} -{" "}
                  {format(latestDate, "dd MMM yyyy")}
                </>
              ) : (
                "No dates available"
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Confirmed Participants
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              {confirmedParticipants._sum.participants?.toLocaleString(
                "en-ZA"
              ) || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 sm:p-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
              Total Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">
              {accommodationsCount.toLocaleString("en-ZA")}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
