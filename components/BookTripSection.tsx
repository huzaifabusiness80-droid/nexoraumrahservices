"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { FaWhatsapp } from "react-icons/fa";

export default function BookTripSection() {
  const { t } = useLanguage();
  const phoneNumber = "+44 7882 749006";
  const whatsappUrl = `https://wa.me/447882749006?text=Salam%20Nexora,%20I%20would%20like%20to%20request%20a%20ride.`;

  return (
    <section className="w-full bg-[#11151c] overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[500px] lg:min-h-[580px]">
        {/* Left Side: Hero / Chauffeur Image */}
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-auto min-h-[360px] overflow-hidden bg-zinc-900">
          <Image
            src="/images/hero/slide-1.jpg"
            alt={t.bookTripHeading}
            fill
            priority
            className="object-cover object-center hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Side: Dark Card Content */}
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16 xl:px-20 bg-[#11151c]">
          <div className="max-w-3xl">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold text-white tracking-tight leading-[1.25] mb-5">
              {t.bookTripHeading}
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 font-normal">
              {t.bookTripSubtitle}
            </p>

            {/* Buttons / CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Request A Ride Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md"
              >
                <FaWhatsapp className="text-xl shrink-0" />
                <span>{t.bookTripBtn}</span>
              </a>

              {/* WhatsApp contact number */}
              <a
                href="https://wa.me/447882749006"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#c5a059] bg-[#c5a059]/10 hover:bg-[#c5a059] text-white hover:text-black text-sm font-semibold tracking-wide transition-all duration-300"
                dir="ltr"
              >
                <FaWhatsapp className="text-sm shrink-0" />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
