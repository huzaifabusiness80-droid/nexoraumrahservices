"use client";

import { useState, useEffect, useMemo } from "react";
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
  FaRedoAlt,
} from "react-icons/fa";
import {
  LEGACY_RENTAL_CAR_COMPANY_MAP,
  LEGACY_RENTAL_CAR_TYPE_MAP,
  RENTAL_CAR_COMPANIES,
  RENTAL_CAR_TYPES,
} from "@/lib/carRentalOptions";

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

const normalize = (value: string) => value.trim().toLocaleLowerCase();
const displayLabel = (value: string) =>
  value.trim().replace(/\b\w/g, (letter) => letter.toUpperCase());
const getCarTypeKey = (category: string) =>
  normalize(LEGACY_RENTAL_CAR_TYPE_MAP[normalize(category)] || category);
const getCompanyKey = (brand: string) => {
  const legacyCompany = Object.entries(LEGACY_RENTAL_CAR_COMPANY_MAP)
    .find(([name]) => normalize(name) === normalize(brand))?.[1];
  return normalize(legacyCompany || brand);
};

export default function UaeCarRentalPage() {
  const targetPhone = "447882749006";
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/car-rental");
        const data = await res.json();
        if (!res.ok || !data.success || !Array.isArray(data.cars)) {
          throw new Error(data.error || "Failed to load vehicles");
        }
        if (data.success) {
          setCars(data.cars);
        }
      } catch (fetchError) {
        console.error("Failed to load rental fleet:", fetchError);
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const carTypes = useMemo(() => RENTAL_CAR_TYPES.map((type) => [normalize(type), type] as const), []);
  const companies = useMemo(
    () => RENTAL_CAR_COMPANIES.map((company) => [normalize(company), company] as const),
    []
  );
  const models = useMemo(
    () => Array.from(
      new Map(cars.filter((car) => car.name?.trim()).map((car) => [normalize(car.name), car.name.trim()])).entries()
    ).sort((a, b) => a[1].localeCompare(b[1])),
    [cars]
  );

  const counts = useMemo(() => {
    const typeCounts: Record<string, number> = Object.fromEntries(carTypes.map(([key]) => [key, 0]));
    const companyCounts: Record<string, number> = Object.fromEntries(companies.map(([key]) => [key, 0]));
    const modelCounts: Record<string, number> = {};

    cars.forEach((car) => {
      const typeKey = getCarTypeKey(car.category);
      const companyKey = getCompanyKey(car.brand);
      const modelKey = normalize(car.name);
      if (typeKey in typeCounts) typeCounts[typeKey] += 1;
      if (companyKey in companyCounts) companyCounts[companyKey] += 1;
      modelCounts[modelKey] = (modelCounts[modelKey] || 0) + 1;
    });

    return { typeCounts, companyCounts, modelCounts };
  }, [cars, carTypes, companies]);

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
    setSelectedTypes([]);
    setSelectedCompanies([]);
    setSelectedModel("");
    setSortBy("recommended");
  };

  const filteredCars = useMemo(() => {
    const results = cars.filter((car) =>
      (!selectedTypes.length || selectedTypes.includes(getCarTypeKey(car.category))) &&
      (!selectedCompanies.length || selectedCompanies.includes(getCompanyKey(car.brand))) &&
      (!selectedModel || normalize(car.name) === selectedModel)
    );
    if (sortBy === "price-asc") {
      results.sort((a, b) => (a.dailyPriceAed || Number.MAX_VALUE) - (b.dailyPriceAed || Number.MAX_VALUE));
    }
    if (sortBy === "price-desc") results.sort((a, b) => b.dailyPriceAed - a.dailyPriceAed);
    return results;
  }, [cars, selectedCompanies, selectedModel, selectedTypes, sortBy]);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-1.jpg"
            alt="Car Rental"
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
            Car Rental Fleet
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
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start bg-white border border-zinc-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-zinc-900">Filter Vehicles</h2>
                {(selectedTypes.length + selectedCompanies.length + Number(Boolean(selectedModel))) > 0 && (
                  <span className="text-[11px] font-semibold text-[#9b762c]">
                    {selectedTypes.length + selectedCompanies.length + Number(Boolean(selectedModel))} active
                  </span>
                )}
              </div>

              <fieldset className="py-3 border-t border-zinc-100">
                <legend className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">Rental Car Type</legend>
                <div className="space-y-2">
                  {carTypes.map(([typeKey, typeLabel]) => (
                    <label key={typeKey} className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(typeKey)}
                        onChange={() => toggleFilter(typeKey, selectedTypes, setSelectedTypes)}
                        className="w-4 h-4 border-zinc-300 accent-[#b58e45] focus:ring-[#b58e45] cursor-pointer"
                      />
                      <span className="flex-1">{typeLabel}</span>
                      <span className="text-xs text-zinc-400">{counts.typeCounts[typeKey] || 0}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="py-3 border-t border-zinc-100">
                <legend className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">Car Company</legend>
                <div className="space-y-2">
                  {companies.map(([companyKey, companyLabel]) => (
                    <label key={companyKey} className="flex items-center gap-2.5 text-sm text-zinc-600 hover:text-zinc-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(companyKey)}
                        onChange={() => toggleFilter(companyKey, selectedCompanies, setSelectedCompanies)}
                        className="w-4 h-4 border-zinc-300 accent-[#b58e45] focus:ring-[#b58e45] cursor-pointer"
                      />
                      <span className="flex-1">{companyLabel}</span>
                      <span className="text-xs text-zinc-400">{counts.companyCounts[companyKey] || 0}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="py-3 border-t border-zinc-100">
                <label htmlFor="car-model-filter" className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5 block">
                  Model
                </label>
                <select
                  id="car-model-filter"
                  value={selectedModel}
                  onChange={(event) => setSelectedModel(event.target.value)}
                  className="w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 rounded-md focus:outline-none focus:border-[#b58e45] cursor-pointer"
                >
                  <option value="">All models</option>
                  {models.map(([modelKey, modelLabel]) => (
                    <option key={modelKey} value={modelKey}>
                      {modelLabel} ({counts.modelCounts[modelKey] || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!selectedTypes.length && !selectedCompanies.length && !selectedModel && sortBy === "recommended"}
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
                    {filteredCars.length} {filteredCars.length === 1 ? "Vehicle" : "Vehicles"} Found
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    {filteredCars.length === cars.length ? "Available for rent" : `Filtered from ${cars.length} available vehicles`}
                  </p>
                </div>
                <label className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-zinc-500 font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    aria-label="Sort rental vehicles"
                    className="bg-white border border-zinc-200 text-zinc-700 text-xs sm:text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#b58e45] cursor-pointer"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </label>
              </div>

           

              {filteredCars.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-lg p-10 text-center">
                  <p className="text-zinc-600 text-sm">
                    {cars.length === 0 ? "No rental vehicles are currently available." : "No vehicles match your selected filters."}
                  </p>
                  {cars.length > 0 && (
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
                <div className="space-y-4 mb-16">
                  {filteredCars.map((car) => {
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
                    const carTypeLabel = displayLabel(LEGACY_RENTAL_CAR_TYPE_MAP[normalize(car.category)] || car.category);

                    return (
                      <article
                        key={car.id}
                        className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <Link
                          href={detailUrl}
                          className="relative block w-full md:w-56 lg:w-64 h-48 md:h-auto md:min-h-[220px] rounded-md overflow-hidden shrink-0 bg-zinc-100"
                        >
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 256px"
                            className="object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-900/85 text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                            <FaCar className="text-[10px]" />
                            {carTypeLabel}
                          </span>
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider">
                                {displayLabel(car.brand)}
                              </span>
                              <span className="text-xs text-zinc-500">{car.year}</span>
                            </div>
                            <Link href={detailUrl} className="group">
                              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-[#9b762c] transition-colors leading-snug">
                                {car.name}
                              </h3>
                            </Link>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-xs text-zinc-600">
                              <span className="flex items-center gap-1.5"><FaUserFriends className="text-[#b58e45]" /> {car.seats} Passengers</span>
                              <span className="flex items-center gap-1.5"><FaSuitcase className="text-[#b58e45]" /> {car.freeMileagePerDay} KM/Day</span>
                              <span className="flex items-center gap-1.5"><FaKey className="text-[#b58e45]" /> {car.transmission}</span>
                              <span className="flex items-center gap-1.5"><FaGasPump className="text-[#b58e45]" /> {car.fuelType}</span>
                            </div>
                          </div>
                          {car.features.filter((feature) => feature !== "contact_for_price").length > 0 && (
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-600">
                              {car.features.filter((feature) => feature !== "contact_for_price").slice(0, 3).map((feature) => (
                                <span key={`${car.id}-${feature}`} className="flex items-start gap-1.5">
                                  <FaCheck className="text-[#b58e45] shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="w-full md:w-48 lg:w-52 flex flex-row md:flex-col justify-between md:items-end border-t md:border-t-0 md:border-l border-zinc-100 pt-3 md:pt-0 md:pl-5 shrink-0 text-left md:text-right gap-4">
                          <div>
                            <span className="text-xs text-zinc-500 font-medium block">Daily rate</span>
                            <div className="text-xl sm:text-2xl font-black text-zinc-900 mt-0.5 tracking-tight">
                              {isContactPrice ? (
                                <span className="text-base">Contact for price</span>
                              ) : (
                                <>
                                  <span className="text-sm font-bold text-zinc-600 mr-1">AED</span>
                                  {car.dailyPriceAed}
                                </>
                              )}
                            </div>
                            {!isContactPrice && car.weeklyPriceAed && (
                              <span className="text-[11px] text-zinc-400 font-medium block mt-0.5">Weekly AED {car.weeklyPriceAed}</span>
                            )}
                          </div>
                          <div className="w-1/2 md:w-full min-w-0 space-y-2">
                            <Link
                              href={detailUrl}
                              className="w-full py-2 px-3 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
                            >
                              View Details <FaArrowRight className="text-xs" />
                            </Link>
                            <a
                              href={waLink}
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
