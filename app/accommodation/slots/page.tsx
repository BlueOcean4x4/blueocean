"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SlotsPage() {
  const { data: slots, isLoading: slotsLoading } =
    trpc.slot.getActive.useQuery();

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Available Packages
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Book your accommodation package for the Blue Ocean 4x4 Beach & Bush
            Rally
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {slotsLoading ? (
              <div className="col-span-full text-center py-8">
                Loading available packages...
              </div>
            ) : slots?.length === 0 ? (
              <div className="col-span-full text-center py-8">
                No packages currently available
              </div>
            ) : (
              slots?.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">
                        {format(new Date(slot.startDate), "MMM d")} -{" "}
                        {format(new Date(slot.endDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{slot.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {slot.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-blue-600">
                        R{slot.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {slot.availableSpots} spots left
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/accommodation">
              <Button variant="outline" className="mr-4">
                Back to Accommodation
              </Button>
            </Link>
            <Link href="/#booking">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
