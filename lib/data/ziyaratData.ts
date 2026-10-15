export interface ZiyaratTourItem {
  id: string;
  title: string;
  city: "makkah" | "madinah" | "excursion";
  duration: string;
  startingPriceSar: number;
  image: string;
  badge: string;
  description: string;
  overview: string;
  stops: { name: string; description: string }[];
  vehiclePrices: { vehicle: string; capacity: string; luggage: string; priceSar: number }[];
  inclusions: string[];
}

export const ziyaratTours: ZiyaratTourItem[] = [
  {
    id: "makkah-holy-ziyarat",
    title: "Makkah Complete Sacred Ziyarat Tour",
    city: "makkah",
    duration: "3.5 - 4 Hours",
    startingPriceSar: 249,
    image: "/images/hero/slide-1.jpg",
    badge: "5 Holy Revelation Sites",
    description: "Comprehensive private historical tour of Makkah Al-Mukarramah. Covers the mountains of initial Quranic revelation, the sanctuary of Hijrah, the sacred grounds of Hajj, and Miqat Tan'eem with dedicated chauffeur.",
    overview: "This spiritual excursion takes pilgrims through the profound historical milestones of early Islam in Makkah Al-Mukarramah. With private door-to-door hotel transfers, experienced chauffeurs guide you across the blessed mountains and valleys that shaped the Prophetic mission.",
    stops: [
      { name: "Jabal Al-Noor (Cave of Hira)", description: "The mountain of light where Angel Jibril (AS) conveyed the first divine revelation (Surah Al-Alaq) to Prophet Muhammad ﷺ." },
      { name: "Jabal Thawr (Cave of Sanctuary)", description: "The cave where Prophet Muhammad ﷺ and Sayyidna Abu Bakr As-Siddiq (RA) took refuge during the historic migration (Hijrah) to Madinah." },
      { name: "Jabal Al-Rahmah & Plains of Arafat", description: "The sacred mount of divine mercy where the Prophet ﷺ delivered the historic Farewell Sermon to over 100,000 companions." },
      { name: "Mina Tent City & Jamarat", description: "The monumental white tent city, sacred Muzdalifah open plain, and the towering Jamarat stone stoning pillars of Hajj." },
      { name: "Masjid Aisha (Tan'eem Miqat)", description: "The established Miqat boundary where pilgrims enter Ihram with fresh intentions to perform voluntary Umrah." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 249 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 299 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 449 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 300 },
      { vehicle: "Luxury Coaster", capacity: "15 - 24 Guests", luggage: "15 Bags", priceSar: 500 },
    ],
    inclusions: [
      "Doorstep hotel pickup and return transfer in Makkah",
      "Private air-conditioned vehicle exclusively for your family/group",
      "Knowledgeable, courteous multilingual chauffeur (Urdu/English/Arabic)",
      "All road tolls, municipal parking, and fuel costs included",
      "Ample dedicated wait time at each historic sanctuary"
    ]
  },
  {
    id: "madinah-holy-ziyarat",
    title: "Madinah Blessed Historical Sanctuaries Tour",
    city: "madinah",
    duration: "3.5 - 4 Hours",
    startingPriceSar: 200,
    image: "/images/hero/slide-3.jpg",
    badge: "Reward of Full Umrah",
    description: "Heartwarming journey through the City of the Prophet ﷺ. Offer two voluntary rakats at Masjid Quba for the reward of a complete Umrah, pay respects at Mount Uhud Shuhada, and visit the Mosque of the Two Qiblas.",
    overview: "Visit the serene and blessed historical monuments of Madinah Al-Munawwarah. Experience the first mosque built in Islam, honor the martyrs of early Islam at Uhud, and behold the place where the direction of prayer was divinely turned toward the Holy Kaaba.",
    stops: [
      { name: "Masjid Quba", description: "The first mosque in Islam. As narrated in authentic Hadith, praying two voluntary rakats here confers the spiritual reward of performing a complete Umrah." },
      { name: "Mount Uhud & Martyrs' Cemetery", description: "The momentous battlefield where Sayyid al-Shuhada Hamza (RA) and 70 noble Sahabah gave their lives for Islam." },
      { name: "Masjid Al-Qiblatayn", description: "The unique sanctuary where divine revelation commanded the shift of the prayer orientation from Jerusalem to the Holy Kaaba." },
      { name: "The Seven Mosques (Saba Masajid)", description: "The historical command posts and trenches dug during the critical Battle of the Trench (Ghazwah al-Khandaq)." },
      { name: "Historical Date Gardens of Madinah", description: "Traditional Madinah date plantations where authentic Ajwa and Safawi dates are harvested." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 200 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 285 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 400 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 350 },
      { vehicle: "Luxury Coaster", capacity: "15 - 24 Guests", luggage: "15 Bags", priceSar: 400 },
    ],
    inclusions: [
      "Doorstep pickup from any hotel in Madinah (Central Markazia or Outer)",
      "Dedicated private vehicle exclusively for your group",
      "Multilingual courteous chauffeur",
      "Complimentary bottled water and wait times at all monuments",
      "Zero hidden fees or extra parking charges"
    ]
  },
  {
    id: "madinah-wadi-jin",
    title: "Madinah Ziyarat + Wadi Al-Jinn Magnetic Hill",
    city: "madinah",
    duration: "5 - 6 Hours",
    startingPriceSar: 299,
    image: "/images/hero/slide-4.jpg",
    badge: "Natural Wonder Valley",
    description: "Combines all principal Madinah city Ziyarat stops with a scenic desert drive 30 km north to the geological mystery of Wadi Al-Baida (Wadi Jin), where vehicles roll uphill in neutral gear.",
    overview: "An extended half-day itinerary combining deep spiritual discovery with a visit to the astonishing anti-gravity phenomenon of Wadi Al-Baida. Watch in awe as the vehicle glides uphill on neutral without applying accelerator power.",
    stops: [
      { name: "Masjid Quba & Mount Uhud", description: "Complete early morning prayer and ziyarat at the two primary sanctuaries of Madinah." },
      { name: "Wadi Al-Jinn (Magnetic Hill Valley)", description: "The renowned valley where gravitational anomaly pulls neutral vehicles uphill at speeds up to 120 km/h." },
      { name: "Al-Baida Desert Scenic Dunes", description: "Spectacular dramatic volcanic desert rock formations and golden sands ideal for family photography." },
      { name: "Masjid Al-Qiblatayn & Saba Masajid", description: "Historical mosques on the return loop into central Madinah." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 299 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 350 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 499 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 450 },
      { vehicle: "Luxury Coaster", capacity: "15 - 24 Guests", luggage: "15 Bags", priceSar: 650 },
    ],
    inclusions: [
      "Full Madinah Holy Ziyarat + 30 km desert valley trip",
      "Vehicle anti-gravity live demonstration in Wadi Al-Baida",
      "Chilled air-conditioned private vehicle",
      "All tolls and parking included"
    ]
  },
  {
    id: "badar-battlefield",
    title: "Historical Battlefield of Badar Pilgrimage",
    city: "excursion",
    duration: "6 - 7 Hours",
    startingPriceSar: 399,
    image: "/images/hero/slide-2.jpg",
    badge: "First Decisive Battle of Islam",
    description: "Memorable private day excursion from Madinah across 150 km to the historic plains of Badar. Visit the Shuhada Cemetery of Badar, the site of Al-Areesh tent of the Prophet ﷺ, and the Red Dune sands of victory.",
    overview: "Traverse the desert highway toward the Red Sea coast to the sacred grounds of Ghazwah Badar, fought on Friday the 17th of Ramadan, 2 AH. A profoundly emotional pilgrimage for every Muslim believer.",
    stops: [
      { name: "Martyrs Cemetery of Badar (14 Shuhada)", description: "The peaceful walled cemetery containing the noble Sahabah who achieved martyrdom at Badar." },
      { name: "Site of Al-Areesh Prayer Sanctuary", description: "The exact command post where Prophet Muhammad ﷺ spent the night weeping and making dua before divine victory arrived." },
      { name: "Al-Udwat Al-Dunya & Al-Quswa", description: "The two hilltops mentioned directly in Surah Al-Anfal where the Muslim and pagan armies encamped." },
      { name: "Red Dune of Divine Angels (Katheeb Al-Hanan)", description: "The red sand dune where thousand angels descended from the heavens to assist the early believers." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 399 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 449 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 549 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 600 },
      { vehicle: "Luxury Coaster", capacity: "15 - 24 Guests", luggage: "15 Bags", priceSar: 900 },
    ],
    inclusions: [
      "Round-trip long-distance private highway transport from Madinah (300 km total)",
      "Experienced highway chauffeur with Badar route knowledge",
      "Door-to-door hotel pickup and drop-off",
      "Flexible schedule with lunch / prayer stops"
    ]
  },
  {
    id: "taif-mountain-tour",
    title: "Taif Mountain Day Tour from Makkah",
    city: "excursion",
    duration: "7 - 8 Hours",
    startingPriceSar: 450,
    image: "/images/hero/slide-1.jpg",
    badge: "Cool Mountain City & Rose Gardens",
    description: "Scenic private day trip ascending through the hairpin bends of Al-Hada mountain road to Taif. Visit Masjid Addas, Masjid Abdullah Ibn Abbas, the Rose Water Distilleries, and Fruit Markets with return drop-off to your Makkah hotel.",
    overview: "Ascend 2,000 meters above sea level to the cool climate of Taif, known historically as the city of roses and stone fruit orchards. Experience the site where Christian slave Addas embraced Islam and visit the tomb of the cousin of the Prophet ﷺ.",
    stops: [
      { name: "Al-Hada Scenic Mountain Pass", description: "Spectacular winding mountain highway with baboons, cooler temperatures, and breathtaking views." },
      { name: "Masjid Abdullah Ibn Abbas (RA)", description: "The historic mosque and resting place of the great scholar of the Quran, Sayyidna Ibn Abbas." },
      { name: "Garden of Addas & Masjid Addas", description: "The serene orchard where the Prophet ﷺ was offered grapes by Addas after the trials of Taif." },
      { name: "Traditional Rose Water Distillery", description: "Watch natural distillation of the legendary 30-petal Taif rose oil used to perfume the Holy Kaaba." },
      { name: "Miqat Qarn Al-Manazil (Al-Sayl)", description: "Miqat station for entering Ihram before returning directly to Makkah." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 450 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 550 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 750 },
    ],
    inclusions: [
      "Full-day private mountain excursion from Makkah",
      "Certified chauffeur experienced in mountain hairpin driving",
      "Stops at rose factory, fruit market, and holy sites",
      "Miqat stop for optional second Umrah on return"
    ]
  },
  {
    id: "hudaibiyah-camel-tour",
    title: "Hudaibiyah Treaty Sanctuary & Desert Camel Farm",
    city: "makkah",
    duration: "3 - 4 Hours",
    startingPriceSar: 220,
    image: "/images/hero/slide-2.jpg",
    badge: "Pledge of Radwan Historical Site",
    description: "Spiritual and cultural half-day trip to the historic plains of Al-Hudaibiyah where the famous peace treaty was forged, combined with an authentic fresh camel milk tasting experience in the desert.",
    overview: "Visit the revered location of the Treaty of Hudaybiyyah (Sulh al-Hudaybiyyah) and the historic Masjid Al-Radwan where the Companions pledged allegience under the tree. Conclude with a traditional desert visit to observe Arabian camels.",
    stops: [
      { name: "Masjid Al-Hudaibiyah (Miqat)", description: "The historic boundary mosque commemorating the Treaty of Hudaybiyyah and functional Miqat." },
      { name: "Ancient Well of Hudaybiyyah", description: "The historical water well miraculously replenished by the Prophet ﷺ." },
      { name: "Desert Arabian Camel Farm", description: "Interactive traditional camel farm visit with opportunities for fresh camel milk tasting and family photos." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 220 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 270 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 390 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 350 },
    ],
    inclusions: [
      "Private air-conditioned chauffeur pickup and drop-off from Makkah hotel",
      "Visits to Treaty of Hudaybiyyah sanctuary and camel desert area",
      "Miqat Ihram preparation stop for second Umrah",
      "Bottled mineral water"
    ]
  },
  {
    id: "jeddah-islamic-heritage",
    title: "Jeddah Islamic Heritage & Historic Al-Balad",
    city: "excursion",
    duration: "5 - 6 Hours",
    startingPriceSar: 280,
    image: "/images/hero/slide-3.jpg",
    badge: "UNESCO World Heritage Gateway",
    description: "Explore the ancient gateway to Makkah in UNESCO-listed Historic Al-Balad, visit centuries-old coral stone mosques, King Fahd Fountain, and the peaceful Red Sea Floating Mosque.",
    overview: "Historic Jeddah has served as the sea gateway for pilgrims arriving from across the globe since the 7th century. This guided private excursion combines the historic atmospheric lanes of Al-Balad with the refreshing breeze of the Jeddah Corniche.",
    stops: [
      { name: "Historic Al-Balad (UNESCO)", description: "500-year-old traditional coral architecture with intricately carved wooden Roshan window screens." },
      { name: "Masjid Al-Shafi'i", description: "The oldest mosque in Jeddah dating back over 800 years in the heart of the Old Quarter." },
      { name: "Al-Rahma Floating Mosque", description: "Iconic white mosque built on stilts directly over the turquoise waters of the Red Sea." },
      { name: "King Fahd Fountain & Corniche", description: "The world's tallest seawater fountain and modern coastal pedestrian promenade." }
    ],
    vehiclePrices: [
      { vehicle: "Toyota Camry", capacity: "1 - 4 Guests", luggage: "2 Bags", priceSar: 280 },
      { vehicle: "Hyundai Staria", capacity: "5 - 7 Guests", luggage: "4 Bags", priceSar: 340 },
      { vehicle: "GMC Yukon XL", capacity: "1 - 7 VIP Guests", luggage: "6 Bags", priceSar: 490 },
      { vehicle: "Toyota HiAce", capacity: "8 - 14 Guests", luggage: "8 Bags", priceSar: 450 },
    ],
    inclusions: [
      "Round-trip private car transfer between Makkah / Madinah / Jeddah and the historic sites",
      "Chauffeur guide knowledgeable in Jeddah maritime and pilgrimage heritage",
      "Full flexibility for shopping at Souq Al Alawi and dining",
      "All highway tolls and parking included"
    ]
  }
];
