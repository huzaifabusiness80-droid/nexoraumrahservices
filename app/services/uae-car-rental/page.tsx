import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { carRentalVehicles } from "@/lib/data/carRentalData";
import {
  FaWhatsapp,
  FaCar,
  FaGasPump,
  FaKey,
  FaUserFriends,
  FaSuitcase,
  FaArrowRight,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "UAE Car Rental Dubai & Abu Dhabi | Self-Drive & Chauffeur | Nexora Journeys",
  description:
    "Affordable self-drive and VIP private chauffeur car rentals across Dubai, Abu Dhabi, and Sharjah. Daily and weekly rates starting from 120 AED with free airport delivery and comprehensive insurance.",
  keywords: [
    "Car Rental Dubai",
    "Abu Dhabi Car Hire",
    "Luxury SUV Rental Dubai",
    "GMC Yukon Rental UAE",
    "Chauffeur Car Service Dubai",
    "Nexora Journeys Car Rental",
  ],
};

export default function UaeCarRentalPage() {
  const targetPhone = "923158494785";

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-1.jpg"
            alt="UAE Car Rental"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            Self-Drive &amp; Chauffeur Rentals
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            UAE Car Rental Fleet
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hassle-free car rental in Dubai, Abu Dhabi, and Sharjah with transparent rates, zero hidden deposit deductions, and free airport delivery.
          </p>
        </div>
      </section>

      {/* Fleet Listing Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Intro Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {carRentalVehicles.length} Vehicles Available for Rent
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select any vehicle below and click &quot;Book Now&quot; to inspect full specifications and transparent tariffs.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-lg shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <FaShieldAlt className="text-[#b58e45]" /> Comprehensive Insurance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <FaCheck className="text-emerald-500" /> Free Airport Delivery
            </span>
          </div>
        </div>

        {/* Super Simple & Elegant Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {carRentalVehicles.map((car) => {
            const detailUrl = `/car-rental/${car.id}`;
            const waText = encodeURIComponent(
              `Salam Nexora Journeys, I want to rent the "${car.name}" (${car.category}). Daily rate: ${car.dailyPriceAed} AED. Please share booking availability.`
            );
            const waLink = `https://wa.me/${targetPhone}?text=${waText}`;

            return (
              <article
                key={car.id}
                className="bg-white border border-gray-200/90 hover:border-[#b58e45] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image */}
                  <Link href={detailUrl} className="block relative w-full h-52 sm:h-56 bg-zinc-950 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                      {car.category}
                    </span>
                    {/* Daily Rate Pill */}
                    <div className="absolute bottom-3 right-3 bg-[#b58e45] text-white px-3 py-1 text-xs font-bold rounded shadow-xs">
                      AED {car.dailyPriceAed} <span className="text-[10px] font-normal text-white/90">/ Day</span>
                    </div>
                  </Link>

                  {/* Vehicle Info */}
                  <div className="p-5">
                    <Link href={detailUrl}>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#b58e45] transition-colors leading-snug mb-2">
                        {car.name}
                      </h3>
                    </Link>

                    {/* Specs Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3.5 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <FaUserFriends className="text-[#b58e45] text-xs shrink-0" />
                        <span>{car.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaSuitcase className="text-[#b58e45] text-xs shrink-0" />
                        <span>{car.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaKey className="text-[#b58e45] text-xs shrink-0" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaGasPump className="text-[#b58e45] text-xs shrink-0" />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {car.description}
                    </p>

                    {/* Weekly Rate Highlight */}
                    <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-2 rounded-lg text-xs flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Weekly Rate (Save 15%):</span>
                      <span className="font-extrabold text-[#946e27] text-sm">AED {car.weeklyPriceAed}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  {/* Book Now Button -> Opens Detail Page */}
                  <Link
                    href={detailUrl}
                    className="w-full py-2.5 px-4 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                </div>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
