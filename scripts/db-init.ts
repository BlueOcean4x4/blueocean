import { execSync } from "child_process"

async function main() {
  try {
    console.log("🔄 Initializing database...")

    // Push the schema to the database
    console.log("📤 Pushing Prisma schema to database...")
    execSync("npx prisma db push", { stdio: "inherit" })

    // Run the seed script
    console.log("🌱 Running seed script...")
    execSync("npx tsx lib/seed.ts", { stdio: "inherit" })

    console.log("✅ Database initialization completed successfully!")
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    process.exit(1)
  }
}

main()
