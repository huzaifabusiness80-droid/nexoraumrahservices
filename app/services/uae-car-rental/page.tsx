"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaCar,
  FaGasPump,
  FaKey,
  FaUserFriends,
  FaSuitcase,
  FaArrowRight,
  FaShieldAlt,
  FaCheck,
  FaSpinner,
  FaWhatsapp,
} from "react-icons/fa";

interface RentalCar {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  year: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  dailyPriceAed: number;
  weeklyPriceAed: number | null;
  monthlyPriceAed: number | null;
  securityDeposit: number;
  freeMileagePerDay: number;
  features: string[];
  isSelfDrive: boolean;
  withDriverOption: boolean;
}

export default function UaeCarRentalPage() {
  const targetPhone = "923158494785";
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/car-rental");
        const data = await res.json();
        if (data.success) {
          setCars(data.cars);
        } else {
          setError("Failed to load vehicles");
        }
      } catch (err) {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

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

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-[#c5a059] text-3xl mx-auto mb-4" />
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Loading Fleet...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-[#c5a059] text-white text-xs font-bold uppercase tracking-widest cursor-pointer">
              Retry
            </button>
          </div>
        </div>
      ) : (
        /* Fleet Listing Section */
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          
          {/* Intro Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {cars.length} Vehicles Available for Rent
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

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {cars.map((car) => {
              const detailUrl = `/car-rental/${car.slug}`;
              const isContactPrice =
                car.dailyPriceAed <= 0 ||
                (Array.isArray(car.features) && car.features.includes("contact_for_price"));

              const waText = encodeURIComponent(
                isContactPrice
                  ? `Salam Nexora Journeys, I want to inquire about renting the "${car.name}" (${car.category}) in UAE. Please share pricing and availability.`
                  : `Salam Nexora Journeys, I want to rent the "${car.name}" (${car.category}). Daily rate: ${car.dailyPriceAed} AED. Please share booking availability.`
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
                        {isContactPrice ? (
                          <span>Contact for Price</span>
                        ) : (
                          <>
                            AED {car.dailyPriceAed} <span className="text-[10px] font-normal text-white/90">/ Day</span>
                          </>
                        )}
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
                          <span>{car.seats} Passengers</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaSuitcase className="text-[#b58e45] text-xs shrink-0" />
                          <span>{car.freeMileagePerDay} KM/Day</span>
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

                      {/* Features */}
                      <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {car.features.filter((f) => f !== "contact_for_price").slice(0, 3).join(" • ")}
                      </div>

                      {/* Weekly Rate Highlight */}
                      {!isContactPrice && car.weeklyPriceAed ? (
                        <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-2 rounded-lg text-xs flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Weekly Rate (Save 15%):</span>
                          <span className="font-extrabold text-[#946e27] text-sm">AED {car.weeklyPriceAed}</span>
                        </div>
                      ) : isContactPrice ? (
                        <div className="bg-[#faf6ed] border border-[#e8ce97] px-3 py-2 rounded-lg text-xs flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Tariff:</span>
                          <span className="font-extrabold text-[#946e27] text-xs">Custom Quote on WhatsApp</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-5 pt-0 space-y-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1fa951] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaWhatsapp className="text-base" />
                      <span>{isContactPrice ? "Inquire on WhatsApp" : "Instant WhatsApp Booking"}</span>
                    </a>
                    <Link
                      href={detailUrl}
                      className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-center font-semibold text-xs tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 border border-gray-200"
                    >
                      <span>View Specifications &amp; Rates</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
