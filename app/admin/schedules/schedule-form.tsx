"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Schedule } from "@prisma/client";

interface ScheduleFormProps {
  schedule?: Schedule;
  onSuccess?: () => void;
}

export function ScheduleForm({ schedule, onSuccess }: ScheduleFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    schedule?.date ? new Date(schedule.date) : undefined
  );
  const [title, setTitle] = useState(schedule?.title || "");
  const [description, setDescription] = useState(schedule?.description || "");
  const [startTime, setStartTime] = useState(schedule?.startTime || "");
  const [location, setLocation] = useState(schedule?.location || "");
  const [activities, setActivities] = useState<string[]>(
    schedule?.activities || []
  );
  const [newActivity, setNewActivity] = useState("");

  useEffect(() => {
    if (schedule) {
      setIsOpen(true);
    }
  }, [schedule]);

  const utils = trpc.useUtils();
  const createSchedule = trpc.schedule.create.useMutation({
    onSuccess: () => {
      utils.schedule.getAll.invalidate();
      resetForm();
      setIsOpen(false);
      onSuccess?.();
    },
  });

  const updateSchedule = trpc.schedule.update.useMutation({
    onSuccess: () => {
      utils.schedule.getAll.invalidate();
      resetForm();
      setIsOpen(false);
      onSuccess?.();
    },
  });

  const resetForm = () => {
    setDate(undefined);
    setTitle("");
    setDescription("");
    setStartTime("");
    setLocation("");
    setActivities([]);
    setNewActivity("");
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    // Create a new Date object with the selected date and time
    const scheduleDate = new Date(date);
    const [hours, minutes] = startTime.split(":").map(Number);
    scheduleDate.setHours(hours, minutes, 0, 0);

    const scheduleData = {
      date: scheduleDate.toISOString(), // Convert to string for API
      title,
      description,
      startTime,
      location,
      activities,
    };

    console.log("Submitting schedule data:", {
      ...scheduleData,
      date: scheduleDate.toISOString(), // Log as ISO string for debugging
    });

    try {
      if (schedule) {
        await updateSchedule.mutateAsync({
          id: schedule.id,
          ...scheduleData,
        });
      } else {
        await createSchedule.mutateAsync(scheduleData);
      }
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!schedule && (
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create New Schedule
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {schedule ? "Edit Schedule" : "Create New Schedule"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Activities</label>
            <div className="flex gap-2">
              <Input
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="Add an activity"
              />
              <Button type="button" onClick={handleAddActivity}>
                Add
              </Button>
            </div>
            <ul className="space-y-2 mt-2">
              {activities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{activity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveActivity(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSchedule.isPending || updateSchedule.isPending}
            >
              {schedule ? "Update Schedule" : "Create Schedule"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
