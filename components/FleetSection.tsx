"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const carImages = [
  "/images/fleet/toyota-coaster.jpg",
  "/images/fleet/mercedes-vclass.jpg",
  "/images/fleet/toyota-hiace.jpg",
  "/images/fleet/gmc-yukon.jpg",
  "/images/fleet/toyota-camry.jpg",
  "/images/fleet/hyundai-staria.jpg",
];

export default function FleetSection() {
  const { t, isRtl } = useLanguage();
  const targetPhone = "923158494785";

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

        {/* Filter Bar */}
        <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-6 mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterCarClass}
              </label>
              <select className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer">
                <option>{t.filterSelectClass}</option>
                <option>{t.vehicles[0].category}</option>
                <option>{t.vehicles[1].category}</option>
                <option>{t.vehicles[2].category}</option>
                <option>{t.vehicles[3].category}</option>
                <option>{t.vehicles[4].category}</option>
                <option>{t.vehicles[5].category}</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterCarBrand}
              </label>
              <select className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer">
                <option>{t.filterSelectBrand}</option>
                <option>Toyota</option>
                <option>Mercedes-Benz</option>
                <option>GMC</option>
                <option>Hyundai</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.filterPassengers}
              </label>
              <select className="w-full px-3.5 py-2.5 sm:py-3 text-sm bg-white border border-zinc-200 text-black focus:outline-none focus:border-black font-medium appearance-none cursor-pointer">
                <option>{t.filterSelectCapacity}</option>
                <option>{t.filterGuests14}</option>
                <option>{t.filterGuests57}</option>
                <option>{t.filterGuests814}</option>
                <option>{t.filterGuests1530}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.vehicles.map((car, index) => {
            const imageSrc = carImages[index] || carImages[0];
            const carWaLink = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
              `Salam Nexora, I want to book ${car.name} (03158494785).`
            )}`;

            return (
              <a
                key={index}
                href={carWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-zinc-200 bg-white hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden text-start cursor-pointer"
              >
                {/* Car Image — full width, proper background fill */}
                <div className="relative h-52 sm:h-60 w-full bg-[#f0f0f0] overflow-hidden">
                  <Image
                    src={imageSrc}
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

        {/* Show All Cars Button */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <a
            href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
              "Salam Nexora Umrah Services, I would like to see your full fleet (03158494785)."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase border border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200"
          >
            {t.showAllCars}
          </a>
        </div>
      </div>
    </section>
  );
}
