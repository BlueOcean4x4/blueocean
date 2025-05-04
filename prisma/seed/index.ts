import { PrismaClient } from "@prisma/client";
import { seedSponsors } from "./sponsor-seed";

const prisma = new PrismaClient();

async function main() {
  try {
    await seedSponsors();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 