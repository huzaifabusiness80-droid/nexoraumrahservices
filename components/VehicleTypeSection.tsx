"use client";

import {
  SedanIcon,
  SuvIcon,
  VanIcon,
  AccessibleVanIcon,
  MiniBusIcon,
} from "./icons/VehicleIcons";
import { useLanguage } from "@/context/LanguageContext";

const vehicleIcons: Record<string, React.ReactNode> = {
  sedan: <SedanIcon className="w-16 h-8" />,
  suv: <SuvIcon className="w-16 h-8" />,
  van: <VanIcon className="w-16 h-8" />,
  "accessible-van": <AccessibleVanIcon className="w-16 h-8" />,
  "mini-bus": <MiniBusIcon className="w-16 h-8" />,
};

export default function VehicleTypeSection() {
  const { t } = useLanguage();
  const targetPhone = "447882749006";

  return (
    <section className="w-full bg-[#f4f5f7] py-14 sm:py-20 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            {t.vehicleTypeTag}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            {t.vehicleTypeHeading}
          </p>
        </div>

        {/* Vehicle Type Cards Grid - Fully responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {t.vehicleTypes.map((type) => (
            <a
              key={type.id}
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                `Salam Nexora, I would like to inquire about ${type.name} transport.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-6 sm:p-8 bg-white border border-transparent hover:border-black transition-all duration-300 cursor-pointer"
            >
              {/* Image/Icon Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 !rounded-full bg-[#ECC298] flex items-center justify-center mb-5 sm:mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                {vehicleIcons[type.id] || <SedanIcon className="w-16 h-8" />}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 tracking-tight min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center mb-2 sm:mb-3 group-hover:text-[#c5a059] transition-colors">
                {type.name}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 text-xs sm:text-[13px] leading-relaxed max-w-[200px]">
                {type.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
