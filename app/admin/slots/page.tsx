"use client"

import { useState } from "react"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SlotForm } from "@/components/admin/slot-form"

export default function ManageSlots() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<any>(null)

  const { data: slots, isLoading, refetch } = trpc.slot.getAll.useQuery()
  const deleteSlot = trpc.slot.delete.useMutation({
    onSuccess: () => refetch(),
  })

  const handleEdit = (slot: any) => {
    setEditingSlot(slot)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this slot? This action cannot be undone.")) {
      try {
        await deleteSlot.mutateAsync({ id })
      } catch (error: any) {
        alert(error.message || "Failed to delete slot")
      }
    }
  }

  const handleFormClose = () => {
    setIsDialogOpen(false)
    setEditingSlot(null)
    refetch()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Booking Slots</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSlot(null)}>Add New Slot</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingSlot ? "Edit Slot" : "Add New Slot"}</DialogTitle>
            </DialogHeader>
            <SlotForm slot={editingSlot} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading slots...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No booking slots found
                  </TableCell>
                </TableRow>
              ) : (
                slots?.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.name}</TableCell>
                    <TableCell>
                      {format(new Date(slot.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(slot.endDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{slot.totalCapacity}</TableCell>
                    <TableCell>{slot.availableSpots}</TableCell>
                    <TableCell>R{slot.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={slot.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {slot.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(slot)}>
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(slot.id)}
                          disabled={deleteSlot.isLoading}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
