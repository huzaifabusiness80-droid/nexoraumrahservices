"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { transportVehicles } from "@/lib/data/transportData";
import { FaSuitcase, FaUserFriends, FaArrowRight } from "react-icons/fa";

export default function FleetSection() {
  const { t } = useLanguage();

  return (
    <section id="fleet" className="w-full bg-[#f8f9fa] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            {t.fleetTag}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            {t.fleetHeading}
          </p>
        </div>

        {/* Transport Vehicles Grid - Compact, sleek luxury cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {transportVehicles.map((car) => {
            const detailUrl = `/transport/${car.id}`;

            return (
              <div
                key={car.id}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Vehicle Image Header */}
                <Link href={detailUrl} className="block relative group overflow-hidden bg-zinc-950">
                  <div className="relative w-full h-48 sm:h-52">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-[#e4be72] block">
                      {car.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white mt-0.5">
                      {car.name}
                    </h3>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  {/* Specs Strip: Seats & Luggage */}
                  <div className="grid grid-cols-2 border border-[#c5a059]/40 divide-x divide-[#c5a059]/30 text-center mb-3.5 bg-[#fdfbf6]">
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

                  {/* 3 to 4 Key Route Prices (Compact, no extra header text) */}
                  <div className="space-y-1.5 text-xs">
                    {car.rateList.slice(0, 4).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-none bg-zinc-50 hover:bg-[#faf6ed] transition-colors"
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

                {/* Bottom CTA Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.14em] uppercase text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Book Now</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
