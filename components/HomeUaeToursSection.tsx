"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { uaeTours } from "@/lib/data/tourData";
import { FaClock, FaCheck, FaArrowRight } from "react-icons/fa";

export default function HomeUaeToursSection() {
  const featured = uaeTours.slice(0, 3);

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
            UAE CITY TOURS &amp; DESERT SAFARI
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Guided Private Sightseeing Excursions Across Dubai, Abu Dhabi &amp; Arabian Dunes
          </p>
        </motion.div>

        {/* 3 Featured Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((tour, idx) => {
            const detailUrl = `/tours/${tour.id}`;

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
                  {/* Top Image with Badge */}
                  <Link href={detailUrl} className="block relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                      {tour.badge}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#c5a059] text-white px-2.5 py-1 text-xs font-bold rounded shadow-xs">
                      AED {tour.priceAed} <span className="text-[10px] font-normal text-white/90">/ Tour</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5">
                    <Link href={detailUrl}>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#c5a059] transition-colors leading-snug mb-1">
                        {tour.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-2.5">
                      <FaClock className="text-zinc-400" />
                      <span>{tour.duration}</span>
                      <span>•</span>
                      <span>Private AC Chauffeur</span>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {tour.description}
                    </p>

                    <div className="bg-zinc-50 border border-zinc-100 p-2.5 rounded text-xs space-y-1">
                      {tour.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-zinc-700 truncate font-medium">
                          <FaCheck className="text-[#c5a059] text-[10px] shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2 rounded shadow-xs"
                  >
                    <span>View Tour Details</span>
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
            href="/services/uae-city-tours"
            className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded"
          >
            <span>Explore All UAE City Tours &amp; Desert Safaris</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
