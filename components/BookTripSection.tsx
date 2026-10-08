"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function BookTripSection() {
  const { t } = useLanguage();
  const phoneNumber = "03158494785";
  const whatsappUrl = `https://wa.me/923158494785?text=Salam%20Nexora,%20I%20would%20like%20to%20request%20a%20ride.`;

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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              {/* Request A Ride Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-3.5 border border-[#c5a059]/70 hover:border-[#c5a059] bg-[#1a1e27] hover:bg-[#c5a059] text-white hover:text-black text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm"
              >
                {t.bookTripBtn}
              </a>

              {/* Phone Number */}
              <a
                href={`tel:${phoneNumber}`}
                className="text-base sm:text-lg font-semibold text-[#c5a059] hover:text-[#dfb96f] transition-colors tracking-wide flex items-center gap-2 justify-center sm:justify-start"
                dir="ltr"
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
