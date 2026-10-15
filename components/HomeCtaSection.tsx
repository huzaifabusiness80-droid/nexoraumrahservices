"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function HomeCtaSection() {
  const whatsappNumber = "+92 315 8494785";
  const whatsappLink = "https://wa.me/923158494785?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20inquire%20about%20your%20services.";

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 overflow-hidden font-sans border-y border-zinc-800">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/slide-1.jpg"
          alt="Umrah and Travel Services"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Left: Simple Clean Heading & Description with proper spacing */}
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase mb-5 sm:mb-6">
              Book Your Umrah Transport &amp; Tour Services
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              Get in touch with us today for private airport transfers, hotel bookings, and holy Ziyarat tours across Makkah, Madinah &amp; UAE.
            </p>
          </div>

          {/* Right: Clean Button with Contact Us Today */}
          <div className="shrink-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c5a059] hover:bg-[#b08c47] text-white text-sm sm:text-base font-bold uppercase tracking-wider transition-colors rounded-none shadow-none cursor-pointer"
            >
              <FaWhatsapp className="text-xl" />
              <span>Contact Us Today</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
