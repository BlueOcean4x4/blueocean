"use client";

import { trpc } from "@/lib/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Award,
  Users,
  Globe,
  Camera,
  Heart,
  Trophy,
  Package,
  DollarSign,
} from "lucide-react";
import { SponsorRequestForm } from "@/components/sponsor-request-form";

type Sponsor = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  amount: number;
};

export default function SponsorsPage() {
  const { data: sponsors, isLoading } = trpc.sponsor.getAll.useQuery();

  if (isLoading) {
    return <div>Loading sponsors...</div>;
  }

  // Group sponsors by tier
  const goldSponsors =
    sponsors?.filter((s: Sponsor) => s.tier === "GOLD") ?? [];
  const silverSponsors =
    sponsors?.filter((s: Sponsor) => s.tier === "SILVER") ?? [];
  const bronzeSponsors =
    sponsors?.filter((s: Sponsor) => s.tier === "BRONZE") ?? [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Sponsorship Opportunities
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Partner with us to create an unforgettable off-road adventure in
            Mozambique
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
              My name is Shane Le Roux, and I am one of the founders of an
              exciting new 4x4 off-road track in Mozambique. We are proud to
              announce the launch of our first annual 4x4 Off-Road Adventure,
              taking place from October 3rd to 7th, 2025.
            </p>
            <p className="text-sm md:text-base mb-4">
              We are currently seeking sponsorship partners to help bring this
              thrilling event to life. Our vision is to establish this as a
              premier annual off-road experience, showcasing Mozambique's raw,
              untouched beauty through beach, dune, and bush trails.
            </p>
          </section>

          {/* Why Partner With Us */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              Why Sponsor This Event?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Exclusive Brand Exposure
                  </h3>
                  <p className="text-sm md:text-base">
                    Your brand will be featured on all vehicles, rider gear,
                    signage, social media, and marketing materials.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Growing Audience
                  </h3>
                  <p className="text-sm md:text-base">
                    We aim to attract 100+ participants and many more spectators
                    in year one, with regional and international growth
                    expected.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Camera className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Content & Media Reach
                  </h3>
                  <p className="text-sm md:text-base">
                    We'll produce high-quality video and photo content with
                    branding opportunities throughout.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Community & Legacy
                  </h3>
                  <p className="text-sm md:text-base">
                    Be part of building a flagship annual rally that contributes
                    to tourism, sport, and community development.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What We're Looking For */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              What We're Looking For
            </h2>
            <p className="text-sm md:text-base mb-6">
              We are seeking sponsorship in the following forms:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                  Main Sponsor
                </h3>
                <p className="text-sm md:text-base">
                  Exclusive branding rights and product feature opportunities
                  throughout the event.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Prize Sponsor
                </h3>
                <p className="text-sm md:text-base">
                  Provide prizes such as a quad bike or equipment for winners
                  and participants.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Gear & Logistics
                </h3>
                <p className="text-sm md:text-base">
                  Support through gear, fuel, or logistical assistance for the
                  event.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  Cash or Services
                </h3>
                <p className="text-sm md:text-base">
                  Financial sponsorship or service-based support to help make
                  the event a success.
                </p>
              </div>
            </div>
          </section>

          {/* Current Sponsors */}
          {sponsors && sponsors.length > 0 && (
            <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
                Our Current Sponsors
              </h2>

              {/* Gold Sponsors */}
              {goldSponsors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    <Badge className="bg-yellow-100 text-yellow-800 text-base px-3 py-1">
                      Gold Sponsors
                    </Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goldSponsors.map((sponsor: Sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              )}

              {/* Silver Sponsors */}
              {silverSponsors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    <Badge className="bg-gray-100 text-gray-800 text-base px-3 py-1">
                      Silver Sponsors
                    </Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {silverSponsors.map((sponsor: Sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              )}

              {/* Bronze Sponsors */}
              {bronzeSponsors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    <Badge className="bg-orange-100 text-orange-800 text-base px-3 py-1">
                      Bronze Sponsors
                    </Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bronzeSponsors.map((sponsor: Sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Contact Section */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              Become a Sponsor
            </h2>
            <p className="text-sm md:text-base mb-6">
              Let's discuss how we can make your brand a visible and valued part
              of this growing legacy. Fill out the form below to submit your
              sponsorship request.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <a
                      href="tel:+258850627916"
                      className="text-blue-600 hover:underline text-sm md:text-base"
                    >
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
                <h3 className="text-lg font-semibold mb-3">
                  Sponsorship Packages
                </h3>
                <p className="text-sm md:text-base mb-3">
                  We offer various sponsorship packages tailored to your brand's
                  needs and budget.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <SponsorRequestForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={sponsor.logoUrl}
              alt={sponsor.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{sponsor.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {sponsor.description}
            </p>
            <div className="flex items-center justify-between">
              <Link
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Visit Website
              </Link>
              <span className="text-sm font-medium text-green-600">
                ${sponsor.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
