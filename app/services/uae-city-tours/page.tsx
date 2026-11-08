"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheck,
  FaClock,
  FaArrowRight,
  FaSpinner,
  FaMapMarkerAlt,
  FaRedoAlt,
  FaWhatsapp,
} from "react-icons/fa";

interface CityTour {
  id: string;
  title: string;
  slug: string;
  city: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  highlights: string[];
  priceAed: number;
  inclusions: string[];
}

const PRICE_RANGES = [
  { key: "under-100", label: "Under AED 100", matches: (price: number) => price < 100 },
  { key: "100-249", label: "AED 100 - 249", matches: (price: number) => price >= 100 && price < 250 },
  { key: "250-499", label: "AED 250 - 499", matches: (price: number) => price >= 250 && price < 500 },
  { key: "above-500", label: "AED 500 and above", matches: (price: number) => price >= 500 },
] as const;

const normalize = (value: string) => value.trim().toLocaleLowerCase();
const displayLabel = (value: string) =>
  value.trim().replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function UaeCityToursPage() {
  const targetPhone = "447882749006";
  const [tours, setTours] = useState<CityTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");

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
      } catch {
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const cities = useMemo(
    () => Array.from(
      new Map(tours.filter((tour) => tour.city?.trim()).map((tour) => [normalize(tour.city), displayLabel(tour.city)])).entries()
    ).sort((a, b) => a[1].localeCompare(b[1])),
    [tours]
  );
  const categories = useMemo(
    () => Array.from(
      new Map(tours.filter((tour) => tour.category?.trim()).map((tour) => [normalize(tour.category), displayLabel(tour.category)])).entries()
    ).sort((a, b) => a[1].localeCompare(b[1])),
    [tours]
  );

  const counts = useMemo(() => {
    const cityCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    const priceCounts: Record<string, number> = Object.fromEntries(PRICE_RANGES.map((range) => [range.key, 0]));

    tours.forEach((tour) => {
      if (tour.city?.trim()) {
        const key = normalize(tour.city);
        cityCounts[key] = (cityCounts[key] || 0) + 1;
      }
      if (tour.category?.trim()) {
        const key = normalize(tour.category);
        categoryCounts[key] = (categoryCounts[key] || 0) + 1;
      }
      const priceRange = PRICE_RANGES.find((range) => range.matches(tour.priceAed));
      if (priceRange) priceCounts[priceRange.key] += 1;
    });

    return { cityCounts, categoryCounts, priceCounts };
  }, [tours]);

  const toggleFilter = (
    value: string,
    currentValues: string[],
    setValues: (values: string[]) => void
  ) => {
    setValues(
      currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value]
    );
  };

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSortBy("recommended");
  };

  const filteredTours = useMemo(() => {
    const results = tours.filter((tour) =>
      (!selectedCities.length || selectedCities.includes(normalize(tour.city))) &&
      (!selectedCategories.length || selectedCategories.includes(normalize(tour.category))) &&
      (!selectedPriceRanges.length || selectedPriceRanges.some((key) =>
        PRICE_RANGES.find((range) => range.key === key)?.matches(tour.priceAed)
      ))
    );
    if (sortBy === "price-asc") results.sort((a, b) => a.priceAed - b.priceAed);
    if (sortBy === "price-desc") results.sort((a, b) => b.priceAed - a.priceAed);
    return results;
  }, [selectedCategories, selectedCities, selectedPriceRanges, sortBy, tours]);

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
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#c5a059] text-black text-[11px] font-bold uppercase tracking-widest mb-3">
            Private Chauffeur Excursions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            Travels &amp; Tourism
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover curated sightseeing and cultural experiences across Dubai, Abu Dhabi, and Sharjah, with transparent prices and private comfort.
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
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start bg-white border border-zinc-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-zinc-900">Filter Tours</h2>
                {(selectedCities.length + selectedCategories.length + selectedPriceRanges.length) > 0 && (
                  <span className="text-[11px] font-semibold text-[#9b762c]">
                    {selectedCities.length + selectedCategories.length + selectedPriceRanges.length} active
                  </span>
                )}
              </div>

              <fieldset className="py-3 border-t border-zinc-100">
                <legend className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                  Destination
                </legend>
                <div className="space-y-2">
                  {cities.map(([cityKey, cityLabel]) => (
                    <label key={cityKey} className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(cityKey)}
                        onChange={() => toggleFilter(cityKey, selectedCities, setSelectedCities)}
                        className="w-4 h-4 border-zinc-300 accent-[#b58e45] focus:ring-[#b58e45] cursor-pointer"
                      />
                      <span className="flex-1">{cityLabel}</span>
                      <span className="text-xs text-zinc-400">{counts.cityCounts[cityKey] || 0}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="py-3 border-t border-zinc-100">
                <legend className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                  Price Range (AED)
                </legend>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <label key={range.key} className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.key)}
                        onChange={() => toggleFilter(range.key, selectedPriceRanges, setSelectedPriceRanges)}
                        className="w-4 h-4 border-zinc-300 accent-[#b58e45] focus:ring-[#b58e45] cursor-pointer"
                      />
                      <span className="flex-1">{range.label}</span>
                      <span className="text-xs text-zinc-400">{counts.priceCounts[range.key]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {categories.length > 0 && (
                <fieldset className="py-3 border-t border-zinc-100">
                  <legend className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                    Tour Category
                  </legend>
                  <div className="space-y-2">
                    {categories.map(([categoryKey, categoryLabel]) => (
                      <label key={categoryKey} className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(categoryKey)}
                          onChange={() => toggleFilter(categoryKey, selectedCategories, setSelectedCategories)}
                          className="w-4 h-4 border-zinc-300 accent-[#b58e45] focus:ring-[#b58e45] cursor-pointer"
                        />
                        <span className="flex-1">{categoryLabel}</span>
                        <span className="text-xs text-zinc-400">{counts.categoryCounts[categoryKey] || 0}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={selectedCities.length + selectedCategories.length + selectedPriceRanges.length === 0 && sortBy === "recommended"}
                  className="w-full py-2 px-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaRedoAlt className="text-xs text-zinc-400" /> Clear Filters
                </button>
              </div>
            </aside>

            <section className="flex-1 w-full min-w-0">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900" aria-live="polite">
                    {filteredTours.length} {filteredTours.length === 1 ? "Tour" : "Tours"} Found
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    {filteredTours.length === tours.length ? "Showing all available experiences" : `Filtered from ${tours.length} available experiences`}
                  </p>
                </div>
                <label className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-zinc-500 font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    aria-label="Sort tours"
                    className="bg-white border border-zinc-200 text-zinc-700 text-xs sm:text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#b58e45] cursor-pointer"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </label>
              </div>

              {filteredTours.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-lg p-10 text-center">
                  <p className="text-zinc-600 text-sm">
                    {tours.length === 0 ? "No tours are currently available." : "No tours match your selected filters."}
                  </p>
                  {tours.length > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-[#b58e45] text-white text-xs font-semibold rounded-md hover:bg-[#9f7932] transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTours.map((tour) => {
                    const detailUrl = `/tours/${tour.slug}`;
                    const cityLabel = displayLabel(tour.city);
                    const whatsAppMessage = encodeURIComponent(
                      `Salam Nexora Journeys, I am interested in the "${tour.title}" in ${cityLabel} at AED ${tour.priceAed} fixed per private vehicle (not per person). Please confirm availability.`
                    );

                    return (
                      <article
                        key={tour.id}
                        className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="relative w-full md:w-56 lg:w-64 h-48 md:h-auto md:min-h-[220px] rounded-md overflow-hidden shrink-0 bg-zinc-100">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 256px"
                            className="object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-900/85 text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-[10px]" />
                            {cityLabel}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {tour.category && (
                                <span className="px-2 py-1 bg-[#faf6ed] text-[#9b762c] text-[10px] font-bold uppercase tracking-wider">
                                  {displayLabel(tour.category)}
                                </span>
                              )}
                              {tour.duration && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                                  <FaClock className="text-[#b58e45]" />
                                  {tour.duration}
                                </span>
                              )}
                            </div>
                            <Link href={detailUrl} className="group">
                              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-[#9b762c] transition-colors leading-snug">
                                {tour.title}
                              </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                              {tour.description}
                            </p>
                          </div>

                          {tour.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-600">
                              {tour.highlights.slice(0, 3).map((highlight, index) => (
                                <span key={`${tour.id}-highlight-${index}`} className="flex items-start gap-1.5">
                                  <FaCheck className="text-[#b58e45] shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{highlight}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="w-full md:w-48 lg:w-52 flex flex-row md:flex-col justify-between md:items-end border-t md:border-t-0 md:border-l border-zinc-100 pt-3 md:pt-0 md:pl-5 shrink-0 text-left md:text-right gap-4">
                          <div>
                            <span className="text-xs text-zinc-500 font-medium block">Private vehicle rate</span>
                            <div className="text-xl sm:text-2xl font-black text-zinc-900 mt-0.5 tracking-tight">
                              <span className="text-sm font-bold text-zinc-600 mr-1">AED</span>
                              {tour.priceAed}
                            </div>
                            <span className="text-[11px] text-zinc-400 font-medium block mt-0.5">
                              Flat rate, not per person
                            </span>
                          </div>

                          <div className="w-1/2 md:w-full min-w-0 space-y-2">
                            <Link
                              href={detailUrl}
                              className="w-full py-2 px-3 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
                            >
                              <span>View Details</span>
                              <FaArrowRight className="text-xs" />
                            </Link>
                            <a
                              href={`https://wa.me/${targetPhone}?text=${whatsAppMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full min-w-0 py-2 px-2 sm:px-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-[11px] sm:text-xs font-semibold whitespace-nowrap rounded-md transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                            >
                              <FaWhatsapp className="text-[#25D366] text-base shrink-0" />
                              <span className="whitespace-nowrap">Book on WhatsApp</span>
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
