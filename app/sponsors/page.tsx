import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Award, Users, Globe, Camera, Heart, Trophy, Package, DollarSign } from "lucide-react"

export default function SponsorsPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Sponsorship Opportunities</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Partner with us to create an unforgettable off-road adventure in Mozambique
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Introduction */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-600">
              Sponsorship Opportunity – 4x4 Off-Road Adventure in Mozambique
            </h2>
            <p className="text-sm md:text-base mb-4">
              My name is Shane Le Roux, and I am one of the founders of an exciting new 4x4 off-road track in
              Mozambique. We are proud to announce the launch of our first annual 4x4 Off-Road Adventure, taking place
              from October 3rd to 7th, 2025.
            </p>
            <p className="text-sm md:text-base mb-4">
              We are currently seeking sponsorship partners to help bring this thrilling event to life. Our vision is to
              establish this as a premier annual off-road experience, showcasing Mozambique's raw, untouched beauty
              through beach, dune, and bush trails.
            </p>
          </section>

          {/* Why Partner With Us */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">Why Sponsor This Event?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Exclusive Brand Exposure</h3>
                  <p className="text-sm md:text-base">
                    Your brand will be featured on all vehicles, rider gear, signage, social media, and marketing
                    materials.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Growing Audience</h3>
                  <p className="text-sm md:text-base">
                    We aim to attract 100+ participants and many more spectators in year one, with regional and
                    international growth expected.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Camera className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Content & Media Reach</h3>
                  <p className="text-sm md:text-base">
                    We'll produce high-quality video and photo content with branding opportunities throughout.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Community & Legacy</h3>
                  <p className="text-sm md:text-base">
                    Be part of building a flagship annual rally that contributes to tourism, sport, and community
                    development.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What We're Looking For */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">What We're Looking For</h2>
            <p className="text-sm md:text-base mb-6">We are seeking sponsorship in the following forms:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                  Main Sponsor
                </h3>
                <p className="text-sm md:text-base">
                  Exclusive branding rights and product feature opportunities throughout the event.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Prize Sponsor
                </h3>
                <p className="text-sm md:text-base">
                  Provide prizes such as a quad bike or equipment for winners and participants.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Gear & Logistics
                </h3>
                <p className="text-sm md:text-base">
                  Support through gear, fuel, or logistical assistance for the event.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  Cash or Services
                </h3>
                <p className="text-sm md:text-base">
                  Financial sponsorship or service-based support to help make the event a success.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm md:text-base">
                This is an exciting opportunity to align your brand with adventure, resilience, and a passion for the
                outdoors. Let's discuss how we can make your brand a visible and valued part of this growing legacy.
              </p>
            </div>
          </section>

          {/* Founder's Story */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">Founder's Story</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="relative h-64 w-64 md:h-full md:w-full rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Shane Le Roux"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-sm md:text-base mb-4">
                  Shane Le Roux has a proven track record of building successful ventures. He founded a rugby club in
                  Zurich that grew from just 3 boys to 480 paying members in under 4 years.
                </p>
                <p className="text-sm md:text-base mb-4">
                  After successfully building businesses in Europe, Shane moved to Mozambique with a vision to develop
                  this raw paradise into a motorsport hub that attracts adventure enthusiasts from around the world.
                </p>
                <p className="text-sm md:text-base">
                  The Blue Ocean 4x4 Beach & Bush Rally is the first step in realizing this vision, creating an annual
                  event that showcases the natural beauty and adventure potential of Mozambique.
                </p>
              </div>
            </div>
          </section>

          {/* Current Sponsors */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">Our Current Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://www.therealhennies.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition-shadow"
              >
                <div className="h-32 w-full relative mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="The Real Hennies"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">The Real Hennies</h3>
              </a>
              <a
                href="http://marlinpub.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition-shadow"
              >
                <div className="h-32 w-full relative mb-4">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Marlin Pub" fill className="object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-center">Marlin Pub</h3>
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">Become a Sponsor</h2>
            <p className="text-sm md:text-base mb-6">
              Let's discuss how we can make your brand a visible and valued part of this growing legacy. Contact us
              today to explore sponsorship opportunities for the Blue Ocean 4x4 Beach & Bush Rally.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Shane Le Roux</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <a href="tel:+258850627916" className="text-blue-600 hover:underline text-sm md:text-base">
                      +258 85 062 7916
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <a
                      href="mailto:blueoceanmoz@icloud.com"
                      className="text-blue-600 hover:underline text-sm md:text-base"
                    >
                      blueoceanmoz@icloud.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Sponsorship Packages</h3>
                <p className="text-sm md:text-base mb-3">
                  We offer various sponsorship packages tailored to your brand's needs and budget.
                </p>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Request Sponsorship Kit</Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 md:py-8 mt-8">
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
