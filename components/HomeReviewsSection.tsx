"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
}

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Dr. Tariq Al-Hashimi",
    role: "Pilgrim from London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    text: "Alhamdulillah, booked a GMC Yukon XL for our family airport transfer to Makkah. Punctual, courteous chauffeur, pristine ice-cold car, and seamless journey for our elderly parents.",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    role: "Traveler from Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    text: "Very transparent pricing with zero surprise charges! Quoted 200 SAR on their official tariff sheet and paid exactly that. Our flight had a 2-hour delay into Jeddah, but their team tracked it live and was waiting patiently.",
  },
  {
    id: 3,
    name: "Abdul Rehman Khan",
    role: "Pilgrim from Lahore, Pakistan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    text: "The Makkah and Madinah historical Ziyarat tours were spiritually enriching and exceptionally well-paced. The driver spoke fluent Urdu and gave our family plenty of time at Mount Uhud, Cave Hira, and Masjid Quba.",
  },
  {
    id: 4,
    name: "Dr. Ahmed Farooq",
    role: "Pilgrim from Manchester, UK",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    text: "Booked Al Kiswah Towers and inter-city chauffeur from Makkah to Madinah. Everything was executed flawlessly. Punctual, courteous driver and spotless sanitized vehicle. Highly recommended.",
  },
  {
    id: 5,
    name: "Aisha Siddiqua",
    role: "Family Umrah, Birmingham, UK",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    text: "Outstanding pilgrimage coordination. The WhatsApp team replied within seconds to all our questions. Handover of vehicle at the terminal was instant. Nexora made our first Umrah journey completely stress-free.",
  },
  {
    id: 6,
    name: "Omar Al-Mansoor",
    role: "Tourist from Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    text: "Rented an executive Camry for the week and joined their VIP Desert Safari in Lahbab red dunes. The car was delivered to our hotel with a full tank and clean Salik tag. Honest, trustworthy team who prioritize customer satisfaction.",
  },
  {
    id: 7,
    name: "Bilal Qureshi",
    role: "Family Group, Karachi, Pakistan",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    text: "The private Toyota Staria we booked for our family of 7 was modern, clean, and very comfortable. Our driver was extremely polite, assisted with all heavy suitcases, and drove safely across the highway.",
  },
  {
    id: 8,
    name: "Zainab Al-Hassan",
    role: "Pilgrim from Dallas, USA",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    text: "The Taif mountain day tour from Makkah was unforgettable. Beautiful scenic stops, rose water factory visit, and a peaceful prayer break. The chauffeur was knowledgeable and very courteous.",
  },
  {
    id: 9,
    name: "Hassan Raza",
    role: "Group Leader, Islamabad, Pakistan",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    text: "Traveled with a group of 14 relatives in their luxury Toyota HiAce. Excellent air conditioning and spacious seating. The fixed rate saved us money compared to local street taxis.",
  },
  {
    id: 10,
    name: "Ibrahim Malik",
    role: "Pilgrim from Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
    text: "Truly 5-star hospitality. From our initial inquiry on WhatsApp to our final airport drop-off at Madinah, every detail was handled with precision and Islamic warmth. Will book again insha'Allah.",
  },
];

export default function HomeReviewsSection() {
  return (
    <section className="w-full bg-white text-zinc-900 py-16 sm:py-20 border-b border-zinc-200 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            WHAT OUR CUSTOMERS ARE SAYING
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Real feedback and verified experiences from pilgrims &amp; travelers worldwide
          </p>
        </motion.div>
      </div>

      {/* Exactly 1 Single Line Continuous Animated Marquee */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="animate-marquee-left flex gap-6 sm:gap-8">
          {/* Duplicate 10 reviews for seamless infinite looping */}
          {[...reviews, ...reviews].map((rev, idx) => (
            <div
              key={`rev-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-[#f9fafb] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
            >
              <div>
                {/* 5 Golden Stars at the Top */}
                <div className="flex items-center gap-1 text-[#f59e0b] text-sm mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review Text with Quotation Marks */}
                <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author Row: Small Round Avatar + Name & Subtitle */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-zinc-200"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-normal truncate mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
