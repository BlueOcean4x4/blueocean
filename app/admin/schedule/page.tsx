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
import { ScheduleForm } from "@/components/admin/schedule-form";
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

export default function ManageSchedule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);

  const {
    data: schedules,
    isLoading,
    refetch,
  } = trpc.schedule.getAll.useQuery();
  const deleteSchedule = trpc.schedule.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setScheduleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (scheduleToDelete) {
      try {
        await deleteSchedule.mutateAsync(scheduleToDelete);
        setDeleteDialogOpen(false);
        setScheduleToDelete(null);
      } catch (error: any) {
        alert(error.message || "Failed to delete schedule");
      }
    }
  };

  const handleFormClose = () => {
    setIsDialogOpen(false);
    setEditingSchedule(null);
    refetch();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Schedule</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingSchedule(null)}
              className="w-full sm:w-auto"
            >
              Add New Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingSchedule ? "Edit Schedule" : "Add New Schedule"}
              </DialogTitle>
            </DialogHeader>
            <ScheduleForm
              schedule={editingSchedule || undefined}
              onClose={handleFormClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading schedules...</div>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Title</TableHead>
                    <TableHead className="whitespace-nowrap">Time</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Location
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Participants
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No schedules found
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedules?.map((schedule: Schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="whitespace-nowrap">
                          {schedule.title}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {schedule.startTime && schedule.endTime ? (
                            <>
                              {format(
                                new Date(schedule.startTime),
                                "MMM d, yyyy HH:mm"
                              )}{" "}
                              - {format(new Date(schedule.endTime), "HH:mm")}
                            </>
                          ) : (
                            "No time set"
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {schedule.location}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {schedule.currentParticipants}/
                          {schedule.maxParticipants}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            className={
                              schedule.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {schedule.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(schedule)}
                              className="p-2"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 p-2"
                              onClick={() => handleDelete(schedule.id)}
                              disabled={deleteSchedule.isPending}
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
              schedule item.
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
