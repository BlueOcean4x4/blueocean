"use client";

import { useUser } from "@clerk/nextjs";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface VehicleType {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
}

interface Booking {
  id: string;
  slot: {
    id: string;
    name: string;
  };
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  arrivalDate: string;
  departureDate: string;
  participants: number;
  accommodation: string;
  vehicleCount: number;
  vehicleTypes: VehicleType[];
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { data: bookings, isLoading } = trpc.booking.getUserBookings.useQuery(
    undefined,
    {
      enabled: !!user,
    }
  );

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="mb-6">
            Please sign in to view your profile and bookings.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">
            Welcome back, {user.firstName || user.username}!
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Bookings</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="grid gap-6">
              {bookings.map((booking: Booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle>{booking.slot.name}</CardTitle>
                    <CardDescription>
                      Booked on{" "}
                      {format(new Date(booking.createdAt), "MMMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0) +
                            booking.status.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Dates
                          </p>
                          <p>
                            {format(new Date(booking.arrivalDate), "MMM d")} -{" "}
                            {format(
                              new Date(booking.departureDate),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Participants
                          </p>
                          <p>{booking.participants} people</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Accommodation
                          </p>
                          <p>
                            {booking.accommodation === "blue-ocean"
                              ? "Blue Ocean Lodging"
                              : "Island Rock Lapa Houses"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Vehicles
                          </p>
                          <p>
                            {booking.vehicleCount}{" "}
                            {booking.vehicleCount === 1
                              ? "vehicle"
                              : "vehicles"}{" "}
                            (
                            {booking.vehicleTypes
                              .map((vt: VehicleType) => vt.name)
                              .join(", ")}
                            )
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={`/booking/${booking.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 text-center rounded-lg">
              <p className="mb-4">You haven't made any bookings yet.</p>
              <Button asChild>
                <Link href="/#booking">Book Now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
