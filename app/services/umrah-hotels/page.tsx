"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allHotels, HotelItem } from "@/lib/data/hotelData";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaUtensils,
  FaClock,
  FaConciergeBell,
  FaParking,
  FaBusAlt,
  FaArrowRight,
  FaWhatsapp,
  FaRedoAlt,
} from "react-icons/fa";

function getHotelCategory(hotel: HotelItem): "Economy" | "Standard" | "Deluxe" | "Luxury" {
  if (
    hotel.stars >= 5 ||
    (hotel.quadBed && hotel.quadBed >= 500) ||
    hotel.distance === "100M" ||
    hotel.distance === "150M"
  ) {
    return "Luxury";
  }
  if (
    hotel.stars === 4 ||
    (hotel.quadBed && hotel.quadBed >= 250) ||
    (hotel.distance !== "Shuttle" && parseInt(hotel.distance) <= 350)
  ) {
    return "Deluxe";
  }
  if (hotel.distance !== "Shuttle" || (hotel.quadBed && hotel.quadBed >= 120)) {
    return "Standard";
  }
  return "Economy";
}

function getStartingPriceInfo(hotel: HotelItem) {
  if (hotel.sharingBed !== null && hotel.sharingBed !== undefined) {
    return {
      price: hotel.sharingBed,
      unit: "Per Sharing Bed",
    };
  }
  if (hotel.quadBed !== null && hotel.quadBed !== undefined) {
    return {
      price: hotel.quadBed,
      unit: "Per Room",
    };
  }
  return {
    price: 150,
    unit: "Per Night",
  };
}

