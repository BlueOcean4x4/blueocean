# Blue Ocean 4x4 Beach & Bush Rally

This is the website for the Blue Ocean 4x4 Beach & Bush Rally event in Inhambane, Mozambique.

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma (ORM)
- Neon (PostgreSQL)
- tRPC (Type-safe API)
- Clerk (Authentication)
- shadcn/ui (UI Components)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Neon PostgreSQL database
- A Clerk account for authentication

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Database
DATABASE_URL="your-neon-postgres-connection-string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`
3. Initialize the database:
   \`\`\`bash
   npm run db:init
   # or
   yarn db:init
   # or
   pnpm db:init
   \`\`\`
4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

### Database Management

- Push schema changes to the database:
  \`\`\`bash
  npm run db:push
  \`\`\`
- Seed the database with initial data:
  \`\`\`bash
  npm run db:seed
  \`\`\`
- Open Prisma Studio to view and edit data:
  \`\`\`bash
  npm run db:studio
  \`\`\`

## Features

- Event information and schedule
- Accommodation details
- Booking system with slot management
- User authentication and profiles
- Admin dashboard for managing bookings and slots
- Responsive design for all devices

## Admin Access

After running the seed script, an admin user is created with the following credentials:
- Email: admin@blueocean4x4.com
- Password: (Set this in your Clerk dashboard)

You'll need to manually link this email to a Clerk user and update the `clerkId` in the database.
