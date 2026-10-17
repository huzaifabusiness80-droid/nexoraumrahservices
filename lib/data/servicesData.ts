export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: "Umrah" | "UAE";
  image: string;
  bannerImage: string;
  startingPrice: string;
  currency: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  features: { title: string; desc: string }[];
  gridSpan: "square" | "wide"; // For the bento grid: wide or square
}

export const servicesData: ServiceItem[] = [
  {
    id: "umrah-transport",
    slug: "umrah-transport",
    title: "Umrah Transport",
    shortTitle: "UMRAH TRANSPORT",
    category: "Umrah",
    image: "/images/hero/slide-1.jpg",
    bannerImage: "/images/hero/slide-1.jpg",
    startingPrice: "100",
    currency: "SAR",
    shortDescription: "Private VIP airport transfers, intercity shuttles, and chauffeur services across Jeddah, Makkah, and Madinah.",
    fullDescription: "Nexora Journeys provides licensed, top-tier private transportation across the Holy Sanctuaries. Choose from our premium fleet of Toyota Camry, Hyundai Staria, GMC Yukon XL, Toyota HiAce, Luxury Coaster, and Executive Buses with professional, punctual chauffeurs.",
    highlights: [
      "Jeddah Airport to Makkah & Madinah transfers",
      "Intercity Makkah to Madinah express chauffeur",
      "Haramain High-Speed Train Station pick & drop",
      "Full luggage handling & meet-and-greet service",
      "Fixed transparent pricing with zero surge rates"
    ],
    features: [
      { title: "VIP Meet & Greet", desc: "Chauffeur waiting at terminal gates with your name board." },
      { title: "New 2024-2025 Fleet", desc: "Spotless, chilled climate-controlled vehicles sanitized daily." },
      { title: "24/7 Operations", desc: "Round-the-clock dispatch team tracking flights in real time." },
      { title: "All-Inclusive Rates", desc: "Toll taxes, fuel, and luggage assistance covered in pricing." }
    ],
    gridSpan: "square",
  },
  {
    id: "umrah-hotels",
    slug: "umrah-hotels",
    title: "Umrah Hotels",
    shortTitle: "UMRAH HOTELS",
    category: "Umrah",
    image: "/images/hero/slide-3.jpg",
    bannerImage: "/images/hero/slide-3.jpg",
    startingPrice: "16",
    currency: "SAR",
    shortDescription: "Verified hotel accommodations in Makkah & Madinah, from budget-friendly shuttles to 100M Haram view properties.",
    fullDescription: "Browse through 46 authentic hotels across Makkah and Madinah with transparent pricing for Sharing Beds, Double/Triple/Quad Beds, and Quint Beds. All rates are verified directly with hotel management for seamless pilgrimage stays.",
    highlights: [
      "23 Verified Makkah Hotels (Ajyad, Ibraheem Khalil, Al Hijrah)",
      "23 Verified Madinah Hotels (South Markazia, Bab Al Salam, Bilal Masjid)",
      "Walking distance (100M - 500M) and free 24/7 shuttle options",
      "Flexible room configurations: Sharing, Quad, Quint beds",
      "Guaranteed booking vouchers with direct reception check-in"
    ],
    features: [
      { title: "Walking Distance", desc: "Properties just steps away from the Grand Mosque & Prophet's Mosque." },
      { title: "Complimentary Shuttles", desc: "Continuous 24-hour AC shuttles direct to Haram pickup points." },
      { title: "Best Group Rates", desc: "Special discounted rates for families, groups, and Umrah delegations." },
      { title: "Instant Vouchers", desc: "Official confirmation vouchers issued directly upon reservation." }
    ],
    gridSpan: "square",
  },
  {
    id: "umrah-ziyarat",
    slug: "umrah-ziyarat",
    title: "Umrah Ziyarat & City Tours",
    shortTitle: "ZIYARAT & TOURS",
    category: "Umrah",
    image: "/images/hero/slide-4.jpg",
    bannerImage: "/images/hero/slide-4.jpg",
    startingPrice: "200",
    currency: "SAR",
    shortDescription: "Spiritual guided tours to Jabal Al Noor, Cave of Hira, Mount Arafat, Quba Mosque, Mount Uhud, and historical sites.",
    fullDescription: "Enrich your pilgrimage with our comprehensive historical Ziyarat tours in Makkah and Madinah. Led by respectful, knowledgeable drivers who guide you to the sacred landmarks where Islamic history unfolded.",
    highlights: [
      "Makkah Ziyarat: Cave Hira, Cave Thawr, Jabal Al-Rahmah (Arafat), Mina, Muzdalifah",
      "Masjid Aisha (Tan'eem) & Ji'ranah Umrah boundary points",
      "Madinah Ziyarat: Masjid Quba, Masjid Al-Qiblatayn, Mount Uhud & Martyrs' Cemetery",
      "Seven Mosques (Saba Masajid) & Date Farm visits",
      "Special excursions to Badar Battlefield & Wadi Al-Jinn (Magnetic Hill)"
    ],
    features: [
      { title: "Sacred Landmarks", desc: "Comfortable halts at holy sites with adequate time for prayers." },
      { title: "Private Vehicle Tour", desc: "Exclusive car for you and your family with no outside sharing." },
      { title: "Flexible Timings", desc: "Morning after Fajr or late afternoon schedules to beat the heat." },
      { title: "Knowledgeable Guidance", desc: "Drivers familiar with historical routes and parking spots." }
    ],
    gridSpan: "wide",
  },
  {
    id: "uae-city-tours",
    slug: "uae-city-tours",
    title: "Travels & Tourism",
    shortTitle: "TRAVELS & TOURISM",
    category: "UAE",
    image: "/images/hero/slide-2.jpg",
    bannerImage: "/images/hero/slide-2.jpg",
    startingPrice: "250",
    currency: "AED",
    shortDescription: "Full-day & half-day sightseeing tours of Dubai and Abu Dhabi covering Burj Khalifa, Sheikh Zayed Mosque & modern landmarks.",
    fullDescription: "Discover the breathtaking contrast of historic heritage and futuristic grandeur in the United Arab Emirates. Experience private guided tours across Dubai Marina, Burj Al Arab, Palm Jumeirah, and the awe-inspiring Sheikh Zayed Grand Mosque in Abu Dhabi.",
    highlights: [
      "Dubai Modern Highlights: Downtown, Dubai Mall, Burj Khalifa, Palm Jumeirah",
      "Dubai Old Town & Heritage: Al Fahidi Historical Neighborhood, Gold & Spice Souks",
      "Abu Dhabi Capital Tour: Sheikh Zayed Grand Mosque, Qasr Al Watan, Louvre Museum",
      "Flexible pickup from any hotel or airport across Dubai, Sharjah, or Abu Dhabi",
      "Chilled luxury vehicles with certified English-speaking tour guides"
    ],
    features: [
      { title: "Custom Itineraries", desc: "Tailor the stops, photo points, and shopping destinations to your taste." },
      { title: "Door-to-Door Service", desc: "Pickup and return directly from your hotel lobby." },
      { title: "VIP Access", desc: "Avoid long taxi queues with a dedicated vehicle throughout the day." },
      { title: "Family Comfort", desc: "Child safety seats and spacious legroom for children and elderly." }
    ],
    gridSpan: "wide",
  },
  {
    id: "uae-desert-safari",
    slug: "uae-desert-safari",
    title: "UAE Desert Safari",
    shortTitle: "DESERT SAFARI",
    category: "UAE",
    image: "/images/services/desertsafariimage.png",
    bannerImage: "/images/services/desertsafariimage.png",
    startingPrice: "180",
    currency: "AED",
    shortDescription: "Thrilling 4x4 dune bashing, golden sunset photography, camel trekking, and traditional Arabian BBQ camp entertainment.",
    fullDescription: "Escape the city skyline into the crimson dunes of the Arabian desert. Enjoy adrenaline-pumping 4x4 dune bashing with licensed desert safari marshals, sandboarding, falcon photography, followed by an authentic Bedouin camp BBQ dinner under starlit skies.",
    highlights: [
      "Thrilling 4x4 Red Dune Bashing with licensed desert safari drivers",
      "Sunset photography stops over panoramic golden desert crests",
      "Camel riding, sandboarding & optional quad biking (ATV)",
      "VIP Bedouin camp with live fire shows, Tanoura dancing, and Henna painting",
      "Lavish international BBQ buffet dinner with vegetarian and non-vegetarian menus"
    ],
    features: [
      { title: "Safety Certified", desc: "Specially equipped 4x4 Land Cruisers with reinforced roll cages." },
      { title: "VIP Camp Options", desc: "Private majlis seating with dedicated waiter table service." },
      { title: "Family Friendly", desc: "Gentle dune drive options available for families with infants." },
      { title: "Hotel Transfer Included", desc: "Convenient pickup and drop-off anywhere in Dubai or Sharjah." }
    ],
    gridSpan: "square",
  },
  {
    id: "uae-car-rental",
    slug: "uae-car-rental",
    title: "Car Rental",
    shortTitle: "CAR RENTAL",
    category: "UAE",
    image: "/images/services/car-rental-luxury.jpg",
    bannerImage: "/images/services/car-rental-luxury.jpg",
    startingPrice: "120",
    currency: "AED",
    shortDescription: "Premium self-drive and private chauffeur car rentals across Dubai, Abu Dhabi, and Sharjah with airport delivery.",
    fullDescription: "Whether you need a compact economy car for city errands, a luxury SUV for family road trips, or an executive limousine with private chauffeur, Nexora Journeys provides transparent car rentals with zero hidden fees and 24/7 roadside assistance.",
    highlights: [
      "Comprehensive fleet: Economy Sedans, Luxury SUVs, and VIP Chauffeur Cars",
      "Daily, weekly, and monthly long-term rental packages",
      "Complimentary delivery to Dubai International Airport (DXB) or hotel",
      "Full comprehensive insurance with Salik toll tracking",
      "No cumbersome paperwork — fast WhatsApp verification and key handover"
    ],
    features: [
      { title: "Transparent Pricing", desc: "Clear rental agreements with no hidden deposit surprises." },
      { title: "Unlimited Mileage Plans", desc: "Drive freely across all Emirates without restrictive mileage caps." },
      { title: "24/7 Road Assistance", desc: "Immediate replacement vehicle in the unlikely event of any issue." },
      { title: "Chauffeur Option", desc: "Sit back and relax with professional multilingual private drivers." }
    ],
    gridSpan: "square",
  },
];
