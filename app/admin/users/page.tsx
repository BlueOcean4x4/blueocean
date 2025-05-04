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
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ManageUsers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    role: "USER" as "USER" | "ADMIN",
    isAdmin: false,
  });

  const { data: users, isLoading, refetch } = trpc.user.getAll.useQuery();
  const updateUser = trpc.user.update.useMutation({
    onSuccess: () => {
      refetch();
      setIsDialogOpen(false);
      setEditingUser(null);
    },
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      role: user.role,
      isAdmin: user.isAdmin,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (editingUser) {
      try {
        await updateUser.mutateAsync({
          id: editingUser.id,
          role: formData.role,
          isAdmin: formData.isAdmin,
        });
      } catch (error: any) {
        alert(error.message || "Failed to update user");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Users</h2>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Role</TableHead>
                    <TableHead className="whitespace-nowrap">Admin</TableHead>
                    <TableHead className="whitespace-nowrap">Joined</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users?.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell className="whitespace-nowrap">
                          {user.name || "N/A"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {user.email}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            className={
                              user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            className={
                              user.isAdmin
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.isAdmin ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(user.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "USER" | "ADMIN") =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isAdmin"
                checked={formData.isAdmin}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isAdmin: checked })
                }
              />
              <Label htmlFor="isAdmin">Admin Access</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
