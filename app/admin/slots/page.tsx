"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlotForm } from "@/components/admin/slot-form";
import { Trash2, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Slot {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalCapacity: number;
  availableSpots: number;
  price: number;
  isActive: boolean;
}

export default function ManageSlots() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<string | null>(null);

  const { data: slots, isLoading, refetch } = trpc.slot.getAll.useQuery();
  const deleteSlot = trpc.slot.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleEdit = (slot: Slot) => {
    setEditingSlot(slot);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSlotToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (slotToDelete) {
      try {
        await deleteSlot.mutateAsync({ id: slotToDelete });
        setDeleteDialogOpen(false);
        setSlotToDelete(null);
      } catch (error: any) {
        alert(error.message || "Failed to delete slot");
      }
    }
  };

  const handleFormClose = () => {
    setIsDialogOpen(false);
    setEditingSlot(null);
    refetch();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Booking Slots</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingSlot(null)}
              className="w-full sm:w-auto"
            >
              Add New Slot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingSlot ? "Edit Slot" : "Add New Slot"}
              </DialogTitle>
            </DialogHeader>
            <SlotForm slot={editingSlot} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading slots...</div>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Dates</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Capacity
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Available
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Price</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
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
                    slots?.map((slot: Slot) => (
                      <TableRow key={slot.id}>
                        <TableCell className="whitespace-nowrap">
                          {slot.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(slot.startDate), "MMM d, yyyy")} -{" "}
                          {format(new Date(slot.endDate), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {slot.totalCapacity}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {slot.availableSpots}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          R{slot.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            className={
                              slot.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {slot.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(slot)}
                              className="p-2"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 p-2"
                              onClick={() => handleDelete(slot.id)}
                              disabled={deleteSlot.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              booking slot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
