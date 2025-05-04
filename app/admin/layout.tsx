import type React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Admin layout - Starting auth check");
  const session = await auth();
  console.log("Admin layout - Session:", session);

  if (!session?.userId) {
    console.log("Admin layout - No user ID, redirecting to home");
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: session.userId,
    },
  });
  console.log("Admin layout - User:", user);

  if (!user?.isAdmin) {
    console.log("Admin layout - Not admin, redirecting to home");
    redirect("/");
  }

  console.log("Admin layout - Admin access granted");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="bg-white flex flex-col md:flex-row gap-0 md:gap-2 rounded-lg shadow-md overflow-hidden">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Admin Dashboard
        </h1>
            <AdminNav />
          </div>
          <main className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
