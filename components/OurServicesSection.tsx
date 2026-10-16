"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function OurServicesSection() {
  const services = [
    {
      id: "umrah-transport",
      slug: "umrah-transport",
      title: "NEXORA UMRAH TRANSPORT",
      image: "/images/hero/hero-transport.jpg",
      description:
        "Private VIP airport transfers, intercity express shuttles, and luxury chauffeur services across Jeddah, Makkah, and Madinah.",
    },
    {
      id: "umrah-hotels",
      slug: "umrah-hotels",
      title: "NEXORA UMRAH HOTELS",
      image: "/images/hero/hero-hotels.jpg",
      description:
        "Verified seasonal hotel accommodations in Makkah & Madinah with official transparent tariffs.",
    },
    {
      id: "umrah-ziyarat",
      slug: "umrah-ziyarat",
      title: "NEXORA UMRAH ZIYARAT",
      image: "/images/hero/hero-ziyarat.jpg",
      description:
        "Sacred historical excursions to Cave Hira, Mount Uhud, Masjid Quba with private multilingual chauffeurs.",
    },
    {
      id: "uae-city-tours",
      slug: "uae-city-tours",
      title: "NEXORA TRAVEL & TOURISM",
      image: "/images/services/city-tours-dubai.jpg",
      description:
        "Guided private sightseeing excursions across Dubai Marina, Burj Khalifa, and Abu Dhabi Grand Mosque.",
    },
    {
      id: "uae-desert-safari",
      slug: "uae-desert-safari",
      title: "NEXORA DESERT SAFARI",
      image: "/images/services/desert-safari-dunes.jpg",
      description:
        "Red dune bashing, sunset camel treks, quad biking, sandboarding, and 5-star Bedouin BBQ dinners.",
    },
    {
      id: "uae-car-rental",
      slug: "uae-car-rental",
      title: "NEXORA RENTAL CARS",
      image: "/images/services/car-rental-luxury.jpg",
      description:
        "Self-drive and VIP chauffeur car rentals in Dubai, Abu Dhabi, and Sharjah with free airport delivery.",
    },
  ];

  return (
    <section className="w-full bg-white text-zinc-900 py-16 sm:py-20 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            OUR SERVICES
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Comprehensive Pilgrimage &amp; Luxury Travel Services Across Saudi Arabia &amp; UAE
          </p>
        </motion.div>

        {/* 3x2 Grid — exactly 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative overflow-hidden  group cursor-pointer min-h-[280px] sm:min-h-[310px]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

              {/* Subtle golden border glow on hover */}
              <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-[#c5a059]/40 transition-colors duration-500" />

              {/* Content — anchored to bottom */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#c5a059] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed mb-5 max-w-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>

                <div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 "
                  >
                    <span>VIEW DETAILS</span>
                    <FaArrowRight className="text-[9px] sm:text-[10px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
