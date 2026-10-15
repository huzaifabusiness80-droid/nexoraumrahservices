"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUserFriends, FaKey, FaGasPump, FaArrowRight, FaShieldAlt } from "react-icons/fa";

interface RentalCarItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  dailyPriceAed: number;
  weeklyPriceAed: number | null;
  freeMileagePerDay: number;
  features: string[];
}

export default function HomeCarRentalSection() {
  const [cars, setCars] = useState<RentalCarItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/services/car-rental");
        const data = await res.json();
        if (data.success && Array.isArray(data.cars)) {
          setCars(data.cars.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load featured rental cars:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  if (!loading && cars.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 lg:py-24 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
          {cars.map((car, idx) => {
            const detailUrl = `/car-rental/${car.slug || car.id}`;
            const isContactPrice =
              car.dailyPriceAed <= 0 ||
              (Array.isArray(car.features) && car.features.includes("contact_for_price"));

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
                      src={car.image || "/images/fleet/toyota-camry.jpg"}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                      {car.category}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#b58e45] text-white px-2.5 py-1 text-xs font-bold rounded shadow-xs">
                      {isContactPrice ? (
                        <span>Contact for Price</span>
                      ) : (
                        <>
                          AED {car.dailyPriceAed} <span className="text-[10px] font-normal text-white/90">/ Day</span>
                        </>
                      )}
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
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaShieldAlt className="text-[#c5a059] text-xs shrink-0" />
                        <span>{car.brand}</span>
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

                    {!isContactPrice && car.weeklyPriceAed ? (
                      <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-1.5 rounded text-xs flex justify-between items-center">
                        <span className="text-zinc-700">Weekly Rate:</span>
                        <span className="font-extrabold text-[#946e27]">AED {car.weeklyPriceAed}</span>
                      </div>
                    ) : isContactPrice ? (
                      <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-1.5 rounded text-xs flex justify-between items-center">
                        <span className="text-zinc-700">Rates:</span>
                        <span className="font-extrabold text-[#946e27]">Custom on Request</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2 rounded shadow-xs"
                  >
                    <span>View Vehicle Details</span>
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
