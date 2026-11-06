"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroCarousel() {
  const { t, isRtl } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides = t.heroSlides.length ? t.heroSlides : [];
  const slidesCount = slides.length;

  useEffect(() => {
    if (!slidesCount) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [slidesCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  const active = slides[currentSlide] || slides[0];

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[620px] lg:h-[720px] xl:h-[780px] flex items-center overflow-hidden bg-black py-16 sm:py-20 lg:py-0">
      {/* 4-Image Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={`${slide.titleLine1}-${slide.titleLine2}-${index}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[1600ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-label={`${slide.titleLine1} ${slide.titleLine2}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
            </div>
          );
        })}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 flex flex-col justify-center">
        <div className="max-w-[1160px] animate-hero-text">
          <div className="inline-flex items-center bg-[#c5a059]/90 text-white px-3 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase">
              {active.tag}
            </span>
          </div>

          <h1 className="max-w-[1120px] text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-semibold text-white tracking-[-0.045em] leading-[0.98] sm:leading-[1.02] mb-4 sm:mb-5 drop-shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
            <span className="block">{active.titleLine1}</span>
            <span className="block text-zinc-100/95 mt-1 sm:mt-2">{active.titleLine2}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-100 max-w-[700px] leading-relaxed mb-6 sm:mb-8 font-normal drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
            {active.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
            <Link
              href={active.href}
              className="group px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-[15px] font-semibold text-white bg-[#cfa258] hover:bg-[#be9146] shadow-[0_18px_40px_rgba(207,162,88,0.32)] transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>{active.buttonText}</span>
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="https://wa.me/447882749006?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20book%20a%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-[15px] font-semibold text-white bg-white/8 hover:bg-white/12 border border-white/40 hover:border-white/70 backdrop-blur-sm transition-all duration-200 inline-flex items-center justify-center cursor-pointer text-center"
            >
              Book Your Ride
            </a>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-4 sm:bottom-8 z-30 flex items-center gap-2.5 sm:gap-4 ${
          isRtl ? "left-4 sm:left-12" : "right-4 sm:right-12"
        }`}
      >
        {/* Slide Dots / Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 mx-1 sm:mx-2">
          {slides.map((slide, idx) => (
            <button
              key={`${slide.titleLine1}-${idx}`}
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
          className="w-7 h-7 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center transition-colors bg-black/40 cursor-pointer"
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
          className="w-7 h-7 sm:w-9 sm:h-9 border border-white/30 text-white hover:border-[#c5a059] hover:text-[#c5a059] flex items-center justify-center transition-colors bg-black/40 cursor-pointer"
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
