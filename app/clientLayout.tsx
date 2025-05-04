"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Mountain, Menu, X } from "lucide-react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Mountain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">
                Blue Ocean 4x4
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/schedule"
              className="text-gray-700 hover:text-blue-600"
            >
              Schedule
            </Link>
            <Link
              href="/accommodation"
              className="text-gray-700 hover:text-blue-600"
            >
              Accommodation
            </Link>
            <Link
              href="/sponsors"
              className="text-gray-700 hover:text-blue-600"
            >
              Sponsors
            </Link>
            <Link
              href="/#booking"
              className="text-gray-700 hover:text-blue-600"
            >
              Book Now
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-md rounded-md p-4 w-48 z-50">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/schedule"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Schedule
          </Link>
          <Link
            href="/accommodation"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Accommodation
          </Link>
          <Link
            href="/sponsors"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Sponsors
          </Link>
          <Link
            href="/#booking"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </div>
  );
}
