"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the click from immediately closing the menu
    setIsOpen(!isOpen)
  }

  const menuItemClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={menuItemClick}></div>}

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white shadow-lg z-50 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-2 space-y-0 divide-y divide-gray-100">
          <Link
            href="/"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={menuItemClick}
          >
            Home
          </Link>
          <Link
            href="/schedule"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={menuItemClick}
          >
            Schedule
          </Link>
          <Link
            href="/accommodation"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={menuItemClick}
          >
            Accommodation
          </Link>
          <Link
            href="/sponsors"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={menuItemClick}
          >
            Sponsors
          </Link>
          <Link
            href="/#booking"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={menuItemClick}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
