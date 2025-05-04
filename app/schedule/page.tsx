"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc/client";

interface Schedule {
  id: string;
  date: Date;
  title: string;
  description: string;
  startTime: string;
  location: string;
  activities: string[];
  isActive: boolean;
}

export default function SchedulePage() {
  const { data: schedules } = trpc.schedule.getAll.useQuery();

  // if (!schedules) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Event Schedule
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            4 Days / 4 Nights of Non-Stop Off-Road Adventure in Inhambane,
            Mozambique!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-12">
          {schedules && schedules.length > 0 ? (  
            schedules.map((schedule: Schedule) => (
              <div
                key={schedule.id}
              className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-blue-600"
            >
              <div className="flex items-center gap-3 mb-3 md:mb-6">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  {schedule.title}
                </h2>
              </div>
              <div className="space-y-3 md:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                    {schedule.description}
                  </h3>
                  <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                    {schedule.activities.map(
                      (activity: string, index: number) => (
                        <li key={index}>{activity}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span>Start Time: {schedule.startTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span>Location: {schedule.location}</span>
                </div>
                </div>
              </div>
            ))
          ) : (
            <div>No schedules found</div>
          )}
        </div>

        <div className="mt-6 md:mt-12 text-center">
          <Link href="/#booking">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Book Your Spot Now
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-lg md:text-xl font-bold">
                Blue Ocean 4x4 Rally
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2 text-sm md:text-base">
                © 2025 Blue Ocean 4x4 Beach & Bush Rally
              </p>
              <p className="text-sm md:text-base">Inhambane, Mozambique</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
