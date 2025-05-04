"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/bookings", label: "Manage Bookings" },
  { href: "/admin/slots", label: "Event Packages" },
  { href: "/admin/accommodation", label: "Accommodation" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/schedules", label: "Schedule" },
  { href: "/admin/vehicle-types", label: "Vehicle Types" },
  { href: "/admin/users", label: "Users" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap justify-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm sm:text-base border-b-2 transition-colors relative",
              isActive
                ? "border-blue-600 text-blue-700 font-medium"
                : "border-transparent hover:border-gray-300 text-gray-700 hover:text-gray-900"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
