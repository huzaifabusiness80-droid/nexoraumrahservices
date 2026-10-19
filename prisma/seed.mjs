// Master Seed Script for Nexora Journeys on Neon PostgreSQL
// Seeds all 6 services: Transport, Hotels, Ziyarat, City Tours, Desert Safari, Car Rental

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting comprehensive database seed on Neon PostgreSQL...");

  // =========================================================================
  // 1. ADMIN USER
  // =========================================================================
  const adminEmail = "admin@nexorajourneys.com";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "Nexora Administrator",
        password: "admin123_temp_change_me", // Admin initial password
        role: "SUPER_ADMIN",
      },
    });
    console.log("✅ Admin user seeded: admin@nexorajourneys.com");
  }

  // =========================================================================
  // 2. SERVICE 1: UMRAH TRANSPORT FLEET & ROUTE RATES
  // =========================================================================
  const transportData = [
    {
      id: "toyota-camry",
      name: "Toyota Camry",
      category: "Executive Sedan",
      seats: "4 Seater",
      luggage: "02 to 03 Luggage",
      image: "/images/fleet/toyota-camry.jpg",
      posterImage: "/images/tranport-images/image.png",
      startingPriceSar: 100,
      description: "Ideal for small families, solo pilgrims, and executive business travelers seeking smooth and reliable private transfers.",
      features: [
        "Chilled Dual-Zone Climate Control",
        "Complimentary Chilled Bottled Water",
        "Professional English/Urdu/Arabic Speaking Chauffeur",
        "Door-to-door hotel terminal luggage assistance",
        "Real-time flight tracking & zero delay guarantee"
      ],
      routes: [
        { route: "Jeddah Airport → Jeddah Hotel (Drop Off)", fromCity: "Jeddah", toCity: "Jeddah", priceSar: 170 },
        { route: "Jeddah Airport → Madina Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 450 },
        { route: "Jeddah → Makkah Hotel (Drop Off)", fromCity: "Jeddah", toCity: "Makkah", priceSar: 250 },
        { route: "Makkah → Jeddah Airport (Drop Off)", fromCity: "Makkah", toCity: "Jeddah", priceSar: 200 },
        { route: "Makkah → Madina Hotel (Drop Off)", fromCity: "Makkah", toCity: "Madinah", priceSar: 400 },
        { route: "Makkah → Madina Hotel via Badar", fromCity: "Makkah", toCity: "Madinah", priceSar: 500 },
        { route: "Madina Airport → Madina Hotel (Drop Off)", fromCity: "Madinah", toCity: "Madinah", priceSar: 200 },
        { route: "Madina → Madina Airport (Drop Off)", fromCity: "Madinah", toCity: "Madinah", priceSar: 120 },
        { route: "Madina → Jeddah Airport (Drop Off)", fromCity: "Madinah", toCity: "Jeddah", priceSar: 400 },
        { route: "Madina → Makkah Hotel (Drop Off)", fromCity: "Madinah", toCity: "Makkah", priceSar: 400 },
        { route: "Madina → Makkah Hotel via Badar", fromCity: "Madinah", toCity: "Makkah", priceSar: 500 },
        { route: "Madina Hotel → Train Station", fromCity: "Madinah", toCity: "Madinah", priceSar: 100 },
        { route: "Madina Train Station → Madina Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 150 },
        { route: "Madina Ziyarat", fromCity: "Madinah", toCity: "Madinah", priceSar: 200 },
        { route: "Madina Ziyarat with Wadi Jin", fromCity: "Madinah", toCity: "Madinah", priceSar: 299 },
        { route: "Madina → Badar Ziyarat", fromCity: "Madinah", toCity: "Badar", priceSar: 399 },
        { route: "Makkah Hotel → Train Station", fromCity: "Makkah", toCity: "Makkah", priceSar: 120 },
        { route: "Makkah Train Station → Hotel", fromCity: "Makkah", toCity: "Makkah", priceSar: 150 },
        { route: "Makkah Ziyarat", fromCity: "Makkah", toCity: "Makkah", priceSar: 249 },
        { route: "Makkah Ziyarat with Masjid Ayesha", fromCity: "Makkah", toCity: "Makkah", priceSar: 299 }
      ]
    },
    {
      id: "hyundai-staria",
      name: "Hyundai Staria",
      category: "Luxury MPV",
      seats: "7 Seater",
      luggage: "08 to 10 Luggage",
      image: "/images/fleet/hyundai-staria.jpg",
      posterImage: "/images/tranport-images/image copy.png",
      startingPriceSar: 150,
      description: "Futuristic spaceship comfort with massive luggage capacity, captain recline seats, and ultra-smooth highway cruising.",
      features: [
        "Spacious 7 Passenger VIP Seating",
        "Massive Luggage Capacity (Up to 10 Bags)",
        "High-output rear multi-zone AC",
        "Phone charging ports on all seats",
        "Flight monitoring with meet & greet at terminal"
      ],
      routes: [
        { route: "Jeddah Airport to Jeddah Hotel Drop Off", fromCity: "Jeddah", toCity: "Jeddah", priceSar: 250 },
        { route: "Jeddah Airport to Madina Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 550 },
        { route: "Jeddah to Makkah Hotel Drop Off", fromCity: "Jeddah", toCity: "Makkah", priceSar: 350 },
        { route: "Makkah to Jeddah Airport Drop Off", fromCity: "Makkah", toCity: "Jeddah", priceSar: 300 },
        { route: "Makkah to Madina Hotel Drop Off", fromCity: "Makkah", toCity: "Madinah", priceSar: 500 },
        { route: "Makkah to Madina Hotel via Badar", fromCity: "Makkah", toCity: "Madinah", priceSar: 650 },
        { route: "Madina Airport to Madina Hotel Drop Off", fromCity: "Madinah", toCity: "Madinah", priceSar: 250 },
        { route: "Madina to Madina Airport Drop Off", fromCity: "Madinah", toCity: "Madinah", priceSar: 150 },
        { route: "Madina to Jeddah Airport Drop Off", fromCity: "Madinah", toCity: "Jeddah", priceSar: 500 },
        { route: "Madina to Makkah Hotel Drop Off", fromCity: "Madinah", toCity: "Makkah", priceSar: 500 },
        { route: "Madina to Makkah Hotel via Badar", fromCity: "Madinah", toCity: "Makkah", priceSar: 650 },
        { route: "Madina Hotel to Train Station", fromCity: "Madinah", toCity: "Madinah", priceSar: 150 },
        { route: "Madina Train Station to Madina Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 200 },
        { route: "Madina Ziyarat", fromCity: "Madinah", toCity: "Madinah", priceSar: 285 },
        { route: "Madina Ziyarat with Wadi Jin", fromCity: "Madinah", toCity: "Madinah", priceSar: 350 },
        { route: "Madina to Badar Ziyarat", fromCity: "Madinah", toCity: "Badar", priceSar: 449 },
        { route: "Makkah Hotel to Train Station", fromCity: "Makkah", toCity: "Makkah", priceSar: 150 },
        { route: "Makkah Train Station to Hotel", fromCity: "Makkah", toCity: "Makkah", priceSar: 200 },
        { route: "Makkah Ziyarat", fromCity: "Makkah", toCity: "Makkah", priceSar: 299 },
        { route: "Makkah Ziyarat with Masjid Ayesha", fromCity: "Makkah", toCity: "Makkah", priceSar: 349 }
      ]
    },
    {
      id: "gmc-yukon",
      name: "GMC SUV (Yukon)",
      category: "VIP Luxury SUV",
      seats: "7 Seater",
      luggage: "06 to 08 Luggage",
      image: "/images/fleet/gmc-yukon.jpg",
      posterImage: "/images/tranport-images/image copy 2.png",
      startingPriceSar: 250,
      description: "The gold standard of Saudi VIP pilgrimage travel. Bold presence, handcrafted leather cabin, and whisper-quiet ride.",
      features: [
        "Ultra-Quiet Acoustic Luxury Cabin",
        "Heated & Ventilated Leather Seating",
        "Rear Passenger Entertainment Display",
        "Executive Chauffeur with Uniform",
        "Complimentary Refreshments & Dates"
      ],
      routes: [
        { route: "Jeddah Airport to Jeddah Hotel Drop Off", fromCity: "Jeddah", toCity: "Jeddah", priceSar: 300 },
        { route: "Jeddah Airport to Madina Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 1000 },
        { route: "Jeddah to Makkah Hotel Drop Off", fromCity: "Jeddah", toCity: "Makkah", priceSar: 499 },
        { route: "Makkah to Jeddah Airport Drop Off", fromCity: "Makkah", toCity: "Jeddah", priceSar: 400 },
        { route: "Makkah to Madina Hotel Drop Off", fromCity: "Makkah", toCity: "Madinah", priceSar: 950 },
        { route: "Makkah to Madina Hotel via Badar", fromCity: "Makkah", toCity: "Madinah", priceSar: 1150 },
        { route: "Madina Airport to Madina Hotel Drop Off", fromCity: "Madinah", toCity: "Madinah", priceSar: 399 },
        { route: "Madina to Madina Airport Drop Off", fromCity: "Madinah", toCity: "Madinah", priceSar: 300 },
        { route: "Madina to Jeddah Airport Drop Off", fromCity: "Madinah", toCity: "Jeddah", priceSar: 999 },
        { route: "Madina to Makkah Hotel Drop Off", fromCity: "Madinah", toCity: "Makkah", priceSar: 999 },
        { route: "Madina to Makkah Hotel via Badar", fromCity: "Madinah", toCity: "Makkah", priceSar: 1150 },
        { route: "Madina Hotel to Train Station", fromCity: "Madinah", toCity: "Madinah", priceSar: 250 },
        { route: "Madina Train Station to Madina Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 250 },
        { route: "Madina Ziyarat", fromCity: "Madinah", toCity: "Madinah", priceSar: 400 },
        { route: "Madina Ziyarat with Wadi Jin", fromCity: "Madinah", toCity: "Madinah", priceSar: 499 },
        { route: "Madina to Badar Ziyarat", fromCity: "Madinah", toCity: "Badar", priceSar: 549 },
        { route: "Makkah Hotel to Train Station", fromCity: "Makkah", toCity: "Makkah", priceSar: 300 },
        { route: "Makkah Train Station to Hotel", fromCity: "Makkah", toCity: "Makkah", priceSar: 250 },
        { route: "Makkah Ziyarat", fromCity: "Makkah", toCity: "Makkah", priceSar: 449 },
        { route: "Makkah Ziyarat with Masjid Ayesha", fromCity: "Makkah", toCity: "Makkah", priceSar: 499 }
      ]
    },
    {
      id: "toyota-hiace",
      name: "Toyota HiAce",
      category: "Passenger Van",
      seats: "10-14 Seater",
      luggage: "08 to 12 Luggage",
      image: "/images/fleet/toyota-hiace.jpg",
      posterImage: "/images/tranport-images/image copy 5.png",
      startingPriceSar: 230,
      description: "The most popular, cost-effective choice for medium family groups performing Umrah together with generous luggage space.",
      features: [
        "High-Roof Walk-In Ceiling Clearance",
        "Individual Overhead Air-Conditioning Vents",
        "Foldable Luggage Seating Configuration",
        "Punctual and Courteous Driver",
        "All Highway Tolls & Fuel Included"
      ],
      routes: [
        { route: "Jeddah Airport to Makkah Hotel", fromCity: "Jeddah", toCity: "Makkah", priceSar: 340 },
        { route: "Jeddah Airport to Madinah Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 620 },
        { route: "Makkah Hotel to Jeddah Airport", fromCity: "Makkah", toCity: "Jeddah", priceSar: 300 },
        { route: "Medinah Airport to Medinah Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 300 },
        { route: "Medinah Hotel to Medinah Airport", fromCity: "Madinah", toCity: "Madinah", priceSar: 230 },
        { route: "Makkah Hotel to Madinah Hotel", fromCity: "Makkah", toCity: "Madinah", priceSar: 600 },
        { route: "Madinah Hotel to Makkah Hotel", fromCity: "Madinah", toCity: "Makkah", priceSar: 600 },
        { route: "Ziyarat Makkah", fromCity: "Makkah", toCity: "Makkah", priceSar: 300 },
        { route: "Ziyarat Madinah", fromCity: "Madinah", toCity: "Madinah", priceSar: 350 }
      ]
    },
    {
      id: "luxurious-coaster",
      name: "Luxurious Coaster",
      category: "Mini Bus",
      seats: "21-24 Seater",
      luggage: "15 to 20 Luggage",
      image: "/images/fleet/toyota-coaster.jpg",
      posterImage: "/images/tranport-images/image copy 4.png",
      startingPriceSar: 350,
      description: "Superior group transport with wide aisle, comfortable reclining high-back seats, and ample under-seat / rear luggage room.",
      features: [
        "21 to 24 High-Back Fabric Reclining Seats",
        "Heavy-Duty Dual Compressor A/C System",
        "Dedicated Microphone PA System for Tour Guides",
        "Luggage Racks & Spacious Rear Cargo Bay",
        "Experienced Long-Distance Pilgrimage Driver"
      ],
      routes: [
        { route: "Jeddah Airport to Makkah Hotel", fromCity: "Jeddah", toCity: "Makkah", priceSar: 550 },
        { route: "Jeddah Airport to Madinah Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 940 },
        { route: "Makkah Hotel to Jeddah Airport", fromCity: "Makkah", toCity: "Jeddah", priceSar: 420 },
        { route: "Medinah Airport to Medinah Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 450 },
        { route: "Medinah Hotel to Medinah Airport", fromCity: "Madinah", toCity: "Madinah", priceSar: 350 },
        { route: "Makkah Hotel to Madinah Hotel", fromCity: "Makkah", toCity: "Madinah", priceSar: 900 },
        { route: "Madinah Hotel to Makkah Hotel", fromCity: "Madinah", toCity: "Makkah", priceSar: 900 },
        { route: "Ziyarat Makkah", fromCity: "Makkah", toCity: "Makkah", priceSar: 500 },
        { route: "Ziyarat Madinah", fromCity: "Madinah", toCity: "Madinah", priceSar: 400 }
      ]
    },
    {
      id: "luxurious-bus",
      name: "Luxurious Bus",
      category: "VIP Luxury Coach",
      seats: "45-50 Seater",
      luggage: "45 to 50 Luggage",
      image: "/images/hero/slide-2.jpg",
      posterImage: "/images/tranport-images/image copy 3.png",
      startingPriceSar: 500,
      description: "Premium large-scale Umrah group transport with underfloor cargo bays, onboard entertainment, and supreme ride comfort.",
      features: [
        "45 to 50 Executive Plush Reclining Seats",
        "Enormous Underfloor Luggage Compartments",
        "Integrated Climate Control & Air Filtration",
        "Onboard Public Address & Screen System",
        "Authorized Hajj & Umrah Ministry Certified Driver"
      ],
      routes: [
        { route: "Jeddah Airport to Makkah Hotel", fromCity: "Jeddah", toCity: "Makkah", priceSar: 650 },
        { route: "Jeddah Airport to Madinah Hotel", fromCity: "Jeddah", toCity: "Madinah", priceSar: 1150 },
        { route: "Makkah Hotel to Jeddah Airport", fromCity: "Makkah", toCity: "Jeddah", priceSar: 550 },
        { route: "Medinah Airport to Medinah Hotel", fromCity: "Madinah", toCity: "Madinah", priceSar: 550 },
        { route: "Medinah Hotel to Medinah Airport", fromCity: "Madinah", toCity: "Madinah", priceSar: 500 },
        { route: "Makkah Hotel to Madinah Hotel", fromCity: "Makkah", toCity: "Madinah", priceSar: 1150 },
        { route: "Madinah Hotel to Makkah Hotel", fromCity: "Madinah", toCity: "Makkah", priceSar: 1150 },
        { route: "Ziyarat Makkah", fromCity: "Makkah", toCity: "Makkah", priceSar: 550 },
        { route: "Ziyarat Madinah", fromCity: "Madinah", toCity: "Madinah", priceSar: 500 }
      ]
    }
  ];

  for (const car of transportData) {
    const existing = await prisma.transportVehicle.findUnique({ where: { slug: car.id } });
    if (!existing) {
      await prisma.transportVehicle.create({
        data: {
          name: car.name,
          slug: car.id,
          category: car.category,
          seats: car.seats,
          luggage: car.luggage,
          image: car.image,
          posterImage: car.posterImage,
          startingPriceSar: car.startingPriceSar,
          description: car.description,
          features: car.features,
          routes: {
            create: car.routes.map(r => ({
              route: r.route,
              fromCity: r.fromCity,
              toCity: r.toCity,
              priceSar: r.priceSar,
            }))
          }
        }
      });
      console.log(`✅ Seeded Transport Vehicle: ${car.name} (${car.routes.length} routes)`);
    }
  }

  // =========================================================================
  // 3. SERVICE 2: UMRAH HOTELS (Makkah & Madinah)
  // =========================================================================
  const hotelsData = [
    {
      name: "Swissotel Al Maqam Makkah",
      slug: "swissotel-al-maqam",
      city: "Makkah",
      stars: 5,
      distance: "Clock Tower, Direct Haram Access",
      address: "Abraj Al Bait Complex, Makkah",
      startingPrice: 850,
      image: "/images/hero/slide-1.jpg",
      gallery: ["/images/hero/slide-1.jpg", "/images/hero/slide-2.jpg"],
      description: "Towering over the holy city of Makkah, Swissotel Al Maqam offers direct access to the Holy Mosque with breathtaking Kaaba views.",
      amenities: ["Haram View", "Kaaba View", "Direct Elevator Access", "Free WiFi", "Buffet Breakfast"],
      rooms: [
        { roomType: "Double Room (City View)", capacity: 2, pricePerNight: 850, hasKaabaView: false },
        { roomType: "Kaaba View Executive Room", capacity: 2, pricePerNight: 1250, hasKaabaView: true },
        { roomType: "Triple Room", capacity: 3, pricePerNight: 990, hasKaabaView: false },
        { roomType: "Quad Room", capacity: 4, pricePerNight: 1100, hasKaabaView: false },
        { roomType: "Sharing Bed in Quad", capacity: 1, pricePerNight: 275, hasKaabaView: false }
      ]
    },
    {
      name: "Pullman Zamzam Madina",
      slug: "pullman-zamzam-madina",
      city: "Madinah",
      stars: 5,
      distance: "150m from Masjid An-Nabawi",
      address: "Amr Bin Al Aas Street, Madinah",
      startingPrice: 650,
      image: "/images/hero/slide-3.jpg",
      gallery: ["/images/hero/slide-3.jpg", "/images/hero/slide-4.jpg"],
      description: "Conveniently located in the northern central area of Madinah, offering peaceful luxury just footsteps from the Prophet's Mosque.",
      amenities: ["Prophet's Mosque View", "Free WiFi", "24/7 Room Service", "On-site Dining"],
      rooms: [
        { roomType: "Standard Double Room", capacity: 2, pricePerNight: 650, hasKaabaView: false },
        { roomType: "Prophet's Mosque View Suite", capacity: 3, pricePerNight: 950, hasKaabaView: false },
        { roomType: "Quad Sharing Bed", capacity: 1, pricePerNight: 200, hasKaabaView: false }
      ]
    },
    {
      name: "Arafat Zahbi Hotel",
      slug: "arafat-zahbi",
      city: "Makkah",
      stars: 3,
      distance: "24/7 Free Haram Shuttle",
      address: "Umm Al Momin Street, Makkah",
      startingPrice: 96,
      image: "/images/hero/slide-2.jpg",
      gallery: ["/images/hero/slide-2.jpg"],
      description: "Arafat Zahbi Hotel offers clean rooms, great service, and convenient 24/7 free shuttle to the Haram, making it an ideal economical choice.",
      amenities: ["Free WiFi", "24/7 Shuttle", "24/7 Front Desk", "Air Conditioning"],
      rooms: [
        { roomType: "Sharing Bed", capacity: 1, pricePerNight: 16, hasKaabaView: false },
        { roomType: "Quad Room", capacity: 4, pricePerNight: 96, hasKaabaView: false },
        { roomType: "Quint Room", capacity: 5, pricePerNight: 96, hasKaabaView: false }
      ]
    },
    {
      name: "Fakhir Al Azizia Hotel",
      slug: "fakhir-al-azizia",
      city: "Makkah",
      stars: 3,
      distance: "24/7 Free Haram Shuttle",
      address: "Azizia District, Makkah",
      startingPrice: 96,
      image: "/images/hero/slide-4.jpg",
      gallery: ["/images/hero/slide-4.jpg"],
      description: "Fakhir Al Azizia is located in the peaceful Azizia district with non-stop complimentary shuttle buses directly to the Grand Mosque.",
      amenities: ["Free WiFi", "Free Shuttle", "24/7 Front Desk", "Elevators"],
      rooms: [
        { roomType: "Sharing Bed", capacity: 1, pricePerNight: 16, hasKaabaView: false },
        { roomType: "Quad Room", capacity: 4, pricePerNight: 96, hasKaabaView: false }
      ]
    },
    {
      name: "Rama Al Madinah Hotel",
      slug: "rama-al-madinah",
      city: "Madinah",
      stars: 5,
      distance: "100M from Rawdah Shareef Gate",
      address: "Rawdah Side, Madinah",
      startingPrice: 400,
      image: "/images/hero/slide-1.jpg",
      gallery: ["/images/hero/slide-1.jpg"],
      description: "Rama Al Madinah is just 100 meters from the sacred Rawdah Shareef entrance, offering unparalleled proximity.",
      amenities: ["Free WiFi", "Air Conditioning", "24/7 Front Desk", "Room Service"],
      rooms: [
        { roomType: "Quad Room", capacity: 4, pricePerNight: 400, hasKaabaView: false },
        { roomType: "Quint Room", capacity: 5, pricePerNight: 420, hasKaabaView: false }
      ]
    }
  ];

  for (const h of hotelsData) {
    const existing = await prisma.hotel.findUnique({ where: { slug: h.slug } });
    if (!existing) {
      await prisma.hotel.create({
        data: {
          name: h.name,
          slug: h.slug,
          city: h.city,
          stars: h.stars,
          distance: h.distance,
          address: h.address,
          startingPrice: h.startingPrice,
          image: h.image,
          gallery: h.gallery,
          description: h.description,
          amenities: h.amenities,
          rooms: {
            create: h.rooms.map(r => ({
              roomType: r.roomType,
              capacity: r.capacity,
              pricePerNight: r.pricePerNight,
              hasKaabaView: r.hasKaabaView,
            }))
          }
        }
      });
      console.log(`✅ Seeded Hotel: ${h.name} (${h.rooms.length} room tariffs)`);
    }
  }

  // =========================================================================
  // 4. SERVICE 3: UMRAH ZIYARAT TOURS
  // =========================================================================
  const ziyaratData = [
    {
      title: "Makkah Complete Sacred Ziyarat Tour",
      slug: "makkah-holy-ziyarat",
      city: "Makkah",
      duration: "3.5 - 4 Hours",
      description: "Comprehensive private historical tour of Makkah Al-Mukarramah. Covers the mountains of initial Quranic revelation, the sanctuary of Hijrah, the sacred grounds of Hajj, and Miqat Tan'eem with dedicated chauffeur.",
      image: "/images/hero/slide-1.jpg",
      gallery: ["/images/hero/slide-1.jpg", "/images/hero/slide-2.jpg"],
      placesCovered: [
        "Jabal Al-Noor (Cave of Hira)",
        "Jabal Thawr (Cave of Sanctuary)",
        "Jabal Al-Rahmah & Plains of Arafat",
        "Mina Tent City & Jamarat",
        "Masjid Aisha (Tan'eem Miqat)"
      ],
      priceSedan: 249,
      priceVan: 300,
      priceSuv: 449,
      includes: [
        "Doorstep hotel pickup and return transfer in Makkah",
        "Private air-conditioned vehicle exclusively for your family/group",
        "Knowledgeable, courteous multilingual chauffeur",
        "All road tolls and fuel costs included",
        "Ample dedicated wait time at each historic sanctuary"
      ]
    },
    {
      title: "Madinah Blessed Historical Sanctuaries Tour",
      slug: "madinah-holy-ziyarat",
      city: "Madinah",
      duration: "3.5 - 4 Hours",
      description: "Heartwarming journey through the City of the Prophet ﷺ. Offer two voluntary rakats at Masjid Quba for the reward of a complete Umrah, pay respects at Mount Uhud Shuhada, and visit the Mosque of the Two Qiblas.",
      image: "/images/hero/slide-3.jpg",
      gallery: ["/images/hero/slide-3.jpg", "/images/hero/slide-4.jpg"],
      placesCovered: [
        "Masjid Quba (Full Umrah Reward)",
        "Mount Uhud & Martyrs Cemetery",
        "Masjid Al-Qiblatayn (Two Qiblas)",
        "Seven Mosques (Battle of the Trench)",
        "Bir Shifa & Madinah Date Garden"
      ],
      priceSedan: 200,
      priceVan: 350,
      priceSuv: 400,
      includes: [
        "Private door-to-door hotel pickup & return transfer",
        "Chilled climate-controlled vehicle",
        "Multilingual pilgrimage chauffeur",
        "Toll taxes and parking covered"
      ]
    },
    {
      title: "Historical Battlefield of Badar Day Excursion",
      slug: "battlefield-of-badar-tour",
      city: "Badar",
      duration: "6 - 7 Hours Full Day",
      description: "Profound full-day spiritual excursion to the historic battlefield of Badar (Ghazwa-e-Badar), located 150 km southwest of Madinah.",
      image: "/images/hero/slide-2.jpg",
      gallery: ["/images/hero/slide-2.jpg"],
      placesCovered: [
        "Shuhada-e-Badar (Martyrs of Badar Cemetery)",
        "Al-Udwat Al-Dunya & Al-Udwat Al-Quswa",
        "Jabal Al-Mala'ikah (Mount of the Angels)",
        "Historic Masnoon Well of Badar"
      ],
      priceSedan: 399,
      priceVan: 550,
      priceSuv: 549,
      includes: [
        "Long-distance highway air-conditioned transport",
        "Experienced desert highway chauffeur",
        "Cold mineral water & dates provided",
        "Doorstep hotel pickup in Madinah"
      ]
    }
  ];

  for (const z of ziyaratData) {
    const existing = await prisma.ziyaratTour.findUnique({ where: { slug: z.slug } });
    if (!existing) {
      await prisma.ziyaratTour.create({ data: z });
      console.log(`✅ Seeded Ziyarat Tour: ${z.title}`);
    }
  }

  // =========================================================================
  // 5. SERVICE 4: UAE CITY TOURS
  // =========================================================================
  const uaeCityToursData = [
    {
      title: "Dubai Half-Day Modern Highlights",
      slug: "dubai-half-day",
      city: "Dubai",
      duration: "4 - 5 Hours",
      priceAed: 250,
      privateCarPrice: 250,
      image: "/images/hero/slide-2.jpg",
      description: "Ideal introductory tour of iconic Dubai landmarks with memorable photo stops at Burj Al Arab, Palm Jumeirah, Dubai Marina, and Downtown.",
      highlights: [
        "Dubai Marina Walk & Luxury Yacht Lagoon",
        "Palm Jumeirah & The Pointe with Atlantis View",
        "Burj Al Arab shoreline photo stop",
        "Jumeirah Mosque exterior view",
        "Downtown Dubai, Dubai Mall & Burj Khalifa"
      ],
      inclusions: [
        "Private air-conditioned car exclusively for your party",
        "Professional English/Urdu speaking chauffeur",
        "Hotel pickup and drop-off in Dubai",
        "All parking, fuel, and Salik toll charges included"
      ]
    },
    {
      title: "Dubai Full-Day Heritage & Modern Tour",
      slug: "dubai-full-day",
      city: "Dubai",
      duration: "8 - 9 Hours",
      priceAed: 450,
      privateCarPrice: 450,
      image: "/images/hero/slide-1.jpg",
      description: "Complete immersion combining old-world historical charm with the futuristic architectural wonder of modern Dubai.",
      highlights: [
        "Al Fahidi Historical Fort & Bastakiya Quarter",
        "Traditional Wooden Abra Boat ride across Dubai Creek",
        "Gold Souk & Authentic Spice Souk shopping",
        "Dubai Frame & Zabeel Palace drive-through",
        "Burj Khalifa & Dubai Fountain Boardwalk"
      ],
      inclusions: [
        "Full 8-9 hours private chauffeur service",
        "Traditional wooden Abra boat ride ticket included",
        "Door-to-door hotel pickup and drop-off"
      ]
    },
    {
      title: "Abu Dhabi Capital Heritage & Grand Mosque",
      slug: "abu-dhabi-full-day",
      city: "Abu Dhabi",
      duration: "9 - 10 Hours",
      priceAed: 600,
      privateCarPrice: 600,
      image: "/images/hero/slide-3.jpg",
      description: "A majestic private day tour from Dubai to the UAE capital featuring the world's most magnificent architectural wonder.",
      highlights: [
        "Sheikh Zayed Grand Mosque (Full interior visit)",
        "Abu Dhabi Corniche Waterfront promenade",
        "Emirates Palace & Presidential Palace view",
        "Heritage Village traditional craft market",
        "Yas Island photo stop"
      ],
      inclusions: [
        "Round-trip private luxury highway transport from Dubai",
        "Dedicated chauffeur with local cultural knowledge",
        "Sheikh Zayed Mosque entrance coordination",
        "All expressway tolls and parking fees"
      ]
    }
  ];

  for (const tour of uaeCityToursData) {
    const existing = await prisma.uaeCityTour.findUnique({ where: { slug: tour.slug } });
    if (!existing) {
      await prisma.uaeCityTour.create({ data: tour });
      console.log(`✅ Seeded UAE City Tour: ${tour.title}`);
    }
  }

  // =========================================================================
  // 6. SERVICE 5: UAE DESERT SAFARI
  // =========================================================================
  const desertSafariData = [
    {
      title: "Evening Desert Safari with BBQ Dinner",
      slug: "evening-desert-safari",
      packageType: "Evening Safari",
      timing: "03:00 PM - 09:00 PM",
      priceAed: 180,
      image: "/images/hero/slide-3.jpg",
      description: "The classic Dubai desert experience with exciting 4x4 dune bashing, golden sunset photos, and complete Bedouin camp dinner.",
      activities: [
        "25-30 minutes exhilarating 4x4 red dune bashing",
        "Desert sunset photo stop on high dunes",
        "Camel riding & sandboarding experience",
        "Lavish 5-star international BBQ buffet dinner",
        "Live Tanoura dance, belly dance, and fire spectacle"
      ],
      includes: [
        "Hotel pickup and drop-off by 4x4 Land Cruiser",
        "Unlimited soft drinks, Arabic coffee (Gahwa) & fresh dates",
        "Henna hand designing for ladies",
        "Full international BBQ dinner with vegetarian options"
      ]
    },
    {
      title: "VIP Desert Safari (Private Majlis Table)",
      slug: "vip-desert-safari",
      packageType: "VIP Luxury Safari",
      timing: "03:00 PM - 09:30 PM",
      priceAed: 280,
      image: "/images/hero/slide-1.jpg",
      description: "Upgrade your desert evening with executive hospitality. Enjoy private 4x4 transfer, extended red dune driving, and reserved elevated majlis seating with hot table-served gourmet BBQ dinner and unobstructed stage views.",
      activities: [
        "Extended 35 minutes dune bashing across Lahbab red dunes",
        "Reserved raised VIP majlis seating area",
        "Hot table dinner service with dedicated attendant",
        "Front-row seats for international dance & fire shows",
        "Priority camel rides & unlimited sandboarding"
      ],
      includes: [
        "Private 4x4 Land Cruiser transfer from your hotel",
        "Exclusive waiter service at your table",
        "Gourmet BBQ buffet with dessert courses",
        "Unlimited premium refreshments"
      ]
    },
    {
      title: "Morning Adventure Safari & Dune Drive",
      slug: "morning-desert-safari",
      packageType: "Morning Safari",
      timing: "08:00 AM - 12:00 PM",
      priceAed: 220,
      image: "/images/hero/slide-2.jpg",
      description: "Beat the afternoon heat with an exhilarating morning dune bashing session, sand dune surfing, and optional high-power quad biking.",
      activities: [
        "Early morning dune drive across virgin sand ripples",
        "Sandboarding down steep dune slopes",
        "Morning camel trekking through open desert",
        "Optional quad biking / dune buggy rental"
      ],
      includes: [
        "8:00 AM hotel pickup in 4x4 Land Cruiser",
        "Licensed desert safari marshal driver",
        "Cold refreshments and mineral water",
        "Return hotel drop-off by 12:00 PM noon"
      ]
    }
  ];

  for (const safari of desertSafariData) {
    const existing = await prisma.desertSafariPackage.findUnique({ where: { slug: safari.slug } });
    if (!existing) {
      await prisma.desertSafariPackage.create({ data: safari });
      console.log(`✅ Seeded Desert Safari: ${safari.title}`);
    }
  }

  // =========================================================================
  // 7. SERVICE 6: UAE CAR RENTAL (Self-Drive & Chauffeur)
  // =========================================================================
  const carRentalData = [
    {
      name: "Nissan Sunny (or Similar)",
      slug: "nissan-sunny",
      category: "Economy Sedan",
      brand: "Nissan",
      year: 2024,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol (1.5L Efficient)",
      dailyPriceAed: 120,
      weeklyPriceAed: 750,
      monthlyPriceAed: 2400,
      image: "/images/fleet/toyota-camry.jpg",
      securityDeposit: 1000,
      freeMileagePerDay: 250,
      features: [
        "Ultra-fuel efficient 1.5L engine",
        "Smooth automatic transmission",
        "Touchscreen with Apple CarPlay & Bluetooth",
        "Ice-cold dual-zone climate control",
        "Salik automated toll tag pre-installed",
        "Complimentary delivery to Dubai Airport (DXB)"
      ],
      isSelfDrive: true,
      withDriverOption: true
    },
    {
      name: "Toyota Camry Executive",
      slug: "toyota-camry-rental",
      category: "Executive Sedan",
      brand: "Toyota",
      year: 2024,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol (2.5L Dynamic)",
      dailyPriceAed: 180,
      weeklyPriceAed: 1100,
      monthlyPriceAed: 3600,
      image: "/images/fleet/toyota-camry.jpg",
      securityDeposit: 1500,
      freeMileagePerDay: 250,
      features: [
        "Spacious ergonomic interior with premium upholstery",
        "Advanced radar cruise control and lane assist",
        "Chilled multi-zone automatic climate control",
        "Generous trunk space for heavy luggage",
        "Keyless push-button start and smart entry"
      ],
      isSelfDrive: true,
      withDriverOption: true
    },
    {
      name: "Hyundai Staria Luxury MPV",
      slug: "hyundai-staria-rental",
      category: "7-Seater Family MPV",
      brand: "Hyundai",
      year: 2024,
      seats: 7,
      transmission: "Automatic (8-Speed)",
      fuelType: "Petrol (3.5L V6)",
      dailyPriceAed: 350,
      weeklyPriceAed: 2200,
      monthlyPriceAed: 7200,
      image: "/images/fleet/hyundai-staria.jpg",
      securityDeposit: 2000,
      freeMileagePerDay: 250,
      features: [
        "Reclining premium captain chairs with armrests",
        "Independent rear digital climate control zones",
        "Dual power sliding passenger doors",
        "Large cargo space accommodating 8 full suitcases",
        "360-degree surround-view parking camera"
      ],
      isSelfDrive: true,
      withDriverOption: true
    },
    {
      name: "GMC Yukon XL VIP SUV",
      slug: "gmc-yukon-rental",
      category: "VIP Luxury SUV",
      brand: "GMC",
      year: 2024,
      seats: 7,
      transmission: "Automatic (10-Speed)",
      fuelType: "Petrol (5.3L EcoTec3 V8)",
      dailyPriceAed: 550,
      weeklyPriceAed: 3400,
      monthlyPriceAed: 11500,
      image: "/images/fleet/gmc-yukon.jpg",
      securityDeposit: 3000,
      freeMileagePerDay: 250,
      features: [
        "5.3L EcoTec3 V8 engine with seamless 10-speed transmission",
        "Ultra-plush leather seating with front seat cooling",
        "Massive extended XL trunk for oversized luggage",
        "Bose premium surround audio system",
        "High-power tri-zone rear air conditioning"
      ],
      isSelfDrive: true,
      withDriverOption: true
    },
    {
      name: "Mercedes-Benz V-Class VIP",
      slug: "mercedes-v-class-rental",
      category: "VIP Business Van",
      brand: "Mercedes-Benz",
      year: 2024,
      seats: 7,
      transmission: "Automatic (9G-TRONIC)",
      fuelType: "Diesel / Petrol",
      dailyPriceAed: 650,
      weeklyPriceAed: 4000,
      monthlyPriceAed: 13500,
      image: "/images/fleet/mercedes-vclass.jpg",
      securityDeposit: 3500,
      freeMileagePerDay: 250,
      features: [
        "Face-to-face conference luxury leather seating",
        "MBUX multimedia system with rear passenger USB ports",
        "Ambient interior mood lighting in multiple colors",
        "Electric sliding doors and automatic tailgate",
        "Privacy tinted acoustic glass windows"
      ],
      isSelfDrive: true,
      withDriverOption: true
    }
  ];

  for (const car of carRentalData) {
    const existing = await prisma.rentalCar.findUnique({ where: { slug: car.slug } });
    if (!existing) {
      await prisma.rentalCar.create({ data: car });
      console.log(`✅ Seeded Rental Car: ${car.name}`);
    }
  }

  console.log("🎉 ALL 6 SERVICES & INITIAL DATA SEEDED SUCCESSFULLY ON NEON POSTGRESQL!");
}

main()
  .catch((e) => {
    console.error("❌ Seed execution error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
