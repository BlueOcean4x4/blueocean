import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Tent, Car } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { SponsorsSection } from "@/components/sponsors-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white bg-grunge overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-24 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="md:w-1/2 space-y-3 md:space-y-6 text-center md:text-left">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight text-yellow-400 drop-shadow-lg font-[Russo One,Arial,sans-serif] uppercase"
              style={{ letterSpacing: "2px" }}
            >
              Mozambique Challenge
            </h1>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold italic bg-black bg-opacity-70 inline-block px-2 py-1 rounded text-white mt-2 mb-4"
              style={{ fontFamily: "Russo One,Arial,sans-serif" }}
            >
              Mozambique 4x4 Rally 2025
            </h2>
            <div className="bg-black bg-opacity-80 rounded-lg p-4 mt-4 inline-block shadow-lg max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block text-yellow-400 text-2xl">★</span>
                <span className="text-lg font-bold text-white">
                  Mozambique, Here We Come! Off-Road Rally Experience!
                </span>
              </div>
              <div className="flex items-center gap-4 text-yellow-400 font-bold text-lg mb-2">
                <Calendar className="h-5 w-5" />
                <span>03 - 07 October, 2025</span>
              </div>
              <div className="text-white text-sm mb-2">
                Join us for the inaugural beach & bush rally in the heart of
                Mozambique!
              </div>
              <div className="text-yellow-400 text-xs">
                1st Prize: A Brand-New Quad Bike (Sponsored by UB Leisure)
              </div>
              <div className="pt-4">
                <a href="mailto:blueoceanmoz@icloud.com">
                  <Button
                    size="lg"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 text-lg font-bold rounded shadow-lg"
                  >
                    Book Your Spot Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400">
              <Image
                src="/images/quad1.png"
                alt="Mozambique Challenge Action"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Highlights Section */}
      <section className="py-10 md:py-16 container mx-auto px-4 text-black">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-white">
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
      <section className="py-10 md:py-16 bg-gray-50 text-black">
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

      {/* Booking Form Section */}
      {/* <section id="booking" className="py-10 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Book Your Adventure
          </h2>
          <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-lg shadow-lg p-4 md:p-8">
           
          </div>
        </div>
      </section> */}

      {/* Sponsors Section */}
      <section className="bg-black py-8 mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-yellow-400 text-2xl font-bold text-center mb-6 font-[Russo One,Arial,sans-serif] uppercase tracking-wider">
            Sponsored By
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image
              src="/sponsor-ub.png"
              alt="UB Leisure"
              width={100}
              height={60}
              className="object-contain"
            />
            <Image
              src="/sponsor-deltec.png"
              alt="Deltec"
              width={100}
              height={60}
              className="object-contain"
            />
            <Image
              src="/sponsor-hotel.png"
              alt="Hotel"
              width={100}
              height={60}
              className="object-contain"
            />
            <Image
              src="/sponsor-blueocean.png"
              alt="Blue Ocean"
              width={100}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Location
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1234567890123!2d35.4339993!3d-24.1976212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1f1f6f0a16b80571%3A0xbe106b5d7fcc13b4!2sBlue%20Ocean%20Residencial%20Legogo!5e0!3m2!1sen!2smz!4v1712345678901!5m2!1sen!2smz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blue Ocean 4x4 Location"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://www.google.com/maps/dir/Nelspruit/Blue+Ocean+Residencial+Legogo,+Inhambane,+Paindane,+Legogo,+Inhambane+1300,+Mozambique/@-24.9857273,30.5522085,7z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x1ee84a158d3e2739:0x7aa50ca83429a0f8!2m2!1d30.9694163!2d-25.4752984!1m5!1m1!1s0x1f1f6f0a16b80571:0xbe106b5d7fcc13b4!2m2!1d35.4361878!2d-24.1976212"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <MapPin className="h-4 w-4" />
                <span>Get Directions from Nelspruit</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section add map */}
      <section className="py-10 md:py-16 container mx-auto px-4 ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Contact Information
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-black">
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg text-black md:text-xl font-bold mb-3 md:mb-4">
              Shane Le Roux
            </h3>
            <p className="flex items-center gap-2 mb-2 text-sm md:text-base">
              <span className="font-bold ">Phone:</span>
              <a
                href="tel:+258850627916"
                className="text-blue-600 hover:underline"
              >
                +258 85 062 7916
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm md:text-base text-black">
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
