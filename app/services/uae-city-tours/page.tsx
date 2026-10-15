"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaClock, FaArrowRight, FaSpinner } from "react-icons/fa";

interface CityTour {
  id: string;
  title: string;
  slug: string;
  city: string;
  duration: string;
  description: string;
  image: string;
  highlights: string[];
  priceAed: number;
  pricePerPerson: number | null;
  privateCarPrice: number | null;
  inclusions: string[];
}

export default function UaeCityToursPage() {
  const targetPhone = "923158494785";
  const [tours, setTours] = useState<CityTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/city-tours");
        const data = await res.json();
        if (data.success) {
          setTours(data.tours);
        } else {
          setError("Failed to load tours");
        }
      } catch (err) {
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-2.jpg"
            alt="UAE City Tours"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#c5a059] text-black text-[11px] font-bold uppercase tracking-widest mb-3">
            Private Chauffeur Excursions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            UAE City Tours &amp; Sightseeing
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover the iconic landmarks of Dubai and Abu Dhabi in air-conditioned private comfort with dedicated English-speaking chauffeurs.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-[#c5a059] text-3xl mx-auto mb-4" />
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Loading Tours...</p>
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
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight">
              Curated Sightseeing Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              All tours include private vehicle, certified driver, fuel, parking fees, and door-to-door hotel transfers in Dubai.
            </p>
          </div>

          {/* Tour Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tours.map((pkg) => {
              const waText = encodeURIComponent(
                `Salam Nexora Journeys, I am interested in booking the "${pkg.title}" (${pkg.priceAed} AED). Please provide availability for my dates.`
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
                        <span className="px-3 py-1 bg-black/80 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/10 uppercase">
                          <FaClock className="text-[#c5a059]" /> {pkg.duration}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-[#c5a059] text-white px-3.5 py-1.5 font-black text-sm uppercase shadow-md">
                        From {pkg.priceAed} AED
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-extrabold text-zinc-900 uppercase tracking-tight mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-5">
                        {pkg.description}
                      </p>

                      <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 mb-3 pb-1 border-b border-zinc-100">
                        Included Highlights:
                      </h4>
                      <ul className="space-y-2 mb-6 text-xs text-zinc-700">
                        {pkg.highlights.map((stop, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <FaCheck className="text-[#c5a059] shrink-0 text-xs mt-0.5" />
                            <span>{stop}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-2">
                    <Link
                      href={`/tours/${pkg.slug}`}
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
      )}

      <Footer />
    </div>
  );
}
