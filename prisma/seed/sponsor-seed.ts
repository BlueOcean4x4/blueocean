import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSponsors() {
  const sponsors = [
    {
      name: "Hennies Sports Bar",
      description: "South Africa's favorite sports bar and restaurant chain, offering great food, drinks, and entertainment.",
      websiteUrl: "https://www.therealhennies.co.za",
      logoUrl: "https://www.therealhennies.co.za/wp-content/uploads/2023/03/hennies-logo.png",
      tier: "GOLD",
      isActive: true,
    },
    {
      name: "Marlin Pub & Grill",
      description: "Nelspruit's premier pub and grill, offering good vibes, great food, and exceptional service.",
      websiteUrl: "http://marlinpub.co.za",
      logoUrl: "http://marlinpub.co.za/wp-content/uploads/2023/03/marlin-logo.png",
      tier: "SILVER",
      isActive: true,
    },
    {
      name: "Deltec Energy Solutions",
      description: "Leading provider of high-quality energy solutions and battery systems in South Africa.",
      websiteUrl: "https://www.deltecenergysolutions.co.za",
      logoUrl: "https://www.deltecenergysolutions.co.za/wp-content/uploads/2023/03/deltec-logo.png",
      tier: "SILVER",
      isActive: true,
    },
    {
      name: "Babata Pumps",
      description: "Specialized pump solutions provider serving the mining and industrial sectors in Southern Africa.",
      websiteUrl: "https://babata.co.za",
      logoUrl: "https://babata.co.za/wp-content/uploads/2023/03/babata-logo.png",
      tier: "BRONZE",
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