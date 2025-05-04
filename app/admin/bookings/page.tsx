"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  participants: number;
  arrivalDate: string;
  departureDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

export default function ManageBookings() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data: bookings, isLoading, refetch } = trpc.booking.getAll.useQuery();
  const updateStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    await updateStatus.mutateAsync({
      id: bookingId,
      status: newStatus as "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
    });
  };

  const filteredBookings = statusFilter
    ? bookings?.filter((booking: Booking) => booking.status === statusFilter)
    : bookings;

  const getStatusBadgeColor = (status: string) => {
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
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Bookings</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <span className="text-sm whitespace-nowrap">Filter by status:</span>
          <Select
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading bookings...</div>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Phone</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Participants
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Dates</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings?.map((booking: Booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="whitespace-nowrap">
                          {booking.fullName}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {booking.email}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {booking.phone}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {booking.participants}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(booking.arrivalDate), "MMM d, yyyy")}{" "}
                          -{" "}
                          {format(
                            new Date(booking.departureDate),
                            "MMM d, yyyy"
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            className={getStatusBadgeColor(booking.status)}
                          >
                            {booking.status.charAt(0) +
                              booking.status.slice(1).toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Select
                            value={booking.status}
                            onValueChange={(value) =>
                              handleStatusChange(booking.id, value)
                            }
                            disabled={updateStatus.isPending}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="CONFIRMED">Confirm</SelectItem>
                              <SelectItem value="CANCELLED">Cancel</SelectItem>
                              <SelectItem value="COMPLETED">
                                Complete
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
