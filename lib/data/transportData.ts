export interface VehicleRouteRate {
  route: string;
  priceSar: number;
}

export interface TransportVehicle {
  id: string;
  name: string;
  category: string;
  seats: string;
  luggage: string;
  image: string;
  posterImage?: string;
  startingPriceSar: number;
  description: string;
  features: string[];
  rateList: VehicleRouteRate[];
}

export const transportVehicles: TransportVehicle[] = [
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
    rateList: [
      { route: "Jeddah Airport → Jeddah Hotel (Drop Off)", priceSar: 170 },
      { route: "Jeddah Airport → Madina Hotel", priceSar: 450 },
      { route: "Jeddah → Makkah Hotel (Drop Off)", priceSar: 250 },
      { route: "Makkah → Jeddah Airport (Drop Off)", priceSar: 200 },
      { route: "Makkah → Madina Hotel (Drop Off)", priceSar: 400 },
      { route: "Makkah → Madina Hotel via Badar", priceSar: 500 },
      { route: "Madina Airport → Madina Hotel (Drop Off)", priceSar: 200 },
      { route: "Madina → Madina Airport (Drop Off)", priceSar: 120 },
      { route: "Madina → Jeddah Airport (Drop Off)", priceSar: 400 },
      { route: "Madina → Makkah Hotel (Drop Off)", priceSar: 400 },
      { route: "Madina → Makkah Hotel via Badar", priceSar: 500 },
      { route: "Madina Hotel → Train Station", priceSar: 100 },
      { route: "Madina Train Station → Madina Hotel", priceSar: 150 },
      { route: "Madina Ziyarat", priceSar: 200 },
      { route: "Madina Ziyarat with Wadi Jin", priceSar: 299 },
      { route: "Madina → Badar Ziyarat", priceSar: 399 },
      { route: "Makkah Hotel → Train Station", priceSar: 120 },
      { route: "Makkah Train Station → Hotel", priceSar: 150 },
      { route: "Makkah Ziyarat", priceSar: 249 },
      { route: "Makkah Ziyarat with Masjid Ayesha", priceSar: 299 },
    ],
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
    rateList: [
      { route: "Jeddah Airport to Jeddah Hotel Drop Off", priceSar: 250 },
      { route: "Jeddah Airport to Madina Hotel", priceSar: 550 },
      { route: "Jeddah to Makkah Hotel Drop Off", priceSar: 350 },
      { route: "Makkah to Jeddah Airport Drop Off", priceSar: 300 },
      { route: "Makkah to Madina Hotel Drop Off", priceSar: 500 },
      { route: "Makkah to Madina Hotel via Badar", priceSar: 650 },
      { route: "Madina Airport to Madina Hotel Drop Off", priceSar: 250 },
      { route: "Madina to Madina Airport Drop Off", priceSar: 150 },
      { route: "Madina to Jeddah Airport Drop Off", priceSar: 500 },
      { route: "Madina to Makkah Hotel Drop Off", priceSar: 500 },
      { route: "Madina to Makkah Hotel via Badar", priceSar: 650 },
      { route: "Madina Hotel to Train Station", priceSar: 150 },
      { route: "Madina Train Station to Madina Hotel", priceSar: 200 },
      { route: "Madina Ziyarat", priceSar: 285 },
      { route: "Madina Ziyarat with Wadi Jin", priceSar: 350 },
      { route: "Madina to Badar Ziyarat", priceSar: 449 },
      { route: "Makkah Hotel to Train Station", priceSar: 150 },
      { route: "Makkah Train Station to Hotel", priceSar: 200 },
      { route: "Makkah Ziyarat", priceSar: 299 },
      { route: "Makkah Ziyarat with Masjid Ayesha", priceSar: 349 },
    ],
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
    rateList: [
      { route: "Jeddah Airport to Jeddah Hotel Drop Off", priceSar: 300 },
      { route: "Jeddah Airport to Madina Hotel", priceSar: 1000 },
      { route: "Jeddah to Makkah Hotel Drop Off", priceSar: 499 },
      { route: "Makkah to Jeddah Airport Drop Off", priceSar: 400 },
      { route: "Makkah to Madina Hotel Drop Off", priceSar: 950 },
      { route: "Makkah to Madina Hotel via Badar", priceSar: 1150 },
      { route: "Madina Airport to Madina Hotel Drop Off", priceSar: 399 },
      { route: "Madina to Madina Airport Drop Off", priceSar: 300 },
      { route: "Madina to Jeddah Airport Drop Off", priceSar: 999 },
      { route: "Madina to Makkah Hotel Drop Off", priceSar: 999 },
      { route: "Madina to Makkah Hotel via Badar", priceSar: 1150 },
      { route: "Madina Hotel to Train Station", priceSar: 250 },
      { route: "Madina Train Station to Madina Hotel", priceSar: 250 },
      { route: "Madina Ziyarat", priceSar: 400 },
      { route: "Madina Ziyarat with Wadi Jin", priceSar: 499 },
      { route: "Madina to Badar Ziyarat", priceSar: 549 },
      { route: "Makkah Hotel to Train Station", priceSar: 300 },
      { route: "Makkah Train Station to Hotel", priceSar: 250 },
      { route: "Makkah Ziyarat", priceSar: 449 },
      { route: "Makkah Ziyarat with Masjid Ayesha", priceSar: 499 },
    ],
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
    rateList: [
      { route: "Jeddah Airport to Makkah Hotel", priceSar: 340 },
      { route: "Jeddah Airport to Madinah Hotel", priceSar: 620 },
      { route: "Makkah Hotel to Jeddah Airport", priceSar: 300 },
      { route: "Medinah Airport to Medinah Hotel", priceSar: 300 },
      { route: "Medinah Hotel to Medinah Airport", priceSar: 230 },
      { route: "Makkah Hotel to Madinah Hotel", priceSar: 600 },
      { route: "Madinah Hotel to Makkah Hotel", priceSar: 600 },
      { route: "Ziyarat Makkah", priceSar: 300 },
      { route: "Ziyarat Madinah", priceSar: 350 },
    ],
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
    rateList: [
      { route: "Jeddah Airport to Makkah Hotel", priceSar: 550 },
      { route: "Jeddah Airport to Madinah Hotel", priceSar: 940 },
      { route: "Makkah Hotel to Jeddah Airport", priceSar: 420 },
      { route: "Medinah Airport to Medinah Hotel", priceSar: 450 },
      { route: "Medinah Hotel to Medinah Airport", priceSar: 350 },
      { route: "Makkah Hotel to Madinah Hotel", priceSar: 900 },
      { route: "Madinah Hotel to Makkah Hotel", priceSar: 900 },
      { route: "Ziyarat Makkah", priceSar: 500 },
      { route: "Ziyarat Madinah", priceSar: 400 },
    ],
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
    rateList: [
      { route: "Jeddah Airport to Makkah Hotel", priceSar: 650 },
      { route: "Jeddah Airport to Madinah Hotel", priceSar: 1150 },
      { route: "Makkah Hotel to Jeddah Airport", priceSar: 550 },
      { route: "Medinah Airport to Medinah Hotel", priceSar: 550 },
      { route: "Medinah Hotel to Medinah Airport", priceSar: 500 },
      { route: "Makkah Hotel to Madinah Hotel", priceSar: 1150 },
      { route: "Madinah Hotel to Makkah Hotel", priceSar: 1150 },
      { route: "Ziyarat Makkah", priceSar: 550 },
      { route: "Ziyarat Madinah", priceSar: 500 },
    ],
  },
];
