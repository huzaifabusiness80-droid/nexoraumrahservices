import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
  FaAward,
  FaCar,
  FaHotel,
  FaMosque,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | Nexora Journeys Umrah & Tourism",
  description:
    "Learn about Nexora Journeys, our mission, values, and commitment to serving pilgrims across Makkah, Madinah, Jeddah, and the UAE with excellence, integrity, and comfort.",
  keywords: [
    "About Nexora Journeys",
    "Umrah Chauffeur Company",
    "Makkah Transport Services",
    "Saudi Arabia Pilgrimage Company",
    "Nexora Team",
  ],
};

export default function AboutUsPage() {
  const targetPhone = "923158494785";

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-24 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-2.jpg"
            alt="About Nexora Journeys"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            Honoring the Guests of Ar-Rahman
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            About Nexora Journeys
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a sacred responsibility to provide seamless, peaceful, and transparent travel experiences for pilgrims visiting the Holy Sanctuaries of Makkah and Madinah.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 space-y-16">
        
        {/* Story & Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#b58e45] uppercase tracking-wider block">
              Our Vision &amp; Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Elevating the Spiritual Pilgrimage with Dignity, Precision &amp; Care
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Performing Umrah is a once-in-a-lifetime spiritual milestone. For too long, pilgrims have faced unpredictable airport taxis, hidden hotel surcharges, and unreliable transport arrangements that detract from their devotion.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <strong>Nexora Journeys</strong> was founded to solve this dilemma. By operating our own modern, air-conditioned vehicle fleet and partnering directly with 46 verified hotels in Makkah and Madinah, we guarantee fixed tariffs, punctual chauffeurs, and authentic hospitality every single mile.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/services/umrah-transport"
                className="px-5 py-2.5 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Fleet</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/services/umrah-hotels"
                className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors inline-flex items-center gap-2"
              >
                <span>View Official Hotels</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-zinc-950">
            <Image
              src="/images/hero/slide-3.jpg"
              alt="Pilgrimage Hospitality"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-bold text-[#e4be72] uppercase tracking-wider block">
                  Trusted Partner
                </span>
                <p className="text-base sm:text-lg font-bold">
                  Serving Over 15,000 Pilgrims Across Pakistan, the GCC &amp; Worldwide
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars / Values (4 Tiles) */}
        <section className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#b58e45] uppercase tracking-wider block mb-1">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              The Nexora Standard of Service
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Every route, booking, and chauffeur is held to rigorous standards of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
                <FaShieldAlt />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Fixed &amp; Honest Rates
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Zero haggling, zero hidden airport toll additions, and transparent official hotel tariff charts valid for the entire season.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
                <FaCar />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Modern Dedicated Fleet
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                From executive Toyota Camrys and Hyundai Starias to VIP GMC Yukon XLs and luxury Coasters, all fully air-conditioned and immaculate.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
                <FaUsers />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Courteous Chauffeurs
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Respectful Muslim drivers who understand the sanctity of the journey, offering route guidance in Urdu, Arabic, and English.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
                <FaAward />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                24/7 Ground Concierge
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Real human dispatch coordinators in Jeddah, Makkah, and Madinah ready to assist you any hour of the day or night.
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics Bar */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e4be72] block">
                15,000+
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block mt-1">
                Satisfied Pilgrims Served
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e4be72] block">
                46+
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block mt-1">
                Verified Hotels in Makkah &amp; Madinah
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e4be72] block">
                100%
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block mt-1">
                Punctuality &amp; Flight Tracking
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e4be72] block">
                24/7
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block mt-1">
                Live Ground Support Desks
              </span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-[#faf6ed] to-[#f4ede0] border border-[#e8ce97] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Let our experienced dispatch team take care of your airport arrival, hotel accommodation, and holy Ziyarat so you can focus entirely on your Ibadah.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${targetPhone}?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20plan%20my%20Umrah%20trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FaWhatsapp className="text-base" />
              <span>Contact Concierge on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="py-3 px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors"
            >
              <span>View Contact Information</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
