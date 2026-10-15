"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { transportVehicles } from "@/lib/data/transportData";
import { FaSuitcase, FaUserFriends, FaArrowRight } from "react-icons/fa";

export default function HomeTransportSection() {
  const featured = transportVehicles.slice(0, 3);

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
            UMRAH TRANSPORT FLEET
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Private Airport Transfers &amp; Holy City Inter-City Luxury Chauffeur Service
          </p>
        </motion.div>

        {/* 3 Compact Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((car, idx) => {
            const detailUrl = `/transport/${car.id}`;

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group rounded-lg"
              >
                <div>
                  {/* Top Image with Gradient Overlay */}
                  <Link href={detailUrl} className="block relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] tracking-wider uppercase font-bold text-[#e4be72] block">
                        {car.category}
                      </span>
                      <h3 className="text-lg font-bold uppercase tracking-wide text-white mt-0.5">
                        {car.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Body Specs */}
                  <div className="p-5">
                    <div className="grid grid-cols-2 border border-[#c5a059]/40 divide-x divide-[#c5a059]/30 text-center mb-3.5 bg-[#fdfbf6] rounded">
                      <div className="py-2 px-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                          Capacity
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-0.5">
                          <FaUserFriends className="text-[#c5a059]" />
                          {car.seats}
                        </span>
                      </div>
                      <div className="py-2 px-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                          Luggage
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-0.5">
                          <FaSuitcase className="text-[#c5a059]" />
                          {car.luggage}
                        </span>
                      </div>
                    </div>

                    {/* Route Rates Preview */}
                    <div className="space-y-1.5 text-xs">
                      {car.rateList.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1.5 px-2.5 bg-zinc-50 hover:bg-[#faf6ed] transition-colors rounded"
                        >
                          <span className="text-zinc-700 font-medium pr-2 truncate">
                            {item.route}
                          </span>
                          <span className="font-extrabold text-zinc-950 shrink-0 text-xs">
                            {item.priceSar}{" "}
                            <span className="text-[10px] text-[#9b762c] font-bold">SAR</span>
                          </span>
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
                    <span>Book Now</span>
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
            href="/services/umrah-transport"
            className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded"
          >
            <span>View Full Transport Fleet &amp; All Route Rates</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
