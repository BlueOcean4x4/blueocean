import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bed, Users, Coffee, Utensils, Wifi, Waves } from "lucide-react"

export default function AccommodationPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Accommodation Options</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Choose from our comfortable lodging options for your stay during the Blue Ocean 4x4 Beach & Bush Rally
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-blue-600">Blue Ocean Lodging</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 sm:h-56 md:h-80 relative">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Blue Ocean Lodging"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-8">
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Bed className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                    <span>Comfortable Rooms</span>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Coffee className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                    <span>Breakfast Included</span>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Waves className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                    <span>Ocean Views</span>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Wifi className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                    <span>Wi-Fi Available</span>
                  </div>
                </div>

                <p className="text-sm md:text-lg mb-4 md:mb-6">
                  Experience comfort and convenience at our Blue Ocean Lodging. These accommodations offer a perfect
                  blend of comfort and proximity to all rally activities.
                </p>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
                  <div>
                    <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4">Accommodation Details</h3>
                    <ul className="space-y-2 text-sm md:text-base">
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
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4">Amenities</h3>
                    <ul className="space-y-2 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Daily breakfast included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Private bathrooms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Air conditioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Wi-Fi access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Proximity to rally starting point</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <p className="font-semibold text-blue-800 text-sm md:text-base">
                    Price: R1,250 per person per night – includes breakfast
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-yellow-500">
              Island Rock Lapa Houses
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 sm:h-56 md:h-80 relative">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Island Rock Lapa Houses"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-8">
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-yellow-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 flex-shrink-0" />
                    <span>Group Friendly</span>
                  </div>
                  <div className="bg-yellow-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Utensils className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 flex-shrink-0" />
                    <span>Self-Catering</span>
                  </div>
                  <div className="bg-yellow-50 px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Waves className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 flex-shrink-0" />
                    <span>Beach Access</span>
                  </div>
                </div>

                <p className="text-sm md:text-lg mb-4 md:mb-6">
                  The Island Rock Lapa Houses offer a more rustic and authentic experience, perfect for groups who want
                  to stay together and enjoy the natural surroundings.
                </p>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
                  <div>
                    <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4">Accommodation Details</h3>
                    <ul className="space-y-2 text-sm md:text-base">
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
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4">Amenities</h3>
                    <ul className="space-y-2 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span>Self-catering facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span>Shared bathroom facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span>Communal areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span>Close to nature</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <p className="font-semibold text-yellow-800 text-sm md:text-base">Price: R850 per lapa per night</p>
                </div>
              </div>
            </div>
          </section>
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
              <p className="mb-2 text-sm md:text-base">© 2025 Blue Ocean 4x4 Beach & Bush Rally</p>
              <p className="text-sm md:text-base">Inhambane, Mozambique</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
