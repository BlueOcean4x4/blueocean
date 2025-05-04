import type React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Admin Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <aside className="w-full md:w-64 bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <nav className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2">
              <Link
                href="/admin"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/bookings"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Manage Bookings
              </Link>
              <Link
                href="/admin/slots"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Event Packages
              </Link>
              <Link
                href="/admin/accommodation"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Accommodation
              </Link>
              <Link
                href="/admin/sponsors"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Sponsors
              </Link>
              <Link
                href="/admin/schedule"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Schedule
              </Link>
              <Link
                href="/admin/vehicle-types"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Vehicle Types
              </Link>
              <Link
                href="/admin/users"
                className="block p-2 text-sm sm:text-base hover:bg-blue-50 rounded text-center md:text-left"
              >
                Users
              </Link>

            </nav>
          </aside>
          <main className="flex-1 bg-white p-3 sm:p-6 rounded-lg shadow-md">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
