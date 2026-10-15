"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { carRentalVehicles } from "@/lib/data/carRentalData";
import { FaUserFriends, FaSuitcase, FaKey, FaGasPump, FaArrowRight } from "react-icons/fa";

export default function HomeCarRentalSection() {
  const featured = carRentalVehicles.slice(0, 3);

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
            UAE CAR RENTAL FLEET
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Self-Drive &amp; VIP Chauffeur Car Hire with Free Airport Delivery
          </p>
        </motion.div>

        {/* 3 Featured Rental Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((car, idx) => {
            const detailUrl = `/car-rental/${car.id}`;

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
                  {/* Top Image with Category & Price Badge */}
                  <Link href={detailUrl} className="block relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                      {car.category}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#b58e45] text-white px-2.5 py-1 text-xs font-bold rounded shadow-xs">
                      AED {car.dailyPriceAed} <span className="text-[10px] font-normal text-white/90">/ Day</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5">
                    <Link href={detailUrl}>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#c5a059] transition-colors leading-snug mb-2">
                        {car.name}
                      </h3>
                    </Link>

                    {/* Specs Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 mb-3 pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <FaUserFriends className="text-[#c5a059] text-xs shrink-0" />
                        <span>{car.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaSuitcase className="text-[#c5a059] text-xs shrink-0" />
                        <span>{car.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaKey className="text-[#c5a059] text-xs shrink-0" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaGasPump className="text-[#c5a059] text-xs shrink-0" />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-3">
                      {car.description}
                    </p>

                    <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-1.5 rounded text-xs flex justify-between items-center">
                      <span className="text-zinc-700">Weekly Rate (Save 15%):</span>
                      <span className="font-extrabold text-[#946e27]">AED {car.weeklyPriceAed}</span>
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
            href="/services/uae-car-rental"
            className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded"
          >
            <span>View Full UAE Car Rental Fleet</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
