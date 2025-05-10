"use client";

import Image from "next/image";
import Link from "next/link";

interface Sponsor {
  id: string;
  name: string;
  websiteUrl: string;
  logoUrl: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
}

const sponsors: Sponsor[] = [
  {
    id: "ub-leisure",
    name: "UB Leisure",
    websiteUrl: "https://ubleisure.co.za",
    logoUrl: "/sponsors/ub-leisure.png",
    tier: "platinum",
  },
  {
    id: "access-bank",
    name: "Access Bank",
    websiteUrl: "https://southafrica.accessbankplc.com",
    logoUrl: "/sponsors/access-bank.png",
    tier: "gold",
  },
  {
    id: "hennies",
    name: "Hennies Nelspruit",
    websiteUrl: "https://www.therealhennies.co.za/branches/hennies-nelspruit",
    logoUrl: "/sponsors/hennies.png",
    tier: "gold",
  },
  {
    id: "marlin-pub",
    name: "Marlin Pub",
    websiteUrl: "http://marlinpub.co.za",
    logoUrl: "/sponsors/marlin-pub.png",
    tier: "gold",
  },
  {
    id: "delta-industries",
    name: "Delta Industries",
    websiteUrl: "https://deltaindustries.co.za",
    logoUrl: "/sponsors/delta-industries.png",
    tier: "gold",
  },
  {
    id: "deltec-energy",
    name: "Deltec Energy Solutions",
    websiteUrl: "https://www.deltecenergysolutions.co.za",
    logoUrl: "/sponsors/deltec-energy.png",
    tier: "silver",
  },
  {
    id: "babata",
    name: "Babata",
    websiteUrl: "https://babata.co.za",
    logoUrl: "/sponsors/babata.png",
    tier: "silver",
  },
  {
    id: "orange-brakes",
    name: "Orange Brakes",
    websiteUrl: "#",
    logoUrl: "/sponsors/orange-brakes.png",
    tier: "bronze",
  },
];

export function SponsorsSection() {
  const tiers = ["platinum", "gold", "silver", "bronze"] as const;

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
          Our Sponsors
        </h2>

        {tiers.map((tier) => {
          const tierSponsors = sponsors.filter(
            (sponsor) => sponsor.tier === tier
          );
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier} className="mb-12">
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-6 capitalize">
                {tier} Sponsors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {tierSponsors.map((sponsor) => (
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
          );
        })}
      </div>
    </section>
  );
}
