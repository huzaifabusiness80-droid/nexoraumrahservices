"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ReviewItem {
  id: number;
  name: string;
  location: string;
  avatar: string;
  text: string;
}

const line1Reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Dr. Tariq Al-Hashimi",
    location: "London, UK",
    avatar: "/images/avatars/mohammed.svg",
    text: "Alhamdulillah, our family booked a GMC Yukon XL for our Jeddah Airport to Makkah transfer and stayed near the Haram. The chauffeur met us right at arrivals with our name board. The vehicle was pristine, ice-cold, and spacious for our elderly parents.",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    location: "Toronto, Canada",
    avatar: "/images/avatars/samir.svg",
    text: "Very transparent pricing with zero surprise charges! We were quoted 200 SAR on their official tariff sheet and paid exactly that. Our flight had a 2-hour delay into Jeddah, but their team tracked it live and was waiting patiently.",
  },
  {
    id: 3,
    name: "Abdul Rehman Khan",
    location: "Lahore, Pakistan",
    avatar: "/images/avatars/mohammed.svg",
    text: "The Makkah and Madinah historical Ziyarat tours were spiritually enriching and exceptionally well-paced. The driver spoke fluent Urdu and gave our family plenty of time at Mount Uhud, Cave Hira, and Masjid Quba without any rush.",
  },
  {
    id: 4,
    name: "Dr. Ahmed Farooq",
    location: "Manchester, UK",
    avatar: "/images/avatars/samir.svg",
    text: "Booked Al Kiswah Towers and inter-city chauffeur from Makkah to Madinah. Everything was executed flawlessly. Punctual, courteous driver and clean sanitized vehicle. Highly recommended for families with kids.",
  },
  {
    id: 5,
    name: "Aisha Siddiqua",
    location: "Birmingham, UK",
    avatar: "/images/avatars/mohammed.svg",
    text: "Outstanding pilgrimage coordination. The WhatsApp team replied within seconds to all our questions. Handover of vehicle at the terminal was instant. Nexora made our first Umrah journey completely stress-free.",
  },
];

const line2Reviews: ReviewItem[] = [
  {
    id: 6,
    name: "Omar Al-Mansoor",
    location: "Dubai, UAE",
    avatar: "/images/avatars/samir.svg",
    text: "Rented an executive Camry for the week and joined their VIP Desert Safari in Lahbab red dunes. The car was delivered to our hotel with a full tank and clean Salik tag. Honest, trustworthy team who prioritize customer satisfaction.",
  },
  {
    id: 7,
    name: "Bilal Qureshi",
    location: "Karachi, Pakistan",
    avatar: "/images/avatars/mohammed.svg",
    text: "The private Toyota Staria we booked for our family of 7 was modern, clean, and very comfortable. Our driver was extremely polite, assisted with all heavy suitcases, and drove safely across the highway.",
  },
  {
    id: 8,
    name: "Zainab Al-Hassan",
    location: "Dallas, USA",
    avatar: "/images/avatars/samir.svg",
    text: "The Taif mountain day tour from Makkah was unforgettable. Beautiful scenic stops, rose water factory visit, and a peaceful prayer break. The chauffeur was knowledgeable and very courteous.",
  },
  {
    id: 9,
    name: "Hassan Raza",
    location: "Islamabad, Pakistan",
    avatar: "/images/avatars/mohammed.svg",
    text: "Traveled with a group of 14 relatives in their luxury Toyota HiAce. Excellent air conditioning and spacious seating. The fixed rate saved us money compared to local street taxis.",
  },
  {
    id: 10,
    name: "Ibrahim Malik",
    location: "Sydney, Australia",
    avatar: "/images/avatars/samir.svg",
    text: "Truly 5-star hospitality. From our initial inquiry on WhatsApp to our final airport drop-off at Madinah, every detail was handled with precision and Islamic warmth. Will book again insha'Allah.",
  },
];

export default function HomeReviewsSection() {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 lg:py-24 border-b border-zinc-200 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-16">
        
        {/* Section Heading — Matching Screenshot Exactly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 font-normal">
            Real feedback and verified experiences from pilgrims &amp; travelers worldwide
          </p>
        </motion.div>
      </div>

      {/* 2 Animated Marquee Lines */}
      <div className="space-y-12 sm:space-y-16">
        
        {/* LINE 1: Scrolling Left */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-left flex gap-6 sm:gap-8 pt-8 pb-4">
            {/* Repeat line1Reviews twice for continuous seamless loop */}
            {[...line1Reviews, ...line1Reviews].map((rev, idx) => (
              <div
                key={`line1-${idx}`}
                className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-zinc-200/80 p-6 sm:p-7 pt-9 sm:pt-10 text-center relative transition-all duration-300 group"
              >
                {/* Floating Round Avatar Top Center */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto -mt-17 sm:-mt-19 mb-3 relative bg-zinc-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Subtle Quote Symbol */}
                <div className="text-3xl sm:text-4xl text-[#c5a059]/40 font-serif leading-none mb-2">
                  &ldquo;
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-4 line-clamp-4 font-normal">
                  {rev.text}
                </p>

                {/* Author Signature */}
                <div className="pt-2 border-t border-zinc-100">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                    &mdash; {rev.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    {rev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINE 2: Scrolling Right */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-right flex gap-6 sm:gap-8 pt-8 pb-4">
            {/* Repeat line2Reviews twice for continuous seamless loop */}
            {[...line2Reviews, ...line2Reviews].map((rev, idx) => (
              <div
                key={`line2-${idx}`}
                className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-zinc-200/80 p-6 sm:p-7 pt-9 sm:pt-10 text-center relative transition-all duration-300 group"
              >
                {/* Floating Round Avatar Top Center */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto -mt-17 sm:-mt-19 mb-3 relative bg-zinc-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Subtle Quote Symbol */}
                <div className="text-3xl sm:text-4xl text-[#c5a059]/40 font-serif leading-none mb-2">
                  &ldquo;
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-4 line-clamp-4 font-normal">
                  {rev.text}
                </p>

                {/* Author Signature */}
                <div className="pt-2 border-t border-zinc-100">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                    &mdash; {rev.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    {rev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pagination Dots Indicator — Matching Screenshot */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0d3b66] transition-all"></span>
        <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
        <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
      </div>

    </section>
  );
}