export default function UmrahHotelsPage() {
  const targetPhone = "923158494785";

  // Filter States
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Toggle Handlers
  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((item) => item !== loc) : [...prev, loc]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]
    );
  };

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((item) => item !== star) : [...prev, star]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedLocations([]);
    setSelectedPriceRanges([]);
    setSelectedStars([]);
    setSelectedTypes([]);
    setSortBy("recommended");
  };

  // Base Counts Calculation
  const counts = useMemo(() => {
    const locCounts: Record<string, number> = { makkah: 0, madina: 0 };
    const priceCounts: Record<string, number> = {
      "under-100": 0,
      "100-250": 0,
      "250-500": 0,
      "above-500": 0,
    };
    const starCounts: Record<number, number> = { 3: 0, 4: 0, 5: 0 };
    const typeCounts: Record<string, number> = {
      Economy: 0,
      Standard: 0,
      Deluxe: 0,
      Luxury: 0,
    };

    allHotels.forEach((h) => {
      // Location
      if (h.city === "makkah") locCounts.makkah++;
      if (h.city === "madinah") locCounts.madina++;

      // Price
      const { price } = getStartingPriceInfo(h);
      if (price < 100) priceCounts["under-100"]++;
      else if (price <= 250) priceCounts["100-250"]++;
      else if (price <= 500) priceCounts["250-500"]++;
      else priceCounts["above-500"]++;

      // Stars
      const s = h.stars || 3;
      if (starCounts[s] !== undefined) starCounts[s]++;

      // Type
      const cat = getHotelCategory(h);
      if (typeCounts[cat] !== undefined) typeCounts[cat]++;
    });

    return { locCounts, priceCounts, starCounts, typeCounts };
  }, []);

  // Filtered & Sorted Hotel List
  const filteredHotels = useMemo(() => {
    let list = [...allHotels];

    // Filter by Location
    if (selectedLocations.length > 0) {
      list = list.filter((h) => {
        const cityKey = h.city === "madinah" ? "madina" : "makkah";
        return selectedLocations.includes(cityKey);
      });
    }

    // Filter by Price Range
    if (selectedPriceRanges.length > 0) {
      list = list.filter((h) => {
        const { price } = getStartingPriceInfo(h);
        return selectedPriceRanges.some((range) => {
          if (range === "under-100") return price < 100;
          if (range === "100-250") return price >= 100 && price <= 250;
          if (range === "250-500") return price > 250 && price <= 500;
          if (range === "above-500") return price > 500;
          return false;
        });
      });
    }

    // Filter by Star Rating
    if (selectedStars.length > 0) {
      list = list.filter((h) => selectedStars.includes(h.stars || 3));
    }

    // Filter by Hotel Type
    if (selectedTypes.length > 0) {
      list = list.filter((h) => selectedTypes.includes(getHotelCategory(h)));
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => getStartingPriceInfo(a).price - getStartingPriceInfo(b).price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => getStartingPriceInfo(b).price - getStartingPriceInfo(a).price);
    } else if (sortBy === "stars-desc") {
      list.sort((a, b) => (b.stars || 3) - (a.stars || 3));
    } else if (sortBy === "distance") {
      list.sort((a, b) => {
        const distA = a.distance === "Shuttle" ? 9999 : parseInt(a.distance) || 1000;
        const distB = b.distance === "Shuttle" ? 9999 : parseInt(b.distance) || 1000;
        return distA - distB;
      });
    }

    return list;
  }, [selectedLocations, selectedPriceRanges, selectedStars, selectedTypes, sortBy]);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* 1. Official Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-1.jpg"
            alt="Makkah & Madinah Hotels"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            Official Hotel Tariff • Valid till 30th Nov.
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Makkah &amp; Madinah Hotel Rates
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Your Trusted Partner for a Blessed Umrah Journey. Verified fixed rates across Ibraheem Khalil, Ajyad, Al Hijrah, South Markazia, and Bilal Masjid with walking and shuttle options.
          </p>
        </div>
      </section>

      {/* 2. Main Content: Sticky Filter Sidebar on Left + Hotel Cards on Right */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* LEFT SIDEBAR: Sticky Filter Box */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start bg-white border border-gray-200/90 rounded-lg p-5 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 mb-4 pb-1">
              Filter Hotels
            </h2>

            {/* Filter Section: Location */}
            <div className="py-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                Location
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes("makkah")}
                    onChange={() => toggleLocation("makkah")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Makkah ({counts.locCounts.makkah})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes("madina")}
                    onChange={() => toggleLocation("madina")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Madina ({counts.locCounts.madina})</span>
                </label>
              </div>
            </div>

            {/* Filter Section: Price Range */}
            <div className="py-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                Price Range
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes("under-100")}
                    onChange={() => togglePriceRange("under-100")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Under SAR 100 ({counts.priceCounts["under-100"]})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes("100-250")}
                    onChange={() => togglePriceRange("100-250")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>SAR 100 - 250 ({counts.priceCounts["100-250"]})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes("250-500")}
                    onChange={() => togglePriceRange("250-500")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>SAR 250 - 500 ({counts.priceCounts["250-500"]})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes("above-500")}
                    onChange={() => togglePriceRange("above-500")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Above SAR 500 ({counts.priceCounts["above-500"]})</span>
                </label>
              </div>
            </div>

            {/* Filter Section: Star Rating */}
            <div className="py-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                Star Rating
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(3)}
                    onChange={() => toggleStar(3)}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★★★</span> 3 Star ({counts.starCounts[3] || 0})
                  </span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(4)}
                    onChange={() => toggleStar(4)}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★★★★</span> 4 Star ({counts.starCounts[4] || 0})
                  </span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(5)}
                    onChange={() => toggleStar(5)}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★★★★★</span> 5 Star ({counts.starCounts[5] || 0})
                  </span>
                </label>
              </div>
            </div>

            {/* Filter Section: Hotel Type */}
            <div className="py-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2.5">
                Hotel Type
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Economy")}
                    onChange={() => toggleType("Economy")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Economy ({counts.typeCounts.Economy})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Standard")}
                    onChange={() => toggleType("Standard")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Standard ({counts.typeCounts.Standard})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Deluxe")}
                    onChange={() => toggleType("Deluxe")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Deluxe ({counts.typeCounts.Deluxe})</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Luxury")}
                    onChange={() => toggleType("Luxury")}
                    className="w-4 h-4 rounded border-gray-300 text-[#b58e45] focus:ring-[#b58e45] accent-[#b58e45] cursor-pointer"
                  />
                  <span>Luxury ({counts.typeCounts.Luxury})</span>
                </label>
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

          {/* RIGHT COLUMN: Results Header + Hotel Cards List */}
          <section className="flex-1 w-full min-w-0">
            {/* Results Counter & Sort Dropdown */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {filteredHotels.length} Hotels Found
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
                  <option value="stars-desc">Star Rating: High to Low</option>
                  <option value="distance">Closest to Haram</option>
                </select>
              </div>
            </div>

            {/* Hotel Cards List */}
            {filteredHotels.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
                <p className="text-gray-500 text-sm">No hotels match your selected filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-[#b58e45] text-white text-xs font-semibold rounded-md hover:bg-[#9f7932] transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => {
                  const { price, unit } = getStartingPriceInfo(hotel);
                  const detailUrl = `/hotels/${hotel.id}`;
                  const hotelWaText = encodeURIComponent(
                    `Salam Nexora Umrah Services, I would like to book "${hotel.name}" in ${
                      hotel.city === "makkah" ? "Makkah" : "Madinah"
                    } (${hotel.location}, ${hotel.distance}). Starting from SAR ${price} (${unit}). Please confirm room availability.`
                  );
                  const hotelWaLink = `https://wa.me/${targetPhone}?text=${hotelWaText}`;

                  return (
                    <article
                      key={hotel.id}
                      className="bg-white border border-gray-200/80 hover:border-gray-300 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch shadow-2xs hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Left: Hotel Image with Location Badge */}
                      <div className="relative w-full md:w-64 lg:w-72 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 288px"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xs">
                          <FaMapMarkerAlt className="text-white text-[10px]" />
                          {hotel.city === "makkah" ? "Makkah" : "Madina"}
                        </span>
                      </div>

                      {/* Middle: Details (Name, Stars, Description, Amenities) */}
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <Link href={detailUrl} className="group">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b58e45] transition-colors leading-snug">
                              {hotel.name}
                            </h3>
                          </Link>

                          {/* Stars & Location Line */}
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 font-medium">
                            <div className="flex items-center text-amber-400 text-xs sm:text-sm gap-0.5">
                              {[...Array(hotel.stars || 4)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                            <span>{hotel.stars || 4} Star</span>
                            <span>•</span>
                            <span>{hotel.city === "makkah" ? "Makkah" : "Madina"}</span>
                            {hotel.distance && (
                              <>
                                <span>•</span>
                                <span className="text-gray-600">
                                  {hotel.distance === "Shuttle"
                                    ? "24/7 Shuttle"
                                    : `${hotel.distance} Walk`}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-500 mt-2.5 line-clamp-2 leading-relaxed">
                            {hotel.description}
                          </p>
                        </div>

                        {/* Amenities Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <FaWifi className="text-gray-400 text-xs" />
                            <span>Free WiFi</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaUtensils className="text-gray-400 text-xs" />
                            <span>Restaurant</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaClock className="text-gray-400 text-xs" />
                            <span>24/7 Front Desk</span>
                          </div>
                          {hotel.distance === "Shuttle" ? (
                            <div className="flex items-center gap-1.5">
                              <FaBusAlt className="text-gray-400 text-xs" />
                              <span>Free Shuttle</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <FaConciergeBell className="text-gray-400 text-xs" />
                              <span>Room Service</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Pricing & CTA Buttons */}
                      <div className="w-full md:w-48 lg:w-52 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 shrink-0 text-right">
                        <div>
                          <span className="text-xs text-gray-400 font-medium block">
                            Starting from
                          </span>
                          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 tracking-tight">
                            <span className="text-sm font-bold text-gray-600 mr-1">SAR</span>
                            {price}
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                            {unit}
                          </span>
                        </div>

                        {/* CTA Actions */}
                        <div className="w-full space-y-2 mt-4 md:mt-0">
                          <Link
                            href={detailUrl}
                            className="w-full py-2 px-3 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>View Details</span>
                            <FaArrowRight className="text-xs" />
                          </Link>
                          <a
                            href={hotelWaLink}
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

      <Footer />
    </div>
  );
}
