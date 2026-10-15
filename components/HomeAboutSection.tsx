"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function HomeAboutSection() {
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
            ABOUT US
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Nexora Journeys Premier Umrah Ground Services &amp; Executive Tourism
          </p>
        </motion.div>

        {/* 2-Column: Left Image | Right Heading & Description (No dummy icons, clean & professional) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative w-full h-80 sm:h-96 md:h-[470px] bg-zinc-950 border border-zinc-200 overflow-hidden"
          >
            <Image
              src="/images/hero/slide-2.jpg"
              alt="Nexora Journeys Umrah and Travel Company"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Right: Heading, Subtitle & Professional Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5"
          >
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block mb-2">
                OUR COMPANY
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight leading-snug uppercase">
                Serving Pilgrims &amp; Travelers with Honor, Excellence &amp; Trust
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              <strong>Nexora Journeys</strong> is a premier Umrah ground transportation and executive tourism provider operating across Saudi Arabia (Jeddah, Makkah, and Madinah) and the United Arab Emirates (Dubai, Abu Dhabi, and Sharjah).
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Founded with the sacred responsibility to serve the guests of the Holy Sanctuaries, we eliminate pilgrim uncertainty and travel stress. We provide private VIP airport arrivals, intercity express transfers, verified seasonal hotel accommodations with guaranteed vouchers, and guided historical Ziyarat excursions with respectful multilingual drivers.
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              With our modern fleet of immaculate air-conditioned vehicles, transparent fixed tariffs with zero hidden fees, and a dedicated 24/7 operations dispatch team, we ensure every mile of your sacred journey is completed with ultimate peace of mind, punctuality, and comfort.
            </p>

            {/* Action Button — Golden Theme */}
            <div className="pt-2">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 rounded-none shadow-none cursor-pointer"
              >
                <span>LEARN MORE ABOUT US</span>
                <FaArrowRight className="text-[11px]" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
