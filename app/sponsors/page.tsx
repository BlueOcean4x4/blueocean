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
import { SponsorsSection } from "@/components/sponsors-section";

type Sponsor = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  tier: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE" | "PRODUCT";
  amount: number;
};

export default function SponsorsPage() {

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
              Annual Off-Road Rally in Mozambique
            </h2>
            <p className="text-sm md:text-base mb-4">
              We're thrilled to announce the launch of a brand-new annual
              Off-Road Rally in the breathtaking terrains of Mozambique, taking
              place each year in early October. This high-energy event will
              feature Mavericks, quads, bikes, side-by-sides, and cars, drawing
              off-road enthusiasts, adventurers, and performance-driven brands
              together in one unforgettable experience.
            </p>
            <p className="text-sm md:text-base mb-4">
              Since we first announced the route, we've received overwhelming
              interest from riders and followers across the region – and the
              momentum is only growing.
            </p>
          </section>

          {/* Event Highlights */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              Event Highlights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Live entertainment with a band from Nelspruit</li>
              <li>Spit braai and social evenings for riders and spectators</li>
              <li>
                Official rally t-shirts with all sponsor logos prominently
                displayed
              </li>
              <li>High-quality media content produced throughout the event</li>
              <li>
                Deadline for sponsorships: June 30th, to ensure time for logo
                inclusion on shirts, banners, and printed materials
              </li>
            </ul>
          </section>

          {/* Why Sponsor */}
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
                    Premium Brand Exposure
                  </h3>
                  <p className="text-sm md:text-base">
                    Across vehicles, gear, signage, social media, and all
                    marketing platforms
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
                    100+ participants expected in year one, with even greater
                    reach through digital media
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Camera className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Media & Content Opportunities
                  </h3>
                  <p className="text-sm md:text-base">
                    Branded video/photo content with strong engagement
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Tourism & Community Impact
                  </h3>
                  <p className="text-sm md:text-base">
                    Support an event that promotes adventure tourism and
                    community upliftment
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sponsorship Tiers */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              Sponsorship Tiers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-3 text-left">Tier</th>
                    <th className="p-3 text-left">Amount (Rands)</th>
                    <th className="p-3 text-left">Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">
                      Platinum Sponsor (Main Title)
                    </td>
                    <td className="p-3">QUAD BIKE</td>
                    <td className="p-3">
                      Logo on all banners, social media, T-shirts, vehicles
                      stickers; speaking opportunity; booth at event; major
                      product display; Squeez pages sent out every week
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Gold Sponsor</td>
                    <td className="p-3">R10,000</td>
                    <td className="p-3">
                      Prominent branding on event signage and marketing;
                      mentions in promo material and posts; product placement,
                      T-shirts
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Silver Sponsor</td>
                    <td className="p-3">R5,000</td>
                    <td className="p-3">
                      Logo on website, social media posts, T-shirts
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Bronze Sponsor</td>
                    <td className="p-3">R2,500</td>
                    <td className="p-3">
                      Basic brand mentions, social media shoutouts
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Product Sponsor</td>
                    <td className="p-3">Value-based</td>
                    <td className="p-3">
                      Branding based on contribution (could be equivalent to
                      Gold or Platinum tier)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <SponsorsSection />
          
          {/* Contact Section */}
          <section className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
              Become a Sponsor
            </h2>
            <p className="text-sm md:text-base mb-6">
              This is your chance to be part of something exciting, impactful,
              and lasting. Let's talk about how we can align your brand with the
              spirit of adventure, endurance, and the great outdoors.
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
