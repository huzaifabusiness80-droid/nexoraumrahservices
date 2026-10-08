"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function TransportBookingBanner() {
  const { t } = useLanguage();
  const phoneNumber = "03158494785";
  const whatsappUrl = `https://wa.me/923158494785?text=Salam%20Nexora,%20I%20want%20to%20book%20safe%20transportation.`;

  return (
    <section className="w-full bg-[#11151c] py-16 sm:py-20 lg:py-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight leading-[1.28] mb-8">
              {t.transportBannerHeading}
            </h2>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              {/* BOOK NOW Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-3.5 border border-[#c5a059]/80 hover:border-[#c5a059] bg-[#1a1e27] hover:bg-[#c5a059] text-white hover:text-black text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm"
              >
                {t.transportBannerBtn}
              </a>

              {/* Phone number */}
              <a
                href={`tel:${phoneNumber}`}
                className="text-base sm:text-lg font-semibold text-[#c5a059] hover:text-[#dfb96f] transition-colors tracking-wide flex items-center gap-2 justify-center sm:justify-start"
                dir="ltr"
              >
                {phoneNumber}
              </a>
            </div>
          </div>

          {/* Right Side: Large Vehicle Image (No box background, no text) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full h-72 sm:h-96 lg:h-[400px]">
              <Image
                src="/images/fleet/toyota-hiace.jpg"
                alt="Nexora Transport Passenger Van"
                fill
                priority
                className="object-contain hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
