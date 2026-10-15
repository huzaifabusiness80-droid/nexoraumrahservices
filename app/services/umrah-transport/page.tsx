import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import TransportFleetSection from "@/components/TransportFleetSection";

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

      {/* 2. Vehicle Fleet with Filtering */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto w-full px-0 sm:px-0 lg:px-0">
          <div className="text-center py-10 sm:py-12 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
              Select Your Preferred VIP Vehicle
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
              Filter by route, vehicle type, or search to find exact pricing instantly
            </p>
          </div>
          <TransportFleetSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
