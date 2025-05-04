"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";

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

interface ScheduleListProps {
  initialSchedules: Schedule[];
}

export function ScheduleList({ initialSchedules }: ScheduleListProps) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const utils = trpc.useUtils();

  const deleteSchedule = trpc.schedule.delete.useMutation({
    onSuccess: () => {
      utils.schedule.getAll.invalidate();
    },
  });

  const toggleActive = trpc.schedule.update.useMutation({
    onSuccess: () => {
      utils.schedule.getAll.invalidate();
    },
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      await deleteSchedule.mutateAsync(id);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await toggleActive.mutateAsync({ id, isActive: !isActive });
  };

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold">{schedule.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleToggleActive(schedule.id, schedule.isActive)
                }
              >
                {schedule.isActive ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(schedule.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold mb-2">
                {schedule.description}
              </h3>
              <ul className="space-y-2 ml-6 list-disc text-sm">
                {schedule.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Start Time: {schedule.startTime}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Location: {schedule.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
