"use client";

import { Suspense } from "react";
import { trpc } from "@/lib/trpc/client";
import { ScheduleList } from "./schedule-list";
import { ScheduleForm } from "./schedule-form";
import { ScheduleCalendar } from "./schedule-calendar";

export default function SchedulesPage() {
  const {
    data: schedules = [],
    isLoading,
    error,
  } = trpc.schedule.getAll.useQuery();

  console.log("Schedules data:", schedules); // Debug log
  console.log("Loading state:", isLoading); // Debug log
  console.log("Error state:", error); // Debug log

  if (isLoading) {
    return <div>Loading schedules...</div>;
  }

  if (error) {
    return <div>Error loading schedules: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl w-96 font-bold">Manage Schedules</h1>
        <ScheduleForm />
      </div>

        <div className="flex flex-col gap-4">
          <div className="mb-8">
            <Suspense fallback={<div>Loading calendar...</div>}>
              <ScheduleCalendar schedules={schedules} />
            </Suspense>
          </div>

          <Suspense fallback={<div>Loading schedules...</div>}>
            <ScheduleList initialSchedules={schedules} />
          </Suspense>
        </div>
    </div>
  );
}
