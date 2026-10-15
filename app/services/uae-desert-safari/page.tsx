import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaCheck, FaPhoneAlt, FaClock, FaShieldAlt, FaUtensils, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "UAE Desert Safari Packages in Dubai | Nexora Journeys",
  description:
    "Book authentic UAE Desert Safari tours in Dubai. Enjoy 4x4 red dune bashing, sunset camel trekking, sandboarding, and 5-star Bedouin BBQ buffet with live shows from 180 AED.",
  keywords: [
    "Dubai Desert Safari",
    "VIP Desert Safari Dubai",
    "Evening Desert Safari BBQ Dinner",
    "Dune Bashing 4x4 Dubai",
    "Nexora Journeys Desert Safari"
  ],
};

export default function UaeDesertSafariPage() {
  const targetPhone = "923158494785";

  const safariPackages = [
    {
      id: "evening-desert-safari",
      title: "Evening Desert Safari with BBQ Dinner",
      tag: "Most Popular",
      priceAed: 180,
      duration: "6 Hours (3:00 PM – 9:00 PM)",
      image: "/images/hero/slide-3.jpg",
      description: "The classic Dubai desert experience with exciting 4x4 dune bashing, golden sunset photos, and complete Bedouin camp dinner.",
      includes: [
        "Hotel pickup and drop-off by 4x4 Land Cruiser",
        "25-30 minutes exhilarating dune bashing in high red dunes",
        "Sunset photo stop in the heart of the desert",
        "Camel riding & sandboarding experience",
        "Lavish BBQ buffet dinner (Veg & Non-Veg options)",
        "Live Tanoura dance, belly dance, and spectacular fire show",
        "Unlimited soft drinks, Arabic coffee (Gahwa), and fresh dates",
        "Henna tattoo designing for ladies"
      ]
    },
    {
      id: "vip-desert-safari",
      title: "VIP Desert Safari (Private Majlis Table)",
      tag: "Executive Experience",
      priceAed: 280,
      duration: "6.5 Hours (3:00 PM – 9:30 PM)",
      image: "/images/hero/slide-1.jpg",
      description: "All the thrills of the desert with priority service, exclusive elevated majlis seating, and dedicated waiter table service.",
      includes: [
        "Private 4x4 luxury transfer directly from your hotel",
        "Extended 35 minutes dune bashing across Lahbab red dunes",
        "VIP air-conditioned or open-air raised majlis seating",
        "Table service for hot BBQ buffet dinner with dessert",
        "Priority camel ride & unlimited sandboarding",
        "Live international entertainment shows from front-row seats",
        "Dedicated VIP hospitality attendant"
      ]
    },
    {
      id: "morning-desert-safari",
      title: "Morning Adventure Safari & Quad Biking",
      tag: "Action & Adventure",
      priceAed: 220,
      duration: "4 Hours (8:00 AM – 12:00 PM)",
      image: "/images/hero/slide-2.jpg",
      description: "Beat the afternoon heat with an exhilarating morning dune bashing session, sand dune surfing, and optional high-power quad biking.",
      includes: [
        "Early morning 8:00 AM hotel pickup in 4x4 Land Cruiser",
        "Morning golden dune drive and scenic photography",
        "Sandboarding on steep red dunes",
        "Guided camel trek in the open desert",
        "Complimentary cold refreshments and water bottles",
        "Return hotel transfer by 12:00 PM noon"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-3.jpg"
            alt="UAE Desert Safari"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#c5a059] text-black text-[11px] font-bold uppercase tracking-widest mb-3">
            Authentic Arabian Desert Adventures
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            UAE Desert Safari Experiences
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Red dune bashing, majestic desert sunsets, camel treks, and 5-star international BBQ buffets under the Arabian stars.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight">
            Select Your Desert Safari Package
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Licensed desert marshals, fully insured roll-cage Land Cruisers, and verified 5-star camp facilities.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safariPackages.map((pkg) => {
            const waText = encodeURIComponent(
              `Salam Nexora Journeys, I want to book the "${pkg.title}" (${pkg.priceAed} AED). Please confirm pickup availability for my dates.`
            );
            const waLink = `https://wa.me/${targetPhone}?text=${waText}`;

            return (
              <div
                key={pkg.id}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-60 bg-zinc-900">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#c5a059] text-black text-[11px] font-black uppercase tracking-wider">
                        {pkg.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/85 text-white px-3.5 py-1.5 font-extrabold text-sm uppercase backdrop-blur-sm border border-white/10">
                      {pkg.priceAed} AED <span className="text-[10px] text-zinc-400 font-normal">/ Person</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                      <FaClock className="text-[#c5a059]" /> {pkg.duration}
                    </span>
                    <h3 className="text-xl font-extrabold text-zinc-900 uppercase tracking-tight mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-5">
                      {pkg.description}
                    </p>

                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 mb-3 pb-1 border-b border-zinc-100">
                      Package Inclusions:
                    </h4>
                    <ul className="space-y-2 mb-6 text-xs text-zinc-700">
                      {pkg.includes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <FaCheck className="text-[#c5a059] shrink-0 text-xs mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <Link
                    href={`/tours/${pkg.id}`}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.16em] uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>View Details</span>
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
