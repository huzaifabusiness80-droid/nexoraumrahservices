"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function OurServicesSection() {
  const services = [
    {
      id: "umrah-transport",
      slug: "umrah-transport",
      title: "NEXORA UMRAH TRANSPORT",
      logo: "/images/logos/Nexora Umrah Transport Emblem.png",
      description:
        "Private VIP airport transfers, intercity express shuttles, and luxury chauffeur services across Jeddah, Makkah, and Madinah with guaranteed punctuality.",
    },
    {
      id: "umrah-hotels",
      slug: "umrah-hotels",
      title: "NEXORA UMRAH HOTELS",
      logo: "/images/logos/Nexora Umrah Hotels Logo.png",
      description:
        "Verified seasonal hotel accommodations in Makkah & Madinah. Official transparent tariffs from budget sharing beds to luxury 100M Haram view properties.",
    },
    {
      id: "umrah-ziyarat",
      slug: "umrah-ziyarat",
      title: "NEXORA UMRAH ZIYARAT",
      logo: "/images/logos/Nexora Umrah Ziarat Logo.png",
      description:
        "Sacred historical excursions to Cave Hira, Mount Uhud, Masjid Quba, and the battlefield of Badar with private multilingual chauffeurs.",
    },
    {
      id: "uae-city-tours",
      slug: "uae-city-tours",
      title: "NEXORA TRAVEL & TOURISM",
      logo: "/images/logos/Nexora Luxury Travel Emblem.png",
      description:
        "Guided private sightseeing excursions across modern Dubai Marina, Downtown Burj Khalifa, Al Fahidi heritage quarters, and Abu Dhabi Grand Mosque.",
    },
    {
      id: "uae-desert-safari",
      slug: "uae-desert-safari",
      title: "NEXORA DESERT SAFARI",
      logo: "/images/logos/Nexora Luxury Travel Emblem.png",
      description:
        "Exhilarating red dune bashing in 4x4 Land Cruisers, sunset camel treks, quad biking, sandboarding, and 5-star Bedouin BBQ buffet dinners with live shows.",
    },
    {
      id: "uae-car-rental",
      slug: "uae-car-rental",
      title: "NEXORA RENTAL CARS",
      logo: "/images/logos/Nexora Premium Car Rental Emblem.png",
      description:
        "Affordable self-drive and VIP executive chauffeur car rentals in Dubai, Abu Dhabi, and Sharjah with comprehensive insurance and free airport delivery.",
    },
  ];

  return (
    <section className="w-full bg-white text-zinc-900 py-16 sm:py-20 lg:py-24 border-b border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading — Standard Site Format */}
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

        {/* 6 Sharp Cards Grid with Official Branded Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-white border border-zinc-200 hover:border-[#c5a059] p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 rounded-none shadow-none group"
            >
              <div>
                {/* Official Round Branded Logo Emblem */}
                <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full overflow-hidden  flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform relative p-1">
                  <Image
                    src={service.logo}
                    alt={service.title}
                    fill
                    className="object-contain p-1"
                    sizes="96px"
                  />
                </div>

                {/* Service Title */}
                <Link href={`/services/${service.slug}`}>
                  <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 uppercase tracking-wider mb-3 group-hover:text-[#c5a059] transition-colors">
                    {service.title}
                  </h3>
                </Link>

                {/* Service Description */}
                <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Action Button — Sharp Square Golden Button */}
              <div>
                <Link
                  href={`/services/${service.slug}`}
                  className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-[11px] font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 rounded-none shadow-none cursor-pointer"
                >
                  <span>VIEW DETAILS</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
