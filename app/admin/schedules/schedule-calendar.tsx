"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Schedule } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScheduleForm } from "./schedule-form";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, List } from "lucide-react";
import { format } from "date-fns";

interface ScheduleCalendarProps {
  schedules: Schedule[];
}

export function ScheduleCalendar({ schedules }: ScheduleCalendarProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("Received schedules:", schedules); // Debug log

    const formattedEvents = schedules.map((schedule) => {
      // Ensure we're creating a valid date object
      const startDate = new Date(schedule.date);
      console.log("Processing schedule:", schedule.title, "Date:", startDate); // Debug log

      return {
        id: schedule.id,
        title: schedule.title,
        start: startDate,
        end: startDate,
        allDay: true, // Make events show as all-day events
        extendedProps: {
          description: schedule.description,
          location: schedule.location,
          startTime: schedule.startTime,
          activities: schedule.activities,
        },
      };
    });

    console.log("Formatted events:", formattedEvents); // Debug log
    setEvents(formattedEvents);
  }, [schedules]);

  const handleEventClick = (info: any) => {
    const schedule = schedules.find((s) => s.id === info.event.id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsDialogOpen(true);
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedSchedule(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total schedules: {schedules.length}
        </p>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-semibold text-sm">{eventInfo.event.title}</div>
            <div className="text-xs text-gray-600">
              {eventInfo.event.extendedProps.startTime}
            </div>
          </div>
        )}
        eventClick={handleEventClick}
        height="auto"
      />

      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Schedule" : "Schedule Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedSchedule && !isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {selectedSchedule.title}
                </h3>
                <p className="text-gray-600">{selectedSchedule.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(selectedSchedule.date), "PPP")}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Start Time: {selectedSchedule.startTime}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Location: {selectedSchedule.location}</span>
                </div>

                {selectedSchedule.activities.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <List className="h-4 w-4" />
                      <span className="font-medium">Activities:</span>
                    </div>
                    <ul className="list-disc list-inside ml-6 text-gray-600">
                      {selectedSchedule.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  Edit Schedule
                </Button>
              </div>
            </div>
          ) : (
            selectedSchedule && (
              <ScheduleForm
                schedule={selectedSchedule}
                onSuccess={() => {
                  handleClose();
                }}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
