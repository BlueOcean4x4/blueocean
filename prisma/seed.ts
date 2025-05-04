import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create accommodation options
  const accommodations = [
    {
      name: "Blue Ocean Lodging",
      type: "HOUSE",
      description: "Experience comfort and convenience at our Blue Ocean Lodging. These accommodations offer a perfect blend of comfort and proximity to all rally activities.",
      price: 1250,
      capacity: 5,
      availableUnits: 3,
      amenities: ["Bed", "Coffee", "Wifi", "Waves"],
      isActive: true,
      imageUrl: "/placeholder.svg?height=600&width=1200",
    },
    {
      name: "Island Rock Lapa Houses",
      type: "LAPA",
      description: "The Island Rock Lapa Houses offer a more rustic and authentic experience, perfect for groups who want to stay together and enjoy the natural surroundings.",
      price: 850,
      capacity: 5,
      availableUnits: 5,
      amenities: ["Users", "Utensils", "Waves"],
      isActive: true,
      imageUrl: "/placeholder.svg?height=600&width=1200",
    },
  ];

  // Create vehicle types
  console.log("Creating vehicle types...")
  const vehicleTypes = [
    {
      name: "Quad Bike",
      description: "All-terrain quad bike",
      isActive: true,
    },
    {
      name: "Side-by-Side",
      description: "Utility terrain vehicle (UTV)",
      isActive: true,
    },
    {
      name: "4x4 Car",
      description: "Four-wheel drive vehicle",
      isActive: true,
    },
    {
      name: "Other",
      description: "Other vehicle types",
      isActive: true,
    },
  ]

  for (const vehicleType of vehicleTypes) {
    await prisma.vehicleType.upsert({
      where: { name: vehicleType.name },
      update: {},
      create: vehicleType,
    })
  }
  console.log("Created vehicle types")

  // Create booking slots
  const slots = [
    {
      name: "Blue Ocean House 1",
      description: "Comfortable 5-person house with ocean views",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 1250,
      totalCapacity: 5,
      availableSpots: 5,
      isActive: true,
    },
    {
      name: "Blue Ocean House 2",
      description: "Spacious 8-person house with ocean views",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 1250,
      totalCapacity: 8,
      availableSpots: 8,
      isActive: true,
    },
    {
      name: "Blue Ocean House 3",
      description: "Large 9-person house with ocean views",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 1250,
      totalCapacity: 9,
      availableSpots: 9,
      isActive: true,
    },
    {
      name: "Blue Ocean Single Room 1",
      description: "Comfortable single room for 2 people",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 1250,
      totalCapacity: 2,
      availableSpots: 2,
      isActive: true,
    },
    {
      name: "Island Rock Lapa 1",
      description: "Rustic lapa accommodation for 5 people",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 850,
      totalCapacity: 5,
      availableSpots: 5,
      isActive: true,
    },
    {
      name: "Island Rock Lapa 2",
      description: "Rustic lapa accommodation for 4 people",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 850,
      totalCapacity: 4,
      availableSpots: 4,
      isActive: true,
    },
    {
      name: "Island Rock House 1",
      description: "Rustic house accommodation for 5 people",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-07"),
      price: 850,
      totalCapacity: 5,
      availableSpots: 5,
      isActive: true,
    },
  ];

  // Create accommodation options
  for (const accommodation of accommodations) {
    await prisma.accommodation.create({
      data: accommodation,
    });
  }

  // Create booking slots
  for (const slot of slots) {
    await prisma.bookingSlot.create({
      data: slot,
    });
  }

  // Create schedules
  const schedules = [
    {
      date: new Date('2024-10-03'),
      title: 'October 3rd – Friday',
      description: 'Arrival & Registration',
      startTime: '08:00',
      location: 'Blue Ocean Base Camp',
      activities: [
        'Meet fellow riders, register your vehicle, and settle in for the adventure ahead.',
        'Registration opens at 08:00',
        'Welcome BBQ to kick off the rally spirit!'
      ]
    },
    {
      date: new Date('2024-10-04'),
      title: 'October 4th – Saturday',
      description: 'Round 1 Begins',
      startTime: '09:00',
      location: 'Blue Ocean Base Camp',
      activities: [
        '12 KM of scenic beach, rolling dunes, and bush trails',
        'Fun for all skill levels',
        'Evening bonfire with live music'
      ]
    },
    {
      date: new Date('2024-10-05'),
      title: 'October 5th – Sunday',
      description: 'Round 2',
      startTime: '09:00',
      location: 'Blue Ocean Base Camp',
      activities: [
        '26 KM route ending at a wild bush camp',
        'All drinks and food included',
        'Campfire vibes, music, and good company',
        'Nightly storytelling session around the fire'
      ]
    },
    {
      date: new Date('2024-10-06'),
      title: 'October 6th – Monday',
      description: 'Round 3',
      startTime: '09:00',
      location: 'Bush Camp',
      activities: [
        '24 KM of rugged terrain',
        'Ride ends at a stunning sunset camp',
        'Food and drinks included',
        'Special evening with local cultural performances'
      ]
    },
    {
      date: new Date('2024-10-07'),
      title: 'October 7th – Tuesday',
      description: 'Round 4 & Final Ride',
      startTime: '09:00',
      location: 'Sunset Camp',
      activities: [
        '24 KM coastal bush route',
        'Ends at Blue Ocean Restaurant for a lamb spit feast',
        'Prize giving & sponsor appreciation',
        'Farewell party with DJ and dancing'
      ]
    }
  ]

  for (const schedule of schedules) {
    await prisma.schedule.create({
      data: schedule
    })
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 