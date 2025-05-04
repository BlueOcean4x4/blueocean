"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import type { BookingSlot } from "@/lib/db";

export function BookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    participants: 1,
    vehicleTypes: [] as string[],
    vehicleCount: 1,
    arrivalDate: "",
    departureDate: "",
    specialRequests: "",
    slotIds: [] as string[],
    accommodation: "none",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: slots, isLoading: slotsLoading } =
    trpc.slot.getActive.useQuery();
  const createBooking = trpc.booking.create.useMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        vehicleTypes: [...formData.vehicleTypes, value],
      });
    } else {
      setFormData({
        ...formData,
        vehicleTypes: formData.vehicleTypes.filter((type) => type !== value),
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      accommodation: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (formData.slotIds.length === 0) {
      setError("Please select at least one event package");
      setIsSubmitting(false);
      return;
    }

    try {
      await createBooking.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        participants: Number(formData.participants),
        vehicleTypes: formData.vehicleTypes,
        vehicleCount: Number(formData.vehicleCount),
        accommodation: formData.accommodation,
        arrivalDate: new Date(formData.arrivalDate + "T00:00:00"),
        departureDate: new Date(formData.departureDate + "T00:00:00"),
        specialRequests: formData.specialRequests,
        slotIds: formData.slotIds,
      });

      router.push("/success");
    } catch (err: any) {
      setError(
        err.message || "An error occurred while submitting your booking"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm md:text-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="participants" className="text-sm font-medium">
            Number of Participants
          </Label>
          <Input
            id="participants"
            name="participants"
            type="number"
            min="1"
            value={formData.participants}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label className="text-sm font-medium">Vehicle Type</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="quadBike"
              checked={formData.vehicleTypes.includes("Quad Bike")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("Quad Bike", checked === true)
              }
            />
            <Label htmlFor="quadBike" className="text-sm md:text-base">
              Quad Bike
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sideBySide"
              checked={formData.vehicleTypes.includes("Side-by-Side")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("Side-by-Side", checked === true)
              }
            />
            <Label htmlFor="sideBySide" className="text-sm md:text-base">
              Side-by-Side
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="4x4Car"
              checked={formData.vehicleTypes.includes("4x4 Car")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("4x4 Car", checked === true)
              }
            />
            <Label htmlFor="4x4Car" className="text-sm md:text-base">
              4x4 Car
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other"
              checked={formData.vehicleTypes.includes("Other")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("Other", checked === true)
              }
            />
            <Label htmlFor="other" className="text-sm md:text-base">
              Other
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="vehicleCount" className="text-sm font-medium">
          Number of Vehicles
        </Label>
        <Input
          id="vehicleCount"
          name="vehicleCount"
          type="number"
          min="1"
          value={formData.vehicleCount}
          onChange={handleChange}
          className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
          required
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label className="text-sm font-medium">Event Packages</Label>
        <div className="space-y-4">
          {slotsLoading ? (
            <p>Loading packages...</p>
          ) : (
            slots?.map((slot: BookingSlot) => (
              <div
                key={slot.id}
                className="flex items-start space-x-3 p-3 border rounded-md"
              >
                <Checkbox
                  id={`slot-${slot.id}`}
                  checked={formData.slotIds.includes(slot.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        slotIds: [...formData.slotIds, slot.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        slotIds: formData.slotIds.filter(
                          (id) => id !== slot.id
                        ),
                      });
                    }
                  }}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor={`slot-${slot.id}`}
                    className="text-sm md:text-base font-medium"
                  >
                    {slot.name}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {format(new Date(slot.startDate), "MMM d")} to{" "}
                    {format(new Date(slot.endDate), "MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: R{slot.price.toFixed(2)} per person
                  </p>
                  <p className="text-sm text-gray-600">
                    Available spots: {slot.availableSpots}
                  </p>
                  {slot.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {slot.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {formData.slotIds.length > 0 && (
        <div className="space-y-1 md:space-y-2">
          <Label className="text-sm font-medium">Accommodation</Label>
          <RadioGroup
            value={formData.accommodation}
            onValueChange={handleRadioChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="text-sm md:text-base">
                No accommodation needed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="included" id="included" />
              <Label htmlFor="included" className="text-sm md:text-base">
                Include accommodation (if available)
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="arrivalDate" className="text-sm font-medium">
            Arrival Date
          </Label>
          <Input
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            value={formData.arrivalDate}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="departureDate" className="text-sm font-medium">
            Departure Date
          </Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="specialRequests" className="text-sm font-medium">
          Special Requests or Comments
        </Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 md:py-6 text-sm md:text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          "Submit Booking Request"
        )}
      </Button>
    </form>
  );
}
