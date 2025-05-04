"use client";

import type React from "react";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface Accommodation {
  id: string;
  name: string;
  type: string;
  description?: string;
  price: number;
  capacity: number;
  availableUnits: number;
  amenities: string[];
  isActive: boolean;
  imageUrl?: string;
}

interface AccommodationFormProps {
  accommodation?: Accommodation;
  onClose: () => void;
}

export function AccommodationForm({
  accommodation,
  onClose,
}: AccommodationFormProps) {
  const [formData, setFormData] = useState({
    name: accommodation?.name || "",
    type: accommodation?.type || "",
    description: accommodation?.description || "",
    price: accommodation?.price || 0,
    capacity: accommodation?.capacity || 0,
    availableUnits: accommodation?.availableUnits || 0,
    amenities: accommodation?.amenities || ([] as string[]),
    isActive: accommodation?.isActive ?? true,
    imageUrl: accommodation?.imageUrl || "",
  });
  const [newAmenity, setNewAmenity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createAccommodation = trpc.accommodation.create.useMutation();
  const updateAccommodation = trpc.accommodation.update.useMutation();

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

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()],
      });
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((a: string) => a !== amenity),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your image hosting service (e.g., Cloudinary, AWS S3, etc.)
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
      if (accommodation) {
        await updateAccommodation.mutateAsync({
          id: accommodation.id,
          name: formData.name,
          type: formData.type,
          description: formData.description,
          price: Number(formData.price),
          capacity: Number(formData.capacity),
          availableUnits: Number(formData.availableUnits),
          amenities: formData.amenities,
          isActive: formData.isActive,
          imageUrl: formData.imageUrl,
        });
      } else {
        await createAccommodation.mutateAsync({
          name: formData.name,
          type: formData.type,
          description: formData.description,
          price: Number(formData.price),
          capacity: Number(formData.capacity),
          availableUnits: Number(formData.availableUnits),
          amenities: formData.amenities,
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
        <Label>Accommodation Image</Label>
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            name="type"
            value={formData.type}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availableUnits">Available Units</Label>
          <Input
            id="availableUnits"
            name="availableUnits"
            type="number"
            min="0"
            value={formData.availableUnits}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="flex gap-2">
          <Input
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="Add an amenity"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddAmenity();
              }
            }}
          />
          <Button type="button" onClick={handleAddAmenity}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.amenities.map((amenity: string) => (
            <Badge
              key={amenity}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {amenity}
              <button
                type="button"
                onClick={() => handleRemoveAmenity(amenity)}
                className="hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
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
          disabled={
            createAccommodation.isPending ||
            updateAccommodation.isPending ||
            isUploading
          }
        >
          {accommodation ? "Update Accommodation" : "Create Accommodation"}
        </Button>
      </div>
    </form>
  );
}
