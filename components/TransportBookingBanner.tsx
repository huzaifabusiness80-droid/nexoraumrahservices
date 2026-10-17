"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function TransportBookingBanner() {
  const { t } = useLanguage();
  const phoneNumber = "+44 7882 749006";
  const phoneHref = "+447882749006";
  const whatsappUrl = `https://wa.me/447882749006?text=Salam%20Nexora,%20I%20want%20to%20book%20safe%20transportation.`;

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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* BOOK NOW Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md"
              >
                <FaWhatsapp className="text-xl shrink-0" />
                <span>{t.transportBannerBtn}</span>
              </a>

              {/* Phone number */}
              <a
                href={`tel:${phoneHref}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#c5a059] bg-[#c5a059]/10 hover:bg-[#c5a059] text-white hover:text-black text-sm font-semibold tracking-wide transition-all duration-300"
                dir="ltr"
              >
                <FaPhoneAlt className="text-xs shrink-0" />
                <span>{phoneNumber}</span>
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
