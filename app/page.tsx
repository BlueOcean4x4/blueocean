import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Tent, Car } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { SponsorsSection } from "@/components/sponsors-section";

export default function Home() {
  // Rest of the component remains the same, just replace the inline BookingForm with:
  // <BookingForm />

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-10 md:py-24 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="md:w-1/2 space-y-3 md:space-y-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Blue Ocean 4x4 Beach & Bush Rally
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              4 Days / 4 Nights of Non-Stop Off-Road Adventure in Inhambane,
              Mozambique!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="text-sm md:text-base">
                  October 3rd - 7th, 2025
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="text-sm md:text-base">
                  Inhambane, Mozambique
                </span>
              </div>
            </div>
            <div className="pt-3 md:pt-4">
              <Link href="#booking">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 md:px-8 md:py-6 text-sm md:text-lg"
                >
                  Book Your Spot Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-06%20at%2006.03.13_278ef4cd.jpg-tIO7ru9I0e2P3fpWt5NSdS9pfsp4lr.jpeg"
                alt="Blue Ocean 4x4 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Highlights Section */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Highlights & Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <div className="bg-blue-600 text-white p-3 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
              <Car className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-base md:text-xl font-bold mb-2">
              Daily Challenges
            </h3>
            <p className="text-sm md:text-base">
              Test your skills on varying terrains each day, from soft sand
              beaches to rugged bush paths.
            </p>
          </div>
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <div className="bg-yellow-500 text-white p-3 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
              <Tent className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-base md:text-xl font-bold mb-2">
              Nightly Campfires
            </h3>
            <p className="text-sm md:text-base">
              Enjoy the warmth of the fire, live music, and camaraderie under
              the stars.
            </p>
          </div>
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <div className="bg-blue-600 text-white p-3 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
              <Users className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-base md:text-xl font-bold mb-2">
              Family Friendly
            </h3>
            <p className="text-sm md:text-base">
              10 KM Family & Novice Route, Kids Quad Track, and beach games for
              everyone!
            </p>
          </div>
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <div className="bg-yellow-500 text-white p-3 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
              <Clock className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-base md:text-xl font-bold mb-2">
              Prizes & Giveaways
            </h3>
            <p className="text-sm md:text-base">
              Compete for top honors and win exciting prizes, from gear to
              exclusive rally merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Event Schedule
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-blue-600">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold">
                  October 3rd – Friday
                </h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Arrival & Registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Meet fellow riders and register your vehicle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Welcome BBQ to kick off the rally spirit!</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold">
                  October 4th – Saturday
                </h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Round 1 Begins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>
                    12 KM of scenic beach, rolling dunes, and bush trails
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Evening bonfire with live music</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-blue-600">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold">
                  October 5th – Sunday
                </h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Round 2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>26 KM route ending at a wild bush camp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Campfire vibes, music, and good company</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold">
                  October 6th-7th
                </h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Rounds 3 & 4</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Final ride ends at Blue Ocean Restaurant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Prize giving & farewell party with DJ</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <Link href="/schedule">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm md:text-base"
              >
                View Full Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Accommodation Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-600">
              Blue Ocean Lodging
            </h3>
            <p className="text-base md:text-lg font-semibold mb-3 md:mb-4">
              R1,250 per person per night – includes breakfast
            </p>
            <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>House 1: Sleeps 5</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>House 2: Sleeps 8</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>House 3: Sleeps 9</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>5 Single Rooms: Sleeps 2 per room (10 people total)</span>
              </li>
            </ul>
            <div className="h-40 md:h-48 bg-gray-200 rounded-lg mb-3 md:mb-4 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Blue Ocean Lodging"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-yellow-500">
              Island Rock Lapa Houses
            </h3>
            <p className="text-base md:text-lg font-semibold mb-3 md:mb-4">
              R850 per lapa per night
            </p>
            <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold">•</span>
                <span>Lapa 1: Sleeps 5 (5 units)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold">•</span>
                <span>Lapa 2: Sleeps 4 (5 units)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold">•</span>
                <span>3 Houses: Sleeps 5 per house</span>
              </li>
            </ul>
            <div className="h-40 md:h-48 bg-gray-200 rounded-lg mb-3 md:mb-4 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Island Rock Lapa Houses"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 text-center">
          <Link href="/accommodation">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm md:text-base"
            >
              View Accommodation Details
            </Button>
          </Link>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-10 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Book Your Adventure
          </h2>
          <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-lg shadow-lg p-4 md:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Contact Information
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Shane Le Roux
            </h3>
            <p className="flex items-center gap-2 mb-2 text-sm md:text-base">
              <span className="font-bold">Phone:</span>
              <a
                href="tel:+258850627916"
                className="text-blue-600 hover:underline"
              >
                +258 85 062 7916
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm md:text-base">
              <span className="font-bold">Email:</span>
              <a
                href="mailto:blueoceanmoz@icloud.com"
                className="text-blue-600 hover:underline"
              >
                blueoceanmoz@icloud.com
              </a>
            </p>
          </div>
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Louise Rootman
            </h3>
            <p className="flex items-center gap-2 mb-2 text-sm md:text-base">
              <span className="font-bold">Phone:</span>
              <a
                href="tel:+258847242610"
                className="text-blue-600 hover:underline"
              >
                +258 84 724 2610
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <SponsorsSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-06%20at%2006.03.13_278ef4cd.jpg-tIO7ru9I0e2P3fpWt5NSdS9pfsp4lr.jpeg"
                alt="Blue Ocean 4x4 Logo"
                width={100}
                height={100}
                className="object-contain"
              />
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
