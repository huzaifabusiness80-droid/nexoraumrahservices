export interface UaeTourItem {
  id: string;
  title: string;
  category: "city-tour" | "desert-safari";
  duration: string;
  priceAed: number;
  image: string;
  badge: string;
  description: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
}

export const uaeTours: UaeTourItem[] = [
  {
    id: "dubai-half-day",
    title: "Dubai Half-Day Modern Highlights",
    category: "city-tour",
    duration: "4 - 5 Hours",
    priceAed: 250,
    image: "/images/hero/slide-2.jpg",
    badge: "Most Popular City Tour",
    description: "Ideal introductory tour of iconic Dubai landmarks with memorable photo stops at Burj Al Arab, Palm Jumeirah, Dubai Marina, and Downtown.",
    overview: "Experience the glittering skyline and world-famous architectural marvels of modern Dubai in private air-conditioned comfort. Your dedicated driver picks you up directly from your hotel and guides you through the city's celebrated coastal and downtown landmarks.",
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
      "All parking, fuel, and Salik toll charges included",
      "Customizable photo stops along the route"
    ]
  },
  {
    id: "dubai-full-day",
    title: "Dubai Full-Day Heritage & Modern Tour",
    category: "city-tour",
    duration: "8 - 9 Hours",
    priceAed: 450,
    image: "/images/hero/slide-1.jpg",
    badge: "Heritage & Modern Dubai",
    description: "Complete immersion combining old-world historical charm with the futuristic architectural wonder of modern Dubai.",
    overview: "A comprehensive day excursion tracing the evolution of Dubai from a historic pearl-diving village along Dubai Creek to a global metropolis of futuristic skyscrapers.",
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
      "Door-to-door hotel pickup and drop-off",
      "Complimentary chilled bottled water"
    ]
  },
  {
    id: "abu-dhabi-full-day",
    title: "Abu Dhabi Capital Heritage & Grand Mosque",
    category: "city-tour",
    duration: "9 - 10 Hours",
    priceAed: 600,
    image: "/images/hero/slide-3.jpg",
    badge: "Capital Architectural Wonder",
    description: "A majestic private day tour from Dubai to the UAE capital featuring the world's most magnificent architectural wonder.",
    overview: "Journey across the desert highway from Dubai to Abu Dhabi, the capital of the UAE. Marvel at the white marble domes and crystal chandeliers of Sheikh Zayed Grand Mosque, stroll the Corniche, and glimpse royal palatial landmarks.",
    highlights: [
      "Sheikh Zayed Grand Mosque (Full interior visit)",
      "Abu Dhabi Corniche Waterfront promenade",
      "Emirates Palace & Presidential Palace (Qasr Al Watan view)",
      "Heritage Village traditional craft market",
      "Yas Island (Ferrari World & Warner Bros photo point)"
    ],
    inclusions: [
      "Round-trip private luxury highway transport from Dubai",
      "Dedicated chauffeur with local Abu Dhabi cultural knowledge",
      "Sheikh Zayed Mosque entrance coordination",
      "All expressway tolls and parking fees"
    ]
  },
  {
    id: "evening-desert-safari",
    title: "Evening Desert Safari with BBQ Dinner",
    category: "desert-safari",
    duration: "6 Hours (3:00 PM – 9:00 PM)",
    priceAed: 180,
    image: "/images/hero/slide-3.jpg",
    badge: "Classic Arabian Safari",
    description: "The classic Dubai desert experience with exciting 4x4 dune bashing, golden sunset photos, and complete Bedouin camp dinner.",
    overview: "Venture deep into the golden red sand dunes of the Lahbab desert. Experience heart-pounding dune bashing in an insured Land Cruiser, surf the steep dunes on sandboards, and relax in a traditional Bedouin camp with live entertainment and BBQ dinner.",
    highlights: [
      "25-30 minutes exhilarating 4x4 red dune bashing",
      "Desert sunset photo stop on high dunes",
      "Camel riding & sandboarding experience",
      "Lavish 5-star international BBQ buffet dinner",
      "Live Tanoura dance, belly dance, and fire spectacle"
    ],
    inclusions: [
      "Hotel pickup and drop-off by 4x4 Land Cruiser",
      "Unlimited soft drinks, Arabic coffee (Gahwa) & fresh dates",
      "Henna hand designing for ladies",
      "Full international BBQ dinner with vegetarian options"
    ]
  },
  {
    id: "vip-desert-safari",
    title: "VIP Desert Safari (Private Majlis Table)",
    category: "desert-safari",
    duration: "6.5 Hours (3:00 PM – 9:30 PM)",
    priceAed: 280,
    image: "/images/hero/slide-1.jpg",
    badge: "VIP Table Service",
    description: "All the thrills of the desert with priority service, exclusive elevated majlis seating, and dedicated waiter table service.",
    overview: "Upgrade your desert evening with executive hospitality. Enjoy private 4x4 transfer, extended red dune driving, and reserved elevated majlis seating with hot table-served gourmet BBQ dinner and unobstructed stage views.",
    highlights: [
      "Extended 35 minutes dune bashing across Lahbab red dunes",
      "Reserved raised VIP majlis seating area",
      "Hot table dinner service with dedicated attendant",
      "Front-row seats for international dance & fire shows",
      "Priority camel rides & unlimited sandboarding"
    ],
    inclusions: [
      "Private 4x4 Land Cruiser transfer from your hotel",
      "Exclusive waiter service at your table",
      "Gourmet BBQ buffet with dessert courses",
      "Unlimited premium refreshments"
    ]
  },
  {
    id: "morning-desert-safari",
    title: "Morning Adventure Safari & Dune Drive",
    category: "desert-safari",
    duration: "4 Hours (8:00 AM – 12:00 PM)",
    priceAed: 220,
    image: "/images/hero/slide-2.jpg",
    badge: "Action & Morning Adventure",
    description: "Beat the afternoon heat with an exhilarating morning dune bashing session, sand dune surfing, and optional high-power quad biking.",
    overview: "Enjoy the crisp morning desert air and stunning golden morning light. Ideal for travelers with busy evening schedules who wish to experience pure off-road driving thrills.",
    highlights: [
      "Early morning dune drive across virgin sand ripples",
      "Sandboarding down steep dune slopes",
      "Morning camel trekking through open desert",
      "Optional quad biking / dune buggy rental"
    ],
    inclusions: [
      "8:00 AM hotel pickup in 4x4 Land Cruiser",
      "Licensed desert safari marshal driver",
      "Cold refreshments and mineral water",
      "Return hotel drop-off by 12:00 PM noon"
    ]
  }
];
