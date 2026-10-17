"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaCar,
  FaMosque,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
  FaRedoAlt,
  FaSpinner,
} from "react-icons/fa";

interface ZiyaratTour {
  id: string;
  title: string;
  slug: string;
  city: string;
  duration: string;
  description: string;
  image: string;
  gallery: string[];
  placesCovered: string[];
  priceSedan: number;
  priceVan: number | null;
  priceSuv: number | null;
  includes: string[];
}

export default function UmrahZiyaratPage() {
  const targetPhone = "447882749006";

  // Data state
  const [tours, setTours] = useState<ZiyaratTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Fetch tours from backend
  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/ziyarat");
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

  // Toggle Handlers
  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleDuration = (dur: string) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    );
  };

  const clearFilters = () => {
    setSelectedDestinations([]);
    setSelectedPriceRanges([]);
    setSelectedDurations([]);
    setSortBy("recommended");
  };

  // Base Counts
  const counts = useMemo(() => {
    const destCounts: Record<string, number> = {};
    const priceCounts: Record<string, number> = {
      "under-250": 0,
      "250-350": 0,
      "above-350": 0,
    };
    const durCounts: Record<string, number> = {
      half: 0,
      extended: 0,
      full: 0,
    };

    tours.forEach((t) => {
      // Destination
      const city = t.city.toLowerCase();
      destCounts[city] = (destCounts[city] || 0) + 1;

      // Price
      if (t.priceSedan < 250) priceCounts["under-250"]++;
      else if (t.priceSedan <= 350) priceCounts["250-350"]++;
      else priceCounts["above-350"]++;

      // Duration
      if (t.duration.includes("3") || t.duration.includes("4")) durCounts.half++;
      else if (t.duration.includes("5") || t.duration.includes("6")) durCounts.extended++;
      else durCounts.full++;
    });

    return { destCounts, priceCounts, durCounts };
  }, [tours]);

  // Filtered and Sorted Tours
  const filteredTours = useMemo(() => {
    let list = [...tours];

    // Filter by destination
    if (selectedDestinations.length > 0) {
      list = list.filter((t) => selectedDestinations.includes(t.city.toLowerCase()));
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      list = list.filter((t) => {
        return selectedPriceRanges.some((range) => {
          if (range === "under-250") return t.priceSedan < 250;
          if (range === "250-350") return t.priceSedan >= 250 && t.priceSedan <= 350;
          if (range === "above-350") return t.priceSedan > 350;
          return false;
        });
      });
    }

    // Filter by duration
    if (selectedDurations.length > 0) {
      list = list.filter((t) => {
        return selectedDurations.some((dur) => {
          if (dur === "half") return t.duration.includes("3") || t.duration.includes("4");
          if (dur === "extended") return t.duration.includes("5") || t.duration.includes("6");
          if (dur === "full") return t.duration.includes("7") || t.duration.includes("8");
          return false;
        });
      });
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.priceSedan - b.priceSedan);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.priceSedan - a.priceSedan);
    } else if (sortBy === "duration") {
      list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    return list;
  }, [tours, selectedDestinations, selectedPriceRanges, selectedDurations, sortBy]);

  const getCityDisplay = (city: string) => {
    const c = city.toLowerCase();
    if (c === "makkah") return "Makkah";
    if (c === "madinah") return "Madina";
    if (c === "badar") return "Badar";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* 1. Official Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-4.jpg"
            alt="Umrah Ziyarat Tours"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            Sacred Historical Heritage Tours
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Umrah Ziyarat &amp; Holy Tours
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Private, dedicated chauffeur excursions to Cave Hira, Mount Uhud, Masjid Quba, the Battlefield of Badar, and blessed holy sanctuaries of Makkah and Madinah.
          </p>
        </div>
      </section>

      {/* Loading / Error */}
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
        /* 2. Main Content */
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            
            {/* LEFT SIDEBAR: Sticky Filter Box */}
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start bg-white border border-gray-200/90 rounded-lg p-5 shadow-xs">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-1">
                Filter Ziyarat
              </h2>

              {/* Filter Section: Destination */}
              <div className="py-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                  Destination
                </span>
                <div className="space-y-2">
                  {Object.entries(counts.destCounts).map(([dest, count]) => (
                    <label key={dest} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(dest)}
                        onChange={() => toggleDestination(dest)}
                        className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                      />
                      <span>{getCityDisplay(dest)} ({count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Price Range */}
              <div className="py-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                  Price Range
                </span>
                <div className="space-y-2">
                  {[
                    { key: "under-250", label: "Under SAR 250" },
                    { key: "250-350", label: "SAR 250 - 350" },
                    { key: "above-350", label: "Above SAR 350" },
                  ].map((r) => (
                    <label key={r.key} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(r.key)}
                        onChange={() => togglePriceRange(r.key)}
                        className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                      />
                      <span>{r.label} ({counts.priceCounts[r.key]})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Tour Duration */}
              <div className="py-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                  Tour Duration
                </span>
                <div className="space-y-2">
                  {[
                    { key: "half", label: "Half Day (3 - 4 Hrs)" },
                    { key: "extended", label: "Extended (5 - 6 Hrs)" },
                    { key: "full", label: "Full Day (7 - 8 Hrs)" },
                  ].map((d) => (
                    <label key={d.key} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(d.key)}
                        onChange={() => toggleDuration(d.key)}
                        className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                      />
                      <span>{d.label} ({counts.durCounts[d.key]})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vehicle Types Info */}
              <div className="py-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                  Included Fleet
                </span>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCar className="text-[#b58e45]" />
                    <span>Sedan (Camry 1-4 Pax)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar className="text-[#b58e45]" />
                    <span>SUV / Family (Staria 5-7 Pax)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar className="text-[#b58e45]" />
                    <span>VIP GMC Yukon XL</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <FaRedoAlt className="text-xs text-gray-400" /> Clear Filters
                </button>
              </div>
            </aside>

            {/* RIGHT COLUMN: Results Header + Tour Cards List */}
            <section className="flex-1 w-full min-w-0">
              {/* Results Counter & Sort Dropdown */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {filteredTours.length} Tours Found
                </h2>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-[#b58e45] cursor-pointer shadow-2xs"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration">Tour Duration</option>
                  </select>
                </div>
              </div>

              {/* Tours List */}
              {filteredTours.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
                  <p className="text-gray-500 text-sm">No Ziyarat tours match your selected filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-[#b58e45] text-white text-xs font-semibold rounded-md hover:bg-[#9f7932] transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTours.map((tour) => {
                    const detailUrl = `/ziyarat/${tour.slug}`;
                    const cityName = getCityDisplay(tour.city);
                    const tourWaText = encodeURIComponent(
                      `Salam Nexora Umrah Services, I want to book "${tour.title}" (${cityName}, ${tour.duration}). Starting from SAR ${tour.priceSedan} per vehicle. Please share vehicle availability.`
                    );
                    const tourWaLink = `https://wa.me/${targetPhone}?text=${tourWaText}`;

                    return (
                      <article
                        key={tour.id}
                        className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch shadow-2xs hover:shadow-md transition-shadow duration-200"
                      >
                        {/* Left: Tour Image with Destination Badge */}
                        <div className="relative w-full md:w-64 lg:w-72 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 288px"
                          />
                          <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xs">
                            <FaMapMarkerAlt className="text-white text-[10px]" />
                            {cityName}
                          </span>
                        </div>

                        {/* Middle: Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                          <div>
                            <Link href={detailUrl} className="group">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b58e45] transition-colors leading-snug">
                                {tour.title}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 font-medium">
                              <div className="flex items-center text-amber-400 text-xs sm:text-sm gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} />
                                ))}
                              </div>
                              <span>5 Star Guided</span>
                              <span>•</span>
                              <span>{cityName}</span>
                              <span>•</span>
                              <span className="text-gray-600 flex items-center gap-1">
                                <FaClock className="text-[10px]" /> {tour.duration}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-500 mt-2.5 line-clamp-2 leading-relaxed">
                              {tour.description}
                            </p>
                          </div>

                          {/* Inclusions Row */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <FaMosque className="text-gray-400 text-xs" />
                              <span>{tour.placesCovered.length} Holy Sanctuary Stops</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FaCar className="text-gray-400 text-xs" />
                              <span>AC Chauffeur Vehicle</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FaCheckCircle className="text-gray-400 text-xs" />
                              <span>Doorstep Hotel Pickup</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FaClock className="text-gray-400 text-xs" />
                              <span>Flexible Wait Times</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Pricing & CTA */}
                        <div className="w-full md:w-48 lg:w-52 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 shrink-0 text-right">
                          <div>
                            <span className="text-xs text-gray-400 font-medium block">
                              Starting from
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 tracking-tight">
                              <span className="text-sm font-bold text-gray-600 mr-1">SAR</span>
                              {tour.priceSedan}
                            </div>
                            <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                              Per Private Vehicle
                            </span>
                          </div>

                          <div className="w-full space-y-2 mt-4 md:mt-0">
                            <Link
                              href={detailUrl}
                              className="w-full py-2 px-3 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>View Details</span>
                              <FaArrowRight className="text-xs" />
                            </Link>
                            <a
                              href={tourWaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <FaWhatsapp className="text-[#25D366] text-base" />
                              <span>Book on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
