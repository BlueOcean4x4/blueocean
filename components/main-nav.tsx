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
        <Link href="/sponsors" className="text-gray-700 hover:text-blue-600">
          Sponsors
        </Link>
        <Link href="mailto:blueoceanmoz@icloud.com" className="text-gray-700 hover:text-blue-600">
          Book Your Spot
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
      <Link href="/sponsors" className="text-gray-700 hover:text-blue-600">
        Sponsors
      </Link>
      <Link href="mailto:blueoceanmoz@icloud.com" className="text-gray-700 hover:text-blue-600">
        Book Your Spot
      </Link>
      {/* {isSignedIn && user?.publicMetadata?.isAdmin === true && (
        <Link href="/admin" className="text-gray-700 hover:text-blue-600">
          Admin
        </Link>
      )} */}
    </div>
  );
}
