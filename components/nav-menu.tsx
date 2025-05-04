"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavMenu() {
  const { user, isSignedIn } = useUser();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/schedule", label: "Schedule" },
    { href: "/accommodation", label: "Accommodation" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/#booking", label: "Book Now" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            {item.label}
          </Link>
        ))}
        {isSignedIn ? (
          <>
            <Link
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </div>
            </Link>
            {user?.publicMetadata.isAdmin && (
              <Link
                href="/admin"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
            <Link
              href="/sign-out"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4">
                {isSignedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="block text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span>My Profile</span>
                      </div>
                    </Link>
                    {user?.publicMetadata.isAdmin && (
                      <Link
                        href="/admin"
                        className="block text-base font-medium text-gray-700 hover:text-blue-600 mt-4"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          <span>Admin Dashboard</span>
                        </div>
                      </Link>
                    )}
                    <Link
                      href="/sign-out"
                      className="block text-base font-medium text-gray-700 hover:text-blue-600 mt-4"
                    >
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block text-base font-medium text-gray-700 hover:text-blue-600 mt-4"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
