export interface CarRentalItem {
  id: string;
  name: string;
  category: string;
  passengers: string;
  luggage: string;
  transmission: string;
  fuelType: string;
  engine: string;
  dailyPriceAed: number;
  weeklyPriceAed: number;
  monthlyPriceAed: number;
  image: string;
  description: string;
  overview: string;
  features: string[];
  rentalRequirements: string[];
  inclusions: string[];
  pricingTiers: { duration: string; priceAed: number; note: string }[];
}

export const carRentalVehicles: CarRentalItem[] = [
  {
    id: "nissan-sunny",
    name: "Nissan Sunny (or Similar)",
    category: "Economy Sedan",
    passengers: "4 - 5 Passengers",
    luggage: "2 Suitcases",
    transmission: "Automatic",
    fuelType: "Petrol (1.5L Efficient)",
    engine: "1.5L 4-Cylinder DOHC",
    dailyPriceAed: 120,
    weeklyPriceAed: 750,
    monthlyPriceAed: 2400,
    image: "/images/fleet/toyota-camry.jpg",
    description: "Budget-friendly, highly fuel-efficient compact sedan perfect for city commutes in Dubai, Abu Dhabi, and daily family trips.",
    overview: "The Nissan Sunny delivers unparalleled value, exceptional fuel economy, and smooth maneuverability across Dubai traffic. Equipped with modern infotainment, Apple CarPlay, chilled air conditioning, and generous rear legroom for city commutes.",
    features: [
      "Ultra-fuel efficient 1.5L engine (18+ km/L)",
      "Smooth automatic transmission",
      "Touchscreen with Apple CarPlay & Bluetooth",
      "Ice-cold dual-zone climate control",
      "Salik automated toll tag pre-installed",
      "Complimentary delivery to Dubai Airport (DXB)"
    ],
    rentalRequirements: [
      "Valid Tourist Visa & Passport copy",
      "Home Country Driving License or International Driving Permit (IDP)",
      "Minimum Driver Age: 21 Years",
      "Transparent deposit via credit card or cash"
    ],
    inclusions: [
      "Comprehensive RTA UAE insurance coverage",
      "250 km daily mileage allowance included",
      "24/7 roadside mechanical assistance",
      "Free doorstep hotel or airport delivery"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 120, note: "Standard daily tariff" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 750, note: "Save ~15% compared to daily" },
      { duration: "Monthly Rate (30 Days)", priceAed: 2400, note: "Best value long-term tariff" }
    ]
  },
  {
    id: "toyota-camry",
    name: "Toyota Camry Executive",
    category: "Executive Sedan",
    passengers: "4 - 5 Passengers",
    luggage: "3 Suitcases",
    transmission: "Automatic",
    fuelType: "Petrol (2.5L Dynamic)",
    engine: "2.5L 4-Cylinder Dual VVT-i",
    dailyPriceAed: 180,
    weeklyPriceAed: 1100,
    monthlyPriceAed: 3600,
    image: "/images/fleet/toyota-camry.jpg",
    description: "Sophisticated executive sedan renowned for exceptional highway stability, quiet cabin acoustics, and plush seating.",
    overview: "A timeless benchmark of executive comfort and rock-solid reliability. The Toyota Camry is ideally suited for business visitors, family holidays, and smooth highway journeys between Dubai and Abu Dhabi with superior comfort.",
    features: [
      "Spacious ergonomic interior with premium upholstery",
      "Advanced radar cruise control and lane assist",
      "Chilled multi-zone automatic climate control",
      "Generous 524-liter trunk space for heavy luggage",
      "Keyless push-button start and smart entry",
      "Automated Salik toll tag and reverse camera"
    ],
    rentalRequirements: [
      "Valid Tourist Visa & Passport copy",
      "Home Country Driving License or International Driving Permit (IDP)",
      "Minimum Driver Age: 21 Years",
      "Zero hidden administrative fees"
    ],
    inclusions: [
      "Full comprehensive insurance with collision damage waiver",
      "250 km/day mileage allowance",
      "Complimentary doorstep delivery in Dubai and Sharjah",
      "Dedicated 24/7 customer support hotline"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 180, note: "Standard executive tariff" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 1100, note: "Save 15% on weekly booking" },
      { duration: "Monthly Rate (30 Days)", priceAed: 3600, note: "Corporate & long-stay tariff" }
    ]
  },
  {
    id: "hyundai-staria",
    name: "Hyundai Staria Luxury MPV",
    category: "7-Seater Family MPV",
    passengers: "7 Passengers",
    luggage: "6 - 8 Suitcases",
    transmission: "Automatic (8-Speed)",
    fuelType: "Petrol (3.5L V6)",
    engine: "3.5L Smartstream V6",
    dailyPriceAed: 350,
    weeklyPriceAed: 2200,
    monthlyPriceAed: 7200,
    image: "/images/fleet/hyundai-staria.jpg",
    description: "Futuristic 7-seater luxury family carrier featuring panoramic glass windows, reclining captain chairs, and expansive luggage space.",
    overview: "Designed for discerning families and small VIP groups touring the Emirates. With ultra-modern lounge seating, independent rear air conditioning, and massive cargo volume, the Hyundai Staria transforms road trips into first-class journeys.",
    features: [
      "Reclining premium captain chairs with armrests",
      "Independent rear digital climate control zones",
      "Dual power sliding passenger doors",
      "Panoramic vista side windows for skyline viewing",
      "Large cargo space accommodating 8 full suitcases",
      "360-degree surround-view parking camera"
    ],
    rentalRequirements: [
      "Passport with valid UAE tourist or resident visa",
      "Home driving license or international driving permit",
      "Minimum Driver Age: 23 Years",
      "Deposit refundable upon vehicle return"
    ],
    inclusions: [
      "Comprehensive insurance covering all passengers",
      "250 km daily mileage allowance",
      "Free pickup and return at DXB, AUH, or DWC airports",
      "Optional professional chauffeur service upon request"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 350, note: "Family daily rate" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 2200, note: "Save over 15% per week" },
      { duration: "Monthly Rate (30 Days)", priceAed: 7200, note: "Extended family stay rate" }
    ]
  },
  {
    id: "gmc-yukon-xl",
    name: "GMC Yukon XL VIP SUV",
    category: "VIP Full-Size Luxury SUV",
    passengers: "7 VIP Passengers",
    luggage: "7 Suitcases",
    transmission: "Automatic (10-Speed)",
    fuelType: "Petrol (5.3L EcoTec3 V8)",
    engine: "5.3L V8 Powerhouse",
    dailyPriceAed: 550,
    weeklyPriceAed: 3400,
    monthlyPriceAed: 11500,
    image: "/images/fleet/gmc-yukon.jpg",
    description: "The gold standard of luxury travel in the Gulf. Imposing road presence, V8 power, plush leather upholstery, and VIP prestige.",
    overview: "Command the highways of the UAE in unmatched luxury and safety. The GMC Yukon XL offers an authoritative driving position, magnetic ride control, perforated leather seats, and generous space for 7 passengers with full airport luggage.",
    features: [
      "5.3L EcoTec3 V8 engine with seamless 10-speed transmission",
      "Ultra-plush leather seating with front seat cooling",
      "Massive extended XL trunk for oversized luggage",
      "Bose premium surround audio system",
      "High-power tri-zone rear air conditioning",
      "Available for self-drive or dedicated VIP chauffeur"
    ],
    rentalRequirements: [
      "Passport and valid visa copy",
      "Valid driving license (Home country or IDP)",
      "Minimum Driver Age: 25 Years",
      "Standard luxury vehicle security authorization"
    ],
    inclusions: [
      "VIP Comprehensive insurance package",
      "Free VIP doorstep delivery at 5-star hotels or airport VIP lounge",
      "24/7 dedicated fleet concierge support",
      "250 km daily mileage included"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 550, note: "VIP daily tariff" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 3400, note: "Weekly executive discount" },
      { duration: "Monthly Rate (30 Days)", priceAed: 11500, note: "Monthly VIP package" }
    ]
  },
  {
    id: "mercedes-v-class",
    name: "Mercedes-Benz V-Class VIP",
    category: "VIP Business Van",
    passengers: "6 - 7 Guests",
    luggage: "6 Suitcases",
    transmission: "Automatic (9G-TRONIC)",
    fuelType: "Diesel / Petrol",
    engine: "2.0L Turbocharged Direct Injection",
    dailyPriceAed: 650,
    weeklyPriceAed: 4000,
    monthlyPriceAed: 13500,
    image: "/images/fleet/mercedes-vclass.jpg",
    description: "Exclusive German luxury business transporter with conference-style captain chairs, ambient lighting, and executive privacy.",
    overview: "Crafted for executive delegations, dignitaries, and luxury family vacations. The Mercedes-Benz V-Class blends German engineering, whisper-quiet cabin insulation, privacy glass, and face-to-face conference seating.",
    features: [
      "Face-to-face conference luxury leather seating",
      "MBUX multimedia system with rear passenger USB ports",
      "Ambient interior mood lighting in multiple colors",
      "Electric sliding doors and automatic tailgate",
      "Privacy tinted acoustic glass windows",
      "Air suspension for smooth boulevard cruising"
    ],
    rentalRequirements: [
      "Passport and valid UAE entry visa",
      "Valid driving license or IDP",
      "Minimum Driver Age: 25 Years",
      "Refundable security deposit"
    ],
    inclusions: [
      "Comprehensive insurance with excess protection",
      "250 km daily allowance",
      "Complimentary VIP delivery to Dubai International Airport",
      "24/7 roadside assistance"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 650, note: "VIP business tariff" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 4000, note: "Weekly executive package" },
      { duration: "Monthly Rate (30 Days)", priceAed: 13500, note: "Monthly corporate rate" }
    ]
  },
  {
    id: "toyota-hiace",
    name: "Toyota HiAce Passenger Van",
    category: "Group Passenger Van",
    passengers: "12 - 14 Passengers",
    luggage: "10 Suitcases",
    transmission: "Automatic",
    fuelType: "Petrol (3.5L V6)",
    engine: "3.5L High-Output V6",
    dailyPriceAed: 450,
    weeklyPriceAed: 2800,
    monthlyPriceAed: 9500,
    image: "/images/fleet/toyota-hiace.jpg",
    description: "Spacious high-roof 14-seater passenger van designed for family groups, event delegates, and guided UAE city tours.",
    overview: "The most trusted passenger transport van in the UAE. Engineered with high-roof headroom, individual overhead AC vents for every passenger row, and ample cargo storage for group road trips across the seven Emirates.",
    features: [
      "High-roof design allowing comfortable walk-through entry",
      "Individual overhead air vents for every single seat",
      "Capacity for up to 14 passengers with 10 suitcases",
      "Durable, clean, and comfortable interior",
      "Salik automated toll tag pre-installed",
      "Available with or without professional chauffeur"
    ],
    rentalRequirements: [
      "Valid Tourist Visa & Passport copy",
      "Appropriate valid driving license or IDP",
      "Minimum Driver Age: 23 Years",
      "Standard refundable vehicle security deposit"
    ],
    inclusions: [
      "Commercial passenger liability insurance",
      "250 km daily mileage allowance included",
      "Free delivery to your hotel in Dubai or Sharjah",
      "Round-the-clock roadside emergency support"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 450, note: "Group daily tariff" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 2800, note: "Weekly group saving" },
      { duration: "Monthly Rate (30 Days)", priceAed: 9500, note: "Monthly group rate" }
    ]
  },
  {
    id: "toyota-coaster",
    name: "Toyota Luxury Coaster Minibus",
    category: "Minibus Group Transport",
    passengers: "20 - 24 Guests",
    luggage: "18 Suitcases",
    transmission: "Manual / Automatic",
    fuelType: "Diesel / Petrol",
    engine: "4.0L Heavy Duty Engine",
    dailyPriceAed: 750,
    weeklyPriceAed: 4500,
    monthlyPriceAed: 15000,
    image: "/images/fleet/toyota-coaster.jpg",
    description: "Comfortable high-capacity 24-seater luxury coaster minibus for large pilgrim groups, corporate excursions, and private charters.",
    overview: "Built to transport large groups with uncompromising reliability and maximum air conditioning performance under the Arabian sun. Includes reclining seats, wide aisle, luggage racks, and public address microphone system.",
    features: [
      "24 comfortable reclining passenger seats with seatbelts",
      "Heavy-duty roof air conditioning system with individual nozzles",
      "Under-seat and rear luggage compartments",
      "Microphone and audio system for tour announcements",
      "Wide center aisle and automatic passenger entry door",
      "Available with certified RTA-licensed chauffeur"
    ],
    rentalRequirements: [
      "Passport and tourist/business visa copy",
      "Heavy vehicle license (if self-drive) or booking with driver",
      "Advance booking confirmation"
    ],
    inclusions: [
      "Comprehensive RTA passenger fleet insurance",
      "All UAE highway tolls and parking charges included with driver option",
      "24/7 dedicated transport dispatch officer"
    ],
    pricingTiers: [
      { duration: "Daily Rate (1 - 6 Days)", priceAed: 750, note: "Minibus daily charter" },
      { duration: "Weekly Rate (7+ Days)", priceAed: 4500, note: "Weekly group charter" },
      { duration: "Monthly Rate (30 Days)", priceAed: 15000, note: "Monthly corporate shuttle" }
    ]
  }
];
