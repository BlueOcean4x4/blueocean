import type React from "react"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminStatus = await isAdmin()

  if (!adminStatus) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
            <nav className="space-y-2">
              <a href="/admin" className="block p-2 hover:bg-blue-50 rounded">
                Dashboard
              </a>
              <a href="/admin/bookings" className="block p-2 hover:bg-blue-50 rounded">
                Manage Bookings
              </a>
              <a href="/admin/slots" className="block p-2 hover:bg-blue-50 rounded">
                Manage Slots
              </a>
            </nav>
          </aside>
          <main className="flex-1 bg-white p-6 rounded-lg shadow-md">{children}</main>
        </div>
      </div>
    </div>
  )
}
