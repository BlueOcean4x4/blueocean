"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { AccommodationForm } from "./accommodation-form";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  availableUnits: number;
  isActive: boolean;
  imageUrl?: string;
  amenities: string[];
}

export function AccommodationManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<
    string | null
  >(null);

  const { data: accommodations, refetch } =
    trpc.accommodation.getAllAdmin.useQuery();
  const deleteAccommodation = trpc.accommodation.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Accommodation deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete accommodation");
    },
  });

  const handleEdit = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setAccommodationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (accommodationToDelete) {
      await deleteAccommodation.mutateAsync({ id: accommodationToDelete });
      setDeleteDialogOpen(false);
      setAccommodationToDelete(null);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedAccommodation(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">
          Accommodation Management
        </h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto"
        >
          Add Accommodation
        </Button>
      </div>

      <div className="grid gap-4">
        {accommodations?.map((accommodation: Accommodation) => (
          <div
            key={accommodation.id}
            className="p-3 sm:p-4 border rounded-lg space-y-2"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {accommodation.imageUrl && (
                <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                  <Image
                    src={accommodation.imageUrl}
                    alt={accommodation.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {accommodation.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {accommodation.type}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(accommodation)}
                      className="flex-1 sm:flex-none"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(accommodation.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm mt-2 line-clamp-2 sm:line-clamp-none">
                  {accommodation.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">R{accommodation.price}</Badge>
                  <Badge variant="secondary">
                    Capacity: {accommodation.capacity}
                  </Badge>
                  <Badge variant="secondary">
                    Available: {accommodation.availableUnits}
                  </Badge>
                  {accommodation.isActive ? (
                    <Badge variant="default">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {accommodation.amenities.map((amenity: string) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedAccommodation
                ? "Edit Accommodation"
                : "Add Accommodation"}
            </DialogTitle>
          </DialogHeader>
          <AccommodationForm
            accommodation={selectedAccommodation || undefined}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              accommodation and remove it from our database.
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
