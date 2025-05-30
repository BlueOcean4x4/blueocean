"use client";

import type React from "react";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import Image from "next/image";

interface SlotFormProps {
  slot?: any;
  onClose: () => void;
}

export function SlotForm({ slot, onClose }: SlotFormProps) {
  const [formData, setFormData] = useState({
    name: slot?.name || "",
    startDate: slot?.startDate
      ? format(new Date(slot.startDate), "yyyy-MM-dd")
      : "",
    endDate: slot?.endDate ? format(new Date(slot.endDate), "yyyy-MM-dd") : "",
    totalCapacity: slot?.totalCapacity || 0,
    availableSpots: slot?.availableSpots || 0,
    price: slot?.price || 0,
    description: slot?.description || "",
    isActive: slot?.isActive ?? true,
    imageUrl: slot?.imageUrl || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createSlot = trpc.slot.create.useMutation();
  const updateSlot = trpc.slot.update.useMutation();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (slot) {
        await updateSlot.mutateAsync({
          id: slot.id,
          name: formData.name,
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
          totalCapacity: Number(formData.totalCapacity),
          availableSpots: Number(formData.availableSpots),
          price: Number(formData.price),
          description: formData.description,
          isActive: formData.isActive,
          imageUrl: formData.imageUrl,
        });
      } else {
        await createSlot.mutateAsync({
          name: formData.name,
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
          totalCapacity: Number(formData.totalCapacity),
          availableSpots: Number(formData.availableSpots),
          price: Number(formData.price),
          description: formData.description,
          isActive: formData.isActive,
          imageUrl: formData.imageUrl,
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
        <Label>Slot Image</Label>
        <div className="flex items-center gap-4">
          {formData.imageUrl && (
            <div className="relative w-32 h-32">
              <Image
                src={formData.imageUrl}
                alt={formData.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
              id="image-upload"
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Slot Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (R)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalCapacity">Total Capacity</Label>
          <Input
            id="totalCapacity"
            name="totalCapacity"
            type="number"
            min="1"
            value={formData.totalCapacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availableSpots">Available Spots</Label>
          <Input
            id="availableSpots"
            name="availableSpots"
            type="number"
            min="0"
            value={formData.availableSpots}
            onChange={handleChange}
            required
          />
        </div>
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
          disabled={createSlot.isPending || updateSlot.isPending || isUploading}
        >
          {slot ? "Update Slot" : "Create Slot"}
        </Button>
      </div>
    </form>
  );
}
