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

interface VehicleType {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
}

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
  const { data: vehicleTypes, isLoading: vehicleTypesLoading } =
    trpc.vehicleType.getActive.useQuery();
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

  const handleSlotChange = (slotId: string, checked: boolean) => {
    if (checked) {
      const selectedSlot = slots?.find(
        (slot: BookingSlot) => slot.id === slotId
      );
      if (selectedSlot) {
        setFormData({
          ...formData,
          slotIds: [...formData.slotIds, slotId],
          arrivalDate: format(new Date(selectedSlot.startDate), "yyyy-MM-dd"),
          departureDate: format(new Date(selectedSlot.endDate), "yyyy-MM-dd"),
        });
      }
    } else {
      setFormData({
        ...formData,
        slotIds: formData.slotIds.filter((id) => id !== slotId),
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
        arrivalDate: formData.arrivalDate + "T00:00:00",
        departureDate: formData.departureDate + "T00:00:00",
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
          {vehicleTypesLoading ? (
            <p>Loading vehicle types...</p>
          ) : (
            vehicleTypes?.map((type: VehicleType) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={formData.vehicleTypes.includes(type.name)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(type.name, checked === true)
                  }
                />
                <Label htmlFor={type.id} className="text-sm md:text-base">
                  {type.name}
                </Label>
              </div>
            ))
          )}
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
        <div className="space-y-4 h-[75vh] overflow-y-auto">
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
                  onCheckedChange={(checked) =>
                    handleSlotChange(slot.id, checked === true)
                  }
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
