"use client";

import { trpc } from "@/lib/trpc/client";
import Image from "next/image";
import Link from "next/link";

export function SponsorsSection() {
  const { data: sponsors, isLoading } = trpc.sponsor.getAll.useQuery();

  if (isLoading) {
    return <div>Loading sponsors...</div>;
  }

  if (!sponsors?.length) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Our Sponsors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Visit Website
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
