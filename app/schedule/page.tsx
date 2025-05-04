import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"

export default function SchedulePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Event Schedule</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            4 Days / 4 Nights of Non-Stop Off-Road Adventure in Inhambane, Mozambique!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-12">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">October 3rd – Friday</h2>
            </div>
            <div className="space-y-3 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Arrival & Registration</h3>
                <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                  <li>Meet fellow riders, register your vehicle, and settle in for the adventure ahead.</li>
                  <li>Registration opens at 08:00</li>
                  <li>Welcome BBQ to kick off the rally spirit!</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Registration: 08:00 - 16:00</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Blue Ocean Base Camp</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">October 4th – Saturday</h2>
            </div>
            <div className="space-y-3 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Round 1 Begins</h3>
                <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                  <li>12 KM of scenic beach, rolling dunes, and bush trails</li>
                  <li>Fun for all skill levels</li>
                  <li>Evening bonfire with live music</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Rally kicks off: 09:00</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Starting Point: Blue Ocean Base Camp</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">October 5th – Sunday</h2>
            </div>
            <div className="space-y-3 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Round 2</h3>
                <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                  <li>26 KM route ending at a wild bush camp</li>
                  <li>All drinks and food included</li>
                  <li>Campfire vibes, music, and good company</li>
                  <li>Nightly storytelling session around the fire</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Start Time: 09:00</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Starting Point: Blue Ocean Base Camp</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">October 6th – Monday</h2>
            </div>
            <div className="space-y-3 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Round 3</h3>
                <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                  <li>24 KM of rugged terrain</li>
                  <li>Ride ends at a stunning sunset camp</li>
                  <li>Food and drinks included</li>
                  <li>Special evening with local cultural performances</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Start Time: 09:00</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Starting Point: Bush Camp</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">October 7th – Tuesday</h2>
            </div>
            <div className="space-y-3 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Round 4 & Final Ride</h3>
                <ul className="space-y-2 ml-6 list-disc text-sm md:text-base">
                  <li>24 KM coastal bush route</li>
                  <li>Ends at Blue Ocean Restaurant for a lamb spit feast</li>
                  <li>Prize giving & sponsor appreciation</li>
                  <li>Farewell party with DJ and dancing</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Start Time: 09:00</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>Starting Point: Sunset Camp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-12 text-center">
          <Link href="/#booking">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Book Your Spot Now
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
              <p className="mb-2 text-sm md:text-base">© 2025 Blue Ocean 4x4 Beach & Bush Rally</p>
              <p className="text-sm md:text-base">Inhambane, Mozambique</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
