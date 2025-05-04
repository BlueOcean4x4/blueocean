"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"

export function BookingForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    participants: 1,
    vehicleTypes: [] as string[],
    vehicleCount: 1,
    accommodation: "",
    arrivalDate: "",
    departureDate: "",
    specialRequests: "",
    slotId: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: slots, isLoading: slotsLoading } = trpc.slot.getActive.useQuery()
  const createBooking = trpc.booking.create.useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    })
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        vehicleTypes: [...formData.vehicleTypes, value],
      })
    } else {
      setFormData({
        ...formData,
        vehicleTypes: formData.vehicleTypes.filter((type) => type !== value),
      })
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      accommodation: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await createBooking.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        participants: Number(formData.participants),
        vehicleTypes: formData.vehicleTypes,
        vehicleCount: Number(formData.vehicleCount),
        accommodation: formData.accommodation,
        arrivalDate: new Date(formData.arrivalDate),
        departureDate: new Date(formData.departureDate),
        specialRequests: formData.specialRequests,
        slotId: formData.slotId,
      })

      router.push("/success")
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting your booking")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm md:text-base">{error}</div>}

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
              onCheckedChange={(checked) => handleCheckboxChange("Quad Bike", checked === true)}
            />
            <Label htmlFor="quadBike" className="text-sm md:text-base">
              Quad Bike
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sideBySide"
              checked={formData.vehicleTypes.includes("Side-by-Side")}
              onCheckedChange={(checked) => handleCheckboxChange("Side-by-Side", checked === true)}
            />
            <Label htmlFor="sideBySide" className="text-sm md:text-base">
              Side-by-Side
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="4x4Car"
              checked={formData.vehicleTypes.includes("4x4 Car")}
              onCheckedChange={(checked) => handleCheckboxChange("4x4 Car", checked === true)}
            />
            <Label htmlFor="4x4Car" className="text-sm md:text-base">
              4x4 Car
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other"
              checked={formData.vehicleTypes.includes("Other")}
              onCheckedChange={(checked) => handleCheckboxChange("Other", checked === true)}
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
        <Label className="text-sm font-medium">Accommodation Preference</Label>
        <RadioGroup value={formData.accommodation} onValueChange={handleRadioChange}>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue-ocean" id="blue-ocean" />
              <Label htmlFor="blue-ocean" className="text-sm md:text-base">
                Blue Ocean Lodging (R1,250 per person per night)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="island-rock" id="island-rock" />
              <Label htmlFor="island-rock" className="text-sm md:text-base">
                Island Rock Lapa Houses (R850 per lapa per night)
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="slotId" className="text-sm font-medium">
          Event Slot
        </Label>
        <select
          id="slotId"
          name="slotId"
          value={formData.slotId}
          onChange={handleChange}
          className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-md text-sm md:text-base"
          required
        >
          <option value="">Select an event slot</option>
          {slotsLoading ? (
            <option disabled>Loading slots...</option>
          ) : (
            slots?.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.name} - {format(new Date(slot.startDate), "MMM d")} to{" "}
                {format(new Date(slot.endDate), "MMM d, yyyy")} ({slot.availableSpots} spots left)
              </option>
            ))
          )}
        </select>
      </div>

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
  )
}
