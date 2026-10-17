"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaClock, FaArrowRight, FaSpinner, FaWhatsapp } from "react-icons/fa";

interface SafariPackage {
  id: string;
  title: string;
  slug: string;
  packageType: string;
  timing: string;
  priceAed: number;
  vipPriceAed: number | null;
  image: string;
  description: string;
  activities: string[];
  includes: string[];
}

export default function UaeDesertSafariPage() {
  const targetPhone = "447882749006";
  const [safaris, setSafaris] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSafaris() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/desert-safari");
        const data = await res.json();
        if (data.success) {
          setSafaris(data.safaris);
        } else {
          setError("Failed to load safari packages");
        }
      } catch (err) {
        setError("Failed to load safari packages");
      } finally {
        setLoading(false);
      }
    }
    fetchSafaris();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/services/desertsafariimage.png"
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

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-[#c5a059] text-3xl mx-auto mb-4" />
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Loading Packages...</p>
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
              Select Your Desert Safari Package
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Licensed desert marshals, fully insured roll-cage Land Cruisers, and verified 5-star camp facilities.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {safaris.map((pkg) => {
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
                          {pkg.packageType}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/85 text-white px-3.5 py-1.5 font-extrabold text-sm uppercase backdrop-blur-sm border border-white/10">
                        {pkg.priceAed} AED <span className="text-[10px] text-zinc-400 font-normal">/ Person</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <FaClock className="text-[#c5a059]" /> {pkg.timing}
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
                      href={`/tours/${pkg.slug}`}
                      className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.16em] uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold tracking-[0.16em] uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>Book on WhatsApp</span>
                    </a>
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
