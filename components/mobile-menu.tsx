"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from immediately closing the menu
    setIsOpen(!isOpen);
  };

  const menuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className="h-10 w-10 p-0"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={menuItemClick}
        ></div>
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white shadow-lg z-50 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col divide-y divide-gray-100">
          <Link
            href="/"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={menuItemClick}
          >
            Home
          </Link>
          <Link
            href="/schedule"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={menuItemClick}
          >
            Schedule
          </Link>
          <Link
            href="/sponsors"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={menuItemClick}
          >
            Sponsors
          </Link>
          <Link
            href="mailto:blueoceanmoz@icloud.com"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={menuItemClick}
          >
            Book Your Spot
          </Link>

          <div className="border-t border-gray-100">
            {/* {isSignedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={menuItemClick}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </div>
                </Link>
                {user?.publicMetadata.isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={menuItemClick}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Admin Dashboard</span>
                    </div>
                  </Link>
                )}
                <Link
                  href="/sign-out"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={menuItemClick}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={menuItemClick}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={menuItemClick}
                >
                  Sign Up
                </Link>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
