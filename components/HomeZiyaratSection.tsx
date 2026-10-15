"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ziyaratTours } from "@/lib/data/ziyaratData";
import { FaStar, FaMapMarkerAlt, FaClock, FaArrowRight, FaMosque, FaCar } from "react-icons/fa";

export default function HomeZiyaratSection() {
  const featured = ziyaratTours.slice(0, 3);

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 lg:py-24 border-b border-zinc-200">
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
            UMRAH ZIYARAT TOURS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Sacred Historical Excursions to Cave Hira, Mount Uhud &amp; Holy Revelation Sites
          </p>
        </motion.div>

        {/* 3 Featured Ziyarat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((tour, idx) => {
            const detailUrl = `/ziyarat/${tour.id}`;
            const cityName =
              tour.city === "makkah" ? "Makkah" : tour.city === "madinah" ? "Madina" : "Excursion";

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group rounded-lg"
              >
                <div>
                  {/* Top Image with City Badge */}
                  <Link href={detailUrl} className="block relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
                      <FaMapMarkerAlt className="text-white text-[10px]" />
                      {cityName}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#c5a059] text-white px-2.5 py-1 text-xs font-bold rounded shadow-xs">
                      SAR {tour.startingPriceSar} <span className="text-[10px] font-normal text-white/90">/ Car</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5">
                    <Link href={detailUrl}>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#c5a059] transition-colors leading-snug mb-1">
                        {tour.title}
                      </h3>
                    </Link>

                    {/* Rating & Duration */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-2.5">
                      <div className="flex items-center text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[10px] text-zinc-400" />
                        {tour.duration}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {tour.description}
                    </p>

                    {/* Features Strip */}
                    <div className="bg-zinc-50 border border-zinc-100 p-2.5 rounded text-xs space-y-1">
                      <div className="flex items-center gap-2 text-zinc-700 font-medium">
                        <FaMosque className="text-[#c5a059] text-[10px]" />
                        <span>{tour.stops.length} Holy Sanctuary Stops Included</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <FaCar className="text-[#c5a059] text-[10px]" />
                        <span>Dedicated AC Chauffeur Vehicle</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#9f7932] text-white text-center font-bold tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2 rounded shadow-xs"
                  >
                    <span>View Itinerary &amp; Rates</span>
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
            href="/services/umrah-ziyarat"
            className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded"
          >
            <span>View All Sacred Ziyarat Tours</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
