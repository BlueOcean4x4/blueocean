"use client";

import { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ScheduleForm() {
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState("");

  const utils = trpc.useUtils();
  const createSchedule = trpc.schedule.create.useMutation({
    onSuccess: () => {
      utils.schedule.getAll.invalidate();
      resetForm();
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

    await createSchedule.mutateAsync({
      date,
      title,
      description,
      startTime,
      location,
      activities,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Create New Schedule</h2>

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

      <Button type="submit" className="w-full">
        Create Schedule
      </Button>
    </form>
  );
}
