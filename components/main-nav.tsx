"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export function MainNav() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/schedule" className="text-gray-700 hover:text-blue-600">
          Schedule
        </Link>
        <Link
          href="/accommodation"
          className="text-gray-700 hover:text-blue-600"
        >
          Accommodation
        </Link>
        <Link href="/sponsors" className="text-gray-700 hover:text-blue-600">
          Sponsors
        </Link>
        <Link href="/#booking" className="text-gray-700 hover:text-blue-600">
          Book Now
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
      <Link href="/" className="text-gray-700 hover:text-blue-600">
        Home
      </Link>
      <Link href="/schedule" className="text-gray-700 hover:text-blue-600">
        Schedule
      </Link>
      <Link href="/accommodation" className="text-gray-700 hover:text-blue-600">
        Accommodation
      </Link>
      <Link href="/sponsors" className="text-gray-700 hover:text-blue-600">
        Sponsors
      </Link>
      <Link href="/#booking" className="text-gray-700 hover:text-blue-600">
        Book Now
      </Link>
      {isSignedIn && user?.publicMetadata?.isAdmin === true && (
        <Link href="/admin" className="text-gray-700 hover:text-blue-600">
          Admin
        </Link>
      )}
    </div>
  );
}
