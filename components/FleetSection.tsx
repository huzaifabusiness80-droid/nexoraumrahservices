"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface FleetVehicleMeta {
  id: string;
  brand: "toyota" | "mercedes" | "gmc" | "hyundai";
  classType: "mini-bus" | "executive-van" | "passenger-van" | "suv" | "sedan" | "mpv";
  minGuests: number;
  maxGuests: number;
  image: string;
}

const fleetMeta: FleetVehicleMeta[] = [
  {
    id: "coaster",
    brand: "toyota",
    classType: "mini-bus",
    minGuests: 15,
    maxGuests: 30,
    image: "/images/fleet/toyota-coaster.jpg",
  },
  {
    id: "vclass",
    brand: "mercedes",
    classType: "executive-van",
    minGuests: 5,
    maxGuests: 7,
    image: "/images/fleet/mercedes-vclass.jpg",
  },
  {
    id: "hiace",
    brand: "toyota",
    classType: "passenger-van",
    minGuests: 8,
    maxGuests: 14,
    image: "/images/fleet/toyota-hiace.jpg",
  },
  {
    id: "yukon",
    brand: "gmc",
    classType: "suv",
    minGuests: 5,
    maxGuests: 6,
    image: "/images/fleet/gmc-yukon.jpg",
  },
  {
    id: "camry",
    brand: "toyota",
    classType: "sedan",
    minGuests: 1,
    maxGuests: 4,
    image: "/images/fleet/toyota-camry.jpg",
  },
  {
    id: "staria",
    brand: "hyundai",
    classType: "mpv",
    minGuests: 7,
    maxGuests: 11,
    image: "/images/fleet/hyundai-staria.jpg",
  },
];

export default function FleetSection() {
  const { t, isRtl, language } = useLanguage();
  const targetPhone = "923158494785";

  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCapacity, setSelectedCapacity] = useState("all");

  const hasActiveFilters =
    selectedClass !== "all" || selectedBrand !== "all" || selectedCapacity !== "all";

  const resetFilters = () => {
    setSelectedClass("all");
    setSelectedBrand("all");
    setSelectedCapacity("all");
  };

  const classOptions = [
    { value: "all", label: t.filterSelectClass },
    { value: "mini-bus", label: t.vehicles[0].category },
    { value: "executive-van", label: t.vehicles[1].category },
    { value: "passenger-van", label: t.vehicles[2].category },
    { value: "suv", label: t.vehicles[3].category },
    { value: "sedan", label: t.vehicles[4].category },
    { value: "mpv", label: t.vehicles[5].category },
  ];

  const brandOptions = [
    { value: "all", label: t.filterSelectBrand },
    { value: "toyota", label: "Toyota" },
    { value: "mercedes", label: "Mercedes-Benz" },
    { value: "gmc", label: "GMC" },
    { value: "hyundai", label: "Hyundai" },
  ];

  const capacityOptions = [
    { value: "all", label: t.filterSelectCapacity },
    { value: "1-4", label: t.filterGuests14 },
    { value: "5-7", label: t.filterGuests57 },
    { value: "8-14", label: t.filterGuests814 },
    { value: "15-30", label: t.filterGuests1530 },
  ];

  // Real-time filtering
  const filteredVehicles = fleetMeta
    .map((meta, index) => ({
      meta,
      car: t.vehicles[index],
    }))
    .filter(({ meta }) => {
      if (selectedClass !== "all" && meta.classType !== selectedClass) {
        return false;
      }
      if (selectedBrand !== "all" && meta.brand !== selectedBrand) {
        return false;
      }
      if (selectedCapacity !== "all") {
        if (selectedCapacity === "1-4" && !(meta.minGuests <= 4 && meta.maxGuests >= 1)) return false;
        if (selectedCapacity === "5-7" && !(meta.minGuests <= 7 && meta.maxGuests >= 5)) return false;
        if (selectedCapacity === "8-14" && !(meta.minGuests <= 14 && meta.maxGuests >= 8)) return false;
        if (selectedCapacity === "15-30" && !(meta.minGuests <= 30 && meta.maxGuests >= 15)) return false;
      }
      return true;
    });

  return (
    <section id="fleet" className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a059] uppercase mb-3">
            {t.fleetTag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black tracking-tight px-2">
            {t.fleetHeading}
          </h2>
        </div>

        {/* Filter Bar with Live Real-time Filtration */}
        <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-6 mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* 1. Car Class */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterCarClass}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer"
              >
                {classOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Car Brand */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterCarBrand}
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer"
              >
                {brandOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Passengers / Capacity */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterPassengers}
              </label>
              <select
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer"
              >
                {capacityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Indicators & Reset Button */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-zinc-600 font-medium">
                {language === "ar"
                  ? `النتائج المعروضة: ${filteredVehicles.length} مركبة`
                  : `Showing ${filteredVehicles.length} vehicle(s)`}
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#c5a059] hover:text-black uppercase tracking-wider underline cursor-pointer transition-colors"
              >
                {language === "ar" ? "إعادة ضبط الفلاتر ✕" : "Reset Filters ✕"}
              </button>
            </div>
          )}
        </div>

        {/* Empty state when no vehicles match */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-50 border border-zinc-200">
            <p className="text-base sm:text-lg font-medium text-zinc-700 mb-4">
              {language === "ar"
                ? "لا توجد مركبات تطابق اختياراتك الحالية."
                : "No vehicles found matching your selected criteria."}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              {language === "ar" ? "عرض جميع السيارات" : "View All Vehicles"}
            </button>
          </div>
        ) : (
          /* Car Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(({ meta, car }, index) => {
              const carWaLink = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
                `Salam Nexora, I want to book ${car.name} (03158494785).`
              )}`;

              return (
                <a
                  key={meta.id || index}
                  href={carWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-zinc-200 bg-white hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden text-start cursor-pointer"
                >
                  {/* Car Image — full width, proper background fill */}
                  <div className="relative h-52 sm:h-60 w-full bg-[#f0f0f0] overflow-hidden">
                    <Image
                      src={meta.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Car Name */}
                    <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-[#9f7d3b] transition-colors">
                      {car.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 leading-relaxed mb-5 flex-1">
                      {car.description}
                    </p>

                    {/* Specs Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <div className="flex items-center gap-4 sm:gap-5 text-xs text-zinc-600">
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-[#c5a059]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="font-medium">{car.passengers}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-[#c5a059]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <span className="font-medium">{car.luggage}</span>
                        </div>
                      </div>

                      {/* Book button */}
                      <span className="text-[11px] font-bold tracking-wider uppercase text-black group-hover:text-[#c5a059] transition-colors flex items-center gap-1.5 py-1">
                        {t.bookNow}
                        <svg
                          className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                            isRtl ? "rotate-180 group-hover:-translate-x-1" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Show All Cars Button */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <button
            type="button"
            onClick={resetFilters}
            className="w-full sm:w-auto text-center px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase border border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
          >
            {t.showAllCars}
          </button>
        </div>
      </div>
    </section>
  );
}
