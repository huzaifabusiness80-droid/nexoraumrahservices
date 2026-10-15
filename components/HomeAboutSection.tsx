"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaShieldAlt, FaCar, FaUsers, FaClock, FaArrowRight } from "react-icons/fa";

export default function HomeAboutSection() {
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
            ABOUT NEXORA JOURNEYS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Serving the Guests of Ar-Rahman with Honor, Integrity &amp; Precision
          </p>
        </motion.div>

        {/* 2-Column Luxury Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-zinc-950"
          >
            <Image
              src="/images/hero/slide-2.jpg"
              alt="Nexora Journeys Pilgrimage Care"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="text-xs font-bold text-[#e4be72] uppercase tracking-wider block mb-1">
                  Established Pilgrimage Operator
                </span>
                <p className="text-base sm:text-lg font-bold leading-snug">
                  Over 15,000 Pilgrims Served Across Makkah, Madinah &amp; the UAE
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Information Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Dedicated Ground Chauffeur Care &amp; Guaranteed Hotel Allotments
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              <strong>Nexora Journeys</strong> is a premier Umrah ground services and executive tourism provider operating dedicated dispatch hubs in Makkah Al-Mukarramah, Madinah Al-Munawwarah, and Dubai.
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              We eliminate pilgrim uncertainty by offering fixed-tariff airport transfers, verified seasonal hotel allotments with guaranteed room vouchers, guided historical Ziyarat tours, and premium UAE city experiences. Our multilingual chauffeurs and 24/7 operations team ensure you travel with total dignity, comfort, and peace of mind.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-lg border border-zinc-100">
                <div className="w-8 h-8 rounded bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]">
                  <FaShieldAlt className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Fixed &amp; Honest Tariff</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">No surge pricing, hidden tolls, or haggling.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-lg border border-zinc-100">
                <div className="w-8 h-8 rounded bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]">
                  <FaClock className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">100% Punctuality</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Drivers arrive 15 minutes before scheduled pickup.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-lg border border-zinc-100">
                <div className="w-8 h-8 rounded bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]">
                  <FaCar className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Immaculate AC Fleet</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Toyota Camrys, Starias, Yukons &amp; HiAces.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-lg border border-zinc-100">
                <div className="w-8 h-8 rounded bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]">
                  <FaUsers className="text-xs" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">24/7 Human Dispatch</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Round-the-clock ground support across Saudi &amp; UAE.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#b58e45] hover:text-[#9f7932] uppercase tracking-wider transition-colors"
              >
                <span>Read Full Company Profile &amp; Mission</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
