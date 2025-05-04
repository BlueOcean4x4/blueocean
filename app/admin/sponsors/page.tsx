"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Upload, Check, X } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

interface Sponsor {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  amount: number;
  isActive: boolean;
}

interface SponsorRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  website?: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
}

export default function SponsorsPage() {
  const [activeTab, setActiveTab] = useState("sponsors");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRequestDialogOpen, setDeleteRequestDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    websiteUrl: string;
    logoUrl: string;
    tier: "GOLD" | "SILVER" | "BRONZE";
    amount: number;
    isActive: boolean;
  }>({
    name: "",
    description: "",
    websiteUrl: "",
    logoUrl: "",
    tier: "BRONZE",
    amount: 0,
    isActive: true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: sponsors, isLoading, refetch } = trpc.sponsor.getAll.useQuery();
  const createSponsor = trpc.sponsor.create.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormOpen(false);
      resetForm();
    },
  });
  const updateSponsor = trpc.sponsor.update.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormOpen(false);
      resetForm();
    },
  });
  const deleteSponsor = trpc.sponsor.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const { data: sponsorRequests, refetch: refetchRequests } =
    trpc.sponsorRequest.getAll.useQuery();
  const updateRequestStatus = trpc.sponsorRequest.updateStatus.useMutation({
    onSuccess: () => refetchRequests(),
  });
  const deleteRequest = trpc.sponsorRequest.delete.useMutation({
    onSuccess: () => refetchRequests(),
  });

  const { data: totalAmount } = trpc.sponsor.getTotalAmount.useQuery();

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      websiteUrl: "",
      logoUrl: "",
      tier: "BRONZE",
      amount: 0,
      isActive: true,
    });
    setSelectedSponsor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSponsor) {
      await updateSponsor.mutateAsync({
        id: selectedSponsor.id,
        ...formData,
      });
    } else {
      await createSponsor.mutateAsync(formData);
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      description: sponsor.description,
      websiteUrl: sponsor.websiteUrl,
      logoUrl: sponsor.logoUrl,
      tier: sponsor.tier,
      amount: sponsor.amount,
      isActive: sponsor.isActive,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleUpdateRequestStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    await updateRequestStatus.mutateAsync({ id, status });
  };

  const handleDeleteRequest = async (id: string) => {
    setItemToDelete(id);
    setDeleteRequestDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteSponsor.mutateAsync({ id: itemToDelete });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const confirmDeleteRequest = async () => {
    if (itemToDelete) {
      await deleteRequest.mutateAsync({ id: itemToDelete });
      setDeleteRequestDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "GOLD":
        return "bg-yellow-100 text-yellow-800";
      case "SILVER":
        return "bg-gray-100 text-gray-800";
      case "BRONZE":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        logoUrl: data.url,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Manage Sponsors</h2>
          {totalAmount !== undefined && (
            <p className="text-sm text-gray-600 mt-1">
              Total Sponsorship: ${totalAmount.toLocaleString()}
            </p>
          )}
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sponsor
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="sponsors" className="flex-1 sm:flex-none">
            Current Sponsors
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex-1 sm:flex-none">
            Sponsor Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sponsors">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="w-[95vw] sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedSponsor ? "Edit Sponsor" : "Add New Sponsor"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        websiteUrl: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <select
                    id="tier"
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tier: e.target.value as "GOLD" | "SILVER" | "BRONZE",
                      }))
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="BRONZE">Bronze</option>
                    <option value="SILVER">Silver</option>
                    <option value="GOLD">Gold</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: parseFloat(e.target.value) || 0,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    {formData.logoUrl && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={formData.logoUrl}
                          alt="Logo preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isActive: checked }))
                    }
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isUploading}>
                    {selectedSponsor ? "Update" : "Create"} Sponsor
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {isLoading ? (
            <div className="text-center py-8">Loading sponsors...</div>
          ) : (
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          Logo
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Name
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Tier
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Amount
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Status
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sponsors?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No sponsors found
                          </TableCell>
                        </TableRow>
                      ) : (
                        sponsors?.map((sponsor: Sponsor) => (
                          <TableRow key={sponsor.id}>
                            <TableCell className="whitespace-nowrap">
                              {sponsor.logoUrl && (
                                <div className="relative w-12 h-12">
                                  <Image
                                    src={sponsor.logoUrl}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {sponsor.name}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Badge
                                className={getTierBadgeColor(sponsor.tier)}
                              >
                                {sponsor.tier}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              ${sponsor.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Badge
                                variant={
                                  sponsor.isActive ? "default" : "secondary"
                                }
                              >
                                {sponsor.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(sponsor)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDelete(sponsor.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="requests">
          {sponsorRequests?.length === 0 ? (
            <div className="text-center py-8">No pending requests</div>
          ) : (
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          Company
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Contact
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Status
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sponsorRequests?.map((request: SponsorRequest) => (
                        <TableRow key={request.id}>
                          <TableCell className="whitespace-nowrap">
                            <div>
                              <div className="font-medium">
                                {request.company}
                              </div>
                              {request.website && (
                                <a
                                  href={request.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  {request.website}
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div>
                              <div>{request.name}</div>
                              <div className="text-sm text-gray-500">
                                {request.email}
                              </div>
                              {request.phone && (
                                <div className="text-sm text-gray-500">
                                  {request.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge
                              variant={
                                request.status === "PENDING"
                                  ? "secondary"
                                  : request.status === "APPROVED"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex gap-2">
                              {request.status === "PENDING" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      handleUpdateRequestStatus(
                                        request.id,
                                        "APPROVED"
                                      )
                                    }
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      handleUpdateRequestStatus(
                                        request.id,
                                        "REJECTED"
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteRequest(request.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              sponsor and remove it from our database.
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

      <AlertDialog
        open={deleteRequestDialogOpen}
        onOpenChange={setDeleteRequestDialogOpen}
      >
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              sponsor request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteRequest}
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
