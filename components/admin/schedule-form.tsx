"use client";

import type React from "react";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Schedule {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
}

interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

export function ScheduleForm({ schedule, onClose }: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    title: schedule?.title || "",
    description: schedule?.description || "",
    startTime:
      schedule?.startTime && !isNaN(new Date(schedule.startTime).getTime())
        ? new Date(schedule.startTime).toISOString().slice(0, 16)
        : "",
    endTime:
      schedule?.endTime && !isNaN(new Date(schedule.endTime).getTime())
        ? new Date(schedule.endTime).toISOString().slice(0, 16)
        : "",
    location: schedule?.location || "",
    maxParticipants: schedule?.maxParticipants || 0,
    currentParticipants: schedule?.currentParticipants || 0,
    isActive: schedule?.isActive ?? true,
  });
  const [error, setError] = useState<string | null>(null);

  const createSchedule = trpc.schedule.create.useMutation();
  const updateSchedule = trpc.schedule.update.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (schedule) {
        await updateSchedule.mutateAsync({
          id: schedule.id,
          title: formData.title,
          description: formData.description,
          startTime: new Date(formData.startTime).toISOString(),
          date: formData.endTime,
          location: formData.location,
          activities: [],
          isActive: formData.isActive,
        });
      } else {
        await createSchedule.mutateAsync({
          title: formData.title,
          description: formData.description,
          startTime: new Date(formData.startTime).toISOString(),
          date: formData.endTime,
          location: formData.location,
          activities: [],
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
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
  );
}
