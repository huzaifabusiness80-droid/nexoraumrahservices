"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { makkahHotels, madinahHotels } from "@/lib/data/hotelData";
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaWifi, FaUtensils, FaClock } from "react-icons/fa";

export default function HomeHotelsSection() {
  const featured = [
    makkahHotels[0], // Arafat Zahbi
    makkahHotels[4], // Al Kiswah Towers
    madinahHotels[madinahHotels.length - 1], // Safwat Al Madinah
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Exact What We Offer Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            UMRAH HOTELS TARIFF
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Official Verified Seasonal Rates Near Haram in Makkah &amp; Madinah
          </p>
        </motion.div>

        {/* 3 Featured Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((hotel, idx) => {
            const detailUrl = `/hotels/${hotel.id}`;
            const startingPrice = hotel.sharingBed || hotel.quadBed || 150;
            const unit = hotel.sharingBed ? "Per Sharing Bed" : "Per Room";

            return (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group rounded-lg"
              >
                <div>
                  {/* Top Image with Location Badge */}
                  <Link href={detailUrl} className="block relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
                      <FaMapMarkerAlt className="text-white text-[10px]" />
                      {hotel.city === "makkah" ? "Makkah" : "Madina"}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#b58e45] text-white px-2.5 py-1 text-xs font-bold rounded shadow-xs">
                      SAR {startingPrice} <span className="text-[10px] font-normal text-white/90">Starts</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5">
                    <Link href={detailUrl}>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#c5a059] transition-colors leading-snug mb-1">
                        {hotel.name}
                      </h3>
                    </Link>

                    {/* Stars & Location Line */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mb-2.5">
                      <div className="flex items-center text-amber-400 text-xs">
                        {[...Array(hotel.stars || 4)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{hotel.city === "makkah" ? "Makkah" : "Madina"}</span>
                      <span>•</span>
                      <span className="text-zinc-700 font-semibold">{hotel.distance}</span>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {hotel.description}
                    </p>

                    {/* Micro Amenities */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 pt-3 border-t border-zinc-100">
                      <span className="flex items-center gap-1">
                        <FaWifi className="text-zinc-400 text-[10px]" /> Free WiFi
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUtensils className="text-zinc-400 text-[10px]" /> Dining
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-zinc-400 text-[10px]" /> 24/7 Desk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 bg-[#b58e45] hover:bg-[#9f7932] text-white text-center font-bold tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2 rounded shadow-xs"
                  >
                    <span>View Hotel Tariff &amp; Rooms</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centered Action Link */}
        <div className="text-center">
          <Link
            href="/services/umrah-hotels"
            className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded"
          >
            <span>View All 46 Makkah &amp; Madinah Hotel Tariffs</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
