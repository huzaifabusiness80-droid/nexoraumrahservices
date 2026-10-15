"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 animate-header-enter">
      {/* Full Width Main Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-20 sm:h-24 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center group py-1 shrink-0">
          <Image
            src="/images/nexora-journeys-logo-cropped.png"
            alt="Nexora Journeys"
            width={260}
            height={100}
            className="h-16 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center / Right: Nav Items */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-2.5 xl:gap-4 2xl:gap-9">
          <Link
            href="/"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-[#c5a059] uppercase transition-colors whitespace-nowrap hover:text-[#b08c47]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            About Us
          </Link>
          <Link
            href="/services/umrah-transport"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            Umrah Transport
          </Link>
          <Link
            href="/services/umrah-hotels"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            Umrah Hotels
          </Link>
          <Link
            href="/services/umrah-ziyarat"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            Umrah Ziyarat
          </Link>
          <Link
            href="/services/uae-city-tours"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            UAE City Tours
          </Link>
          <Link
            href="/services/uae-desert-safari"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            UAE Desert Safari
          </Link>
          <Link
            href="/services/uae-car-rental"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            UAE Car Rental
          </Link>
          <Link
            href="/contact"
            className="text-[11px] xl:text-[12px] font-bold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>

        {/* Right Action: Request a Ride button */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="https://wa.me/923158494785?text=Salam%20Nexora%20Umrah%20Services,%20I%20would%20like%20to%20request%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase bg-black text-white border border-black hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            {t.requestRide}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-black border border-zinc-200"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-black p-6 space-y-4 animate-header-enter">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-[#c5a059] py-2 border-b border-zinc-100 uppercase"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              About Us
            </Link>
            <Link
              href="/services/umrah-transport"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              Umrah Transport
            </Link>
            <Link
              href="/services/umrah-hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              Umrah Hotels
            </Link>
            <Link
              href="/services/umrah-ziyarat"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              Umrah Ziyarat
            </Link>
            <Link
              href="/services/uae-city-tours"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              UAE City Tours
            </Link>
            <Link
              href="/services/uae-desert-safari"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              UAE Desert Safari
            </Link>
            <Link
              href="/services/uae-car-rental"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              UAE Car Rental
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              Contact
            </Link>
          </nav>

          <a
            href="https://wa.me/923158494785?text=Salam%20Nexora%20Umrah%20Services,%20I%20would%20like%20to%20request%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 text-sm font-bold tracking-widest uppercase border border-[#c5a059] text-white bg-black hover:bg-zinc-800 transition-all"
          >
            {t.requestRide}
          </a>
        </div>
      )}
    </header>
  );
}
