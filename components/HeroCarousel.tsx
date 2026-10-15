"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
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
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[620px] lg:h-[720px] xl:h-[780px] flex items-center overflow-hidden bg-black py-16 sm:py-20 lg:py-0">
      {/* 4-Image Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slideImages.map((imgSrc, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${active.titleLine1} ${active.titleLine2}`}
                fill
                priority={index === 0}
                className={`object-cover object-center ${isActive ? "ken-burns-active" : ""}`}
                sizes="100vw"
              />

              {/* Enhanced Dark Gradient for Crisp White Typography on all screens */}
              <div
                className={`absolute inset-0 w-full lg:w-[75%] ${
                  isRtl
                    ? "bg-gradient-to-l from-black/95 via-black/85 to-black/30 end-0"
                    : "bg-gradient-to-r from-black/95 via-black/85 to-black/30 start-0"
                }`}
              />
              <div className="absolute inset-0 bg-black/30 sm:bg-black/15" />
            </div>
          );
        })}
      </div>

      {/* Hero Content — Fully Responsive Padding & Typography */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 flex flex-col justify-center">
        <div className="max-w-3xl animate-hero-text">
          {/* Top Tag Kicker Badge */}
          <div className="inline-block bg-[#c5a059] text-white px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-6 rounded-xs shadow-sm">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase">
              {active.tag}
            </span>
          </div>

          {/* Main Heading — responsive font clamp */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-white tracking-tight leading-[1.25] sm:leading-[1.3] mb-4 sm:mb-6">
            <span className="block">{active.titleLine1}</span>
            <span className="block text-zinc-100 mt-1">{active.titleLine2}</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-xl text-zinc-300 max-w-xl leading-relaxed mb-6 sm:mb-8 font-normal">
            Private licensed airport transfers, verified seasonal hotel tariffs, and holy sanctuary tours across Makkah, Madinah, and the UAE.
          </p>

          {/* 2 Hero Buttons with mobile stack / tablet row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
            <Link
              href="#services"
              className="group px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-white bg-[#cfa258] hover:bg-[#be9146] rounded-md shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Explore Services</span>
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="https://wa.me/923158494785?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20book%20a%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-white bg-black/35 hover:bg-black/55 border border-white/40 hover:border-white/80 rounded-md backdrop-blur-xs transition-all duration-200 inline-flex items-center justify-center cursor-pointer text-center"
            >
              Book Your Ride
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Indicators */}
      <div
        className={`absolute bottom-4 sm:bottom-8 z-30 flex items-center gap-2.5 sm:gap-4 ${
          isRtl ? "left-4 sm:left-12" : "right-4 sm:right-12"
        }`}
      >
        {/* Slide Dots / Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 mx-1 sm:mx-2">
          {slideImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                idx === currentSlide
                  ? "w-6 sm:w-8 bg-[#c5a059]"
                  : "w-2 sm:w-2.5 bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={isRtl ? nextSlide : prevSlide}
          aria-label="Previous Slide"
          className="w-7 h-7 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center transition-colors bg-black/40 rounded cursor-pointer"
        >
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={isRtl ? prevSlide : nextSlide}
          aria-label="Next Slide"
          className="w-7 h-7 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center transition-colors bg-black/40 rounded cursor-pointer"
        >
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
