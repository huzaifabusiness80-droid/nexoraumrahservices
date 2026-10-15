"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const slideImages = [
  "/images/hero/slide-1.jpg",
  "/images/hero/slide-2.jpg",
  "/images/hero/slide-3.jpg",
  "/images/hero/slide-4.jpg",
];

export default function HeroCarousel() {
  const { t, isRtl } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slidesCount = slideImages.length;

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [slidesCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  const active = t.heroSlides[currentSlide] || t.heroSlides[0];

  return (
    <section className="relative w-full h-[420px] sm:h-[460px] lg:h-[780px] overflow-hidden bg-black">
      {/* 4-Image Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slideImages.map((imgSrc, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <Image
                src={imgSrc}
                alt={`${active.titleLine1} ${active.titleLine2}`}
                fill
                priority={index === 0}
                className={`object-cover object-center ${isActive ? "ken-burns-active" : ""
                  }`}
                sizes="100vw"
              />

              {/* Dark gradient overlay matching reading direction for crisp white typography */}
              <div
                className={`absolute inset-0 w-full md:w-[70%] ${isRtl
                    ? "bg-gradient-to-l from-black/95 via-black/75 to-transparent end-0"
                    : "bg-gradient-to-r from-black/95 via-black/75 to-transparent start-0"
                  }`}
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          );
        })}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-8 flex flex-col justify-center">
        <div className="max-w-full animate-hero-text">
          {/* Top Tag Kicker Badge with golden background and white text */}
          <div className="inline-block bg-[#c5a059] text-white px-4 py-1.5 mb-5 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase">
              {active.tag}
            </span>
          </div>

          {/* Main Heading — semibold weight, wide max-width, generous line-height for vertical gaps */}
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-semibold text-white tracking-tight leading-[1.35] sm:leading-[1.35] lg:leading-[1.3] mb-8 sm:mb-10">
            <span className="block">{active.titleLine1}</span>
            <span className="block">{active.titleLine2}</span>
          </h1>

          {/* 2 Hero Buttons with generous spacing */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6">
            <Link
              href="#fleet"
              className="inline-block px-7 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] uppercase bg-white text-black hover:bg-zinc-200 transition-all text-center"
            >
              Explore Services
            </Link>

            <a
              href="https://wa.me/923158494785?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20book%20a%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[#c5a059] text-white hover:bg-[#b08d46] transition-all text-center"
            >
              Book Your Journey
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Indicators */}
      <div className={`absolute bottom-6 sm:bottom-8 z-30 flex items-center gap-3 sm:gap-4 ${isRtl ? "left-4 sm:left-12" : "right-4 sm:right-12"}`}>
        {/* Slide Dots / Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 mx-1 sm:mx-2">
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all ${idx === currentSlide
                  ? "w-6 sm:w-8 bg-[#d4af37]"
                  : "w-2.5 sm:w-3 bg-white/40 hover:bg-white"
                }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={isRtl ? nextSlide : prevSlide}
          aria-label="Previous"
          className="w-8 h-8 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors bg-black/40"
        >
          <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={isRtl ? prevSlide : nextSlide}
          aria-label="Next"
          className="w-8 h-8 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center transition-colors bg-black/40"
        >
          <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
