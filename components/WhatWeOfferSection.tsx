"use client";

import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/lib/data/servicesData";

export default function WhatWeOfferSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 font-sans border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching reference "WHAT WE OFFER !" */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            WHAT WE OFFER !
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            Comprehensive Pilgrimage & Luxury Travel Services Across Saudi Arabia & UAE
          </p>
        </div>

        {/* 6-Box Staggered Bento Grid matching user's layout reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {servicesData.map((service, index) => {
            // Row 1: 1 col, 1 col, 2 cols (wide)
            // Row 2: 2 cols (wide), 1 col, 1 col
            const isWide = index === 2 || index === 3;

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={`group relative overflow-hidden bg-zinc-900 shadow-md transition-all duration-300 hover:shadow-xl ${
                  isWide
                    ? "lg:col-span-2 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
                    : "lg:col-span-1 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
                }`}
              >
                {/* Background Image with Zoom */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={isWide ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />

                {/* Service Name + View Details only */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center">
                  <h3 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase mb-2 group-hover:text-[#c5a059] transition-colors duration-200">
                    {service.shortTitle}
                  </h3>
                  <span className="text-[11px] font-bold tracking-widest text-[#c5a059] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                    View Details &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
