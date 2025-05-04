"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bed, Users, Coffee, Utensils, Wifi, Waves } from "lucide-react";
import { trpc } from "@/lib/trpc/client";

type Accommodation = {
  id: string;
  name: string;
  type: string;
  description?: string;
  price: number;
  capacity: number;
  availableUnits: number;
  amenities: string[];
  isActive: boolean;
  imageUrl?: string;
};

export default function AccommodationPage() {
  const { data: accommodations, isLoading } =
    trpc.accommodation.getAll.useQuery();

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Accommodation Options
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Choose from our comfortable lodging options for your stay during the
            Blue Ocean 4x4 Beach & Bush Rally
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
          <div className="text-center mb-8">
            <Link href="/accommodation/slots">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                View Available Packages
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              Loading accommodation options...
            </div>
          ) : accommodations?.length === 0 ? (
            <div className="text-center py-8">
              No accommodation options available
            </div>
          ) : (
            accommodations?.map((accommodation: Accommodation) => (
              <section key={accommodation.id}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-blue-600">
                  {accommodation.name}
                </h2>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {accommodation.imageUrl && (
                    <div className="h-48 sm:h-56 md:h-80 relative">
                      <Image
                        src={accommodation.imageUrl}
                        alt={accommodation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 md:p-8">
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                      {accommodation.amenities.map(
                        (amenity: string, index: number) => (
                          <div
                            key={index}
                            className="bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                          >
                            {amenity === "Bed" && (
                              <Bed className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            {amenity === "Coffee" && (
                              <Coffee className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            {amenity === "Wifi" && (
                              <Wifi className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            {amenity === "Waves" && (
                              <Waves className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            {amenity === "Users" && (
                              <Users className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            {amenity === "Utensils" && (
                              <Utensils className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                            )}
                            <span>{amenity}</span>
                          </div>
                        )
                      )}
                    </div>

                    <p className="text-sm md:text-lg mb-4 md:mb-6">
                      {accommodation.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
                      <div>
                        <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4">
                          Accommodation Details
                        </h3>
                        <ul className="space-y-2 text-sm md:text-base">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>
                              Capacity: {accommodation.capacity} people
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>
                              Available Units: {accommodation.availableUnits}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Type: {accommodation.type}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                      <p className="font-semibold text-blue-800 text-sm md:text-base">
                        Price: R{accommodation.price.toFixed(2)} per unit
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}
        </div>

        <div className="mt-6 md:mt-12 text-center">
          <Link href="/#booking">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Book Your Accommodation Now
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-lg md:text-xl font-bold">
                Blue Ocean 4x4 Rally
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2 text-sm md:text-base">
                © 2025 Blue Ocean 4x4 Beach & Bush Rally
              </p>
              <p className="text-sm md:text-base">Inhambane, Mozambique</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
