import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { transportVehicles } from "@/lib/data/transportData";
import { FaSuitcase, FaUserFriends, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Umrah Transport | Private Fleet & Fixed SAR Rates | Nexora Journeys",
  description:
    "Official rate list for VIP Umrah private transportation across Jeddah Airport, Makkah, and Madinah. Fixed prices for Toyota Camry, Hyundai Staria, GMC Yukon, HiAce, Coaster & Luxury Bus in SAR.",
  keywords: [
    "Umrah Transport",
    "Jeddah Airport to Makkah Taxi Fare",
    "Makkah to Madinah Private Car Price",
    "GMC Yukon Umrah Chauffeur",
    "HiAce Van Umrah Rental",
    "Saudi Arabia Pilgrimage Transportation"
  ],
};

export default function UmrahTransportPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* 1. Clean, Professional Top Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-1.jpg"
            alt="Umrah Transport Fleet"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#c5a059] text-black text-[11px] font-bold uppercase tracking-widest mb-3">
            Official 2024 - 2025 Fleet
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            Umrah VIP Transport
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transparent, fixed rates in Saudi Riyal (SAR) for all airport transfers, intercity routes, and sacred Ziyarat tours. No hidden tolls or surprise surcharges.
          </p>
        </div>
      </section>

      {/* 2. Vehicles Grid with Golden Luxury Theme */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center pb-8 mb-10 border-b border-zinc-200">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            Select Your Preferred VIP Vehicle
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            Click on any vehicle to view full specifications, pricing routes, and instant reservation details
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transportVehicles.map((car) => {
            const detailUrl = `/transport/${car.id}`;

            return (
              <div
                key={car.id}
                className="bg-white border border-zinc-200 hover:border-[#c5a059]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Vehicle Poster / Photo Header */}
                <Link href={detailUrl} className="block relative group overflow-hidden bg-zinc-950">
                  <div className="relative w-full h-60 sm:h-64">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] tracking-widest uppercase font-bold text-[#e4be72]">
                      {car.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-white">
                      {car.name}
                    </h3>
                  </div>
                </Link>

                {/* Specs Box: Seats & Luggage with Golden Theme */}
                <div className="p-6 pb-2">
                  <div className="grid grid-cols-2 border border-[#c5a059]/40 divide-x divide-[#c5a059]/30 text-center mb-6">
                    <div className="py-3 px-3 bg-[#fdfbf6]">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                        Seats Capacity
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-zinc-900 flex items-center justify-center gap-2 mt-1">
                        <FaUserFriends className="text-[#c5a059] text-base" />
                        {car.seats}
                      </span>
                    </div>
                    <div className="py-3 px-3 bg-[#fdfbf6]">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                        Luggage Space
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-zinc-900 flex items-center justify-center gap-2 mt-1">
                        <FaSuitcase className="text-[#c5a059] text-base" />
                        {car.luggage}
                      </span>
                    </div>
                  </div>

                  {/* Rates Table */}
                  <div className="space-y-1.5 text-xs sm:text-[13px] pt-1">
                    {car.rateList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 px-3 rounded bg-zinc-50 hover:bg-[#faf6ed] transition-colors"
                      >
                        <span className="text-zinc-700 font-medium pr-2 leading-snug">
                          {item.route}
                        </span>
                        <span className="font-extrabold text-zinc-950 shrink-0">
                          {item.priceSar}{" "}
                          <span className="text-[10px] text-[#9b762c] font-bold">SAR</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Bullet points */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-100 space-y-1.5">
                    {car.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                        <FaCheckCircle className="text-[#c5a059] shrink-0 text-xs" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA: Single prominent golden button linking directly to dynamic detail page */}
                <div className="p-6 pt-4 mt-2 border-t border-zinc-100 bg-[#fafafa]">
                  <Link
                    href={detailUrl}
                    className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.16em] uppercase text-xs sm:text-[13px] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <span>Book Now / View Details</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
