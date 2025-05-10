import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSponsors() {
  const sponsors = [
    {
      name: "UB Leisure",
      description: "Premier leisure and entertainment company in South Africa.",
      websiteUrl: "https://ubleisure.co.za",
      logoUrl: "/images/sponsors/ub-leisure.png",
      tier: "PLATINUM",
      amount: 0,
      isActive: true,
    },
    {
      name: "Access Bank",
      description: "Leading financial institution providing innovative banking solutions.",
      websiteUrl: "https://southafrica.accessbankplc.com",
      logoUrl: "/images/sponsors/access-bank.png",
      tier: "GOLD",
      amount: 10000,
      isActive: true,
    },
    {
      name: "Hennies Sports Bar",
      description: "South Africa's favorite sports bar and restaurant chain, offering great food, drinks, and entertainment.",
      websiteUrl: "https://www.therealhennies.co.za/branches/hennies-nelspruit",
      logoUrl: "/images/sponsors/hennies.png",
      tier: "GOLD",
      amount: 10000,
      isActive: true,
    },
    {
      name: "Marlin Pub",
      description: "Nelspruit's premier pub and grill, offering good vibes, great food, and exceptional service.",
      websiteUrl: "http://marlinpub.co.za",
      logoUrl: "/images/sponsors/marlin.png",
      tier: "GOLD",
      amount: 10000,
      isActive: true,
    },
    {
      name: "Delta Industries",
      description: "Leading industrial solutions provider in South Africa.",
      websiteUrl: "https://deltaindustries.co.za",
      logoUrl: "/images/sponsors/delta.png",
      tier: "GOLD",
      amount: 10000,
      isActive: true,
    },
    {
      name: "Deltec Energy Solutions",
      description: "Leading provider of high-quality energy solutions and battery systems in South Africa.",
      websiteUrl: "https://www.deltecenergysolutions.co.za",
      logoUrl: "/images/sponsors/deltec.png",
      tier: "SILVER",
      amount: 5000,
      isActive: true,
    },
    {
      name: "Babata Pumps",
      description: "Specialized pump solutions provider serving the mining and industrial sectors in Southern Africa.",
      websiteUrl: "https://babata.co.za",
      logoUrl: "/images/sponsors/babata.png",
      tier: "SILVER",
      amount: 5000,
      isActive: true,
    },
    {
      name: "Orange Brakes",
      description: "Specialized brake solutions for all types of vehicles.",
      websiteUrl: "#",
      logoUrl: "/images/sponsors/orange-brakes.png",
      tier: "BRONZE",
      amount: 2500,
      isActive: true,
    },
  ];

  for (const sponsor of sponsors) {
    await prisma.sponsor.upsert({
      where: { websiteUrl: sponsor.websiteUrl },
      update: sponsor,
      create: sponsor,
    });
  }

  console.log("✅ Sponsor seeding completed");
} 