"use client";

import { Suspense } from "react";
import { trpc } from "@/lib/trpc/client";
import { ScheduleList } from "./schedule-list";
import { ScheduleForm } from "./schedule-form";

export default function SchedulesPage() {
  const { data: schedules = [] } = trpc.schedule.getAll.useQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Schedules</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading schedules...</div>}>
            <ScheduleList initialSchedules={schedules} />
          </Suspense>
        </div>

        <div>
          <ScheduleForm />
        </div>
      </div>
    </div>
  );
}
