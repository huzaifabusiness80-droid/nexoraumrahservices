"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full animate-header-enter">
      {/* 1. Golden Top Bar with White Text ("tab bar golden karo cha or text white karo") */}
      <div className="w-full bg-[#c5a059] text-white text-sm border-b border-[#b38e46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Left: Location */}
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-white shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="tracking-wide text-white font-medium text-xs sm:text-sm">
              {t.topBarLocation}
            </span>
          </div>

          {/* Right: Email & Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:info@nexoraumrah.com"
              className="text-white hover:text-white/80 transition-colors hidden sm:inline-block font-medium"
            >
              info@nexoraumrah.com
            </a>

            <span className="text-white/60 hidden sm:inline-block">|</span>

            {/* Social Icons (Facebook, Snapchat) */}
            <div className="flex items-center gap-3 text-white">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-white/80 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Snapchat */}
              <a
                href="https://snapchat.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Snapchat"
                className="hover:text-white/80 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.065.003c-3.784 0-6.612 2.687-6.612 6.643 0 1.25.32 2.766.45 3.32.14.613-.24 1.15-.75 1.45-.63.37-1.44.82-1.95 1.57-.49.71-.32 1.52.28 2.01.52.42 1.4.67 2.05.81.42.09.73.4.68.83-.07.6-.46 2.07-1.12 3.03-.5.73-1.07 1.17-1.57 1.22-.38.04-.6.31-.54.67.09.52.79 1.12 2.13 1.12 1.05 0 2.1-.38 3.19-.38.86 0 1.63.29 2.45.69.87.42 1.76.84 2.8.84 1.05 0 1.94-.42 2.81-.84.82-.4 1.59-.69 2.45-.69 1.09 0 2.14.38 3.19.38 1.34 0 2.04-.6 2.13-1.12.06-.36-.16-.63-.54-.67-.5-.05-1.07-.49-1.57-1.22-.66-.96-1.05-2.43-1.12-3.03-.05-.43.26-.74.68-.83.65-.14 1.53-.39 2.05-.81.6-.49.77-1.3.28-2.01-.51-.75-1.32-1.2-1.95-1.57-.51-.3-.89-.83-.75-1.45.13-.55.45-2.07.45-3.32 0-3.956-2.828-6.643-6.612-6.643z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (White Theme, matching reference layout) */}
      <div className="w-full bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo: Just logo name without icon box */}
          <Link href="/" className="flex flex-col group py-1">
            <span className="text-2xl font-bold tracking-[0.25em] text-black uppercase leading-none">
              NEXORA
            </span>
            <span className="text-[10px] tracking-[0.34em] text-[#c5a059] uppercase font-medium">
              UMRAH SERVICES
            </span>
          </Link>

          {/* Nav Items (Exactly matching reference structure) */}
          <nav className="hidden lg:flex items-center gap-9">
            <Link
              href="/"
              className="text-sm font-semibold tracking-wider text-[#c5a059] uppercase transition-colors"
            >
              {t.navHome}
            </Link>
            <Link
              href="#fleet"
              className="text-sm font-semibold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors"
            >
              {t.navFleet}
            </Link>
            <Link
              href="#about"
              className="text-sm font-semibold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors"
            >
              {t.navAbout}
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold tracking-wider text-zinc-800 hover:text-[#c5a059] uppercase transition-colors"
            >
              {t.navContact}
            </Link>

            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-bold text-zinc-800 hover:text-[#c5a059] transition-colors cursor-pointer px-2 py-1"
              title={language === "en" ? "التبديل إلى العربية" : "Switch to English"}
            >
              <span className="text-base">{t.langFlag}</span>
              <span className="font-semibold">{t.langSwitchLabel}</span>
            </button>

            {/* Search Icon */}
            <button
              aria-label="Search"
              className="text-zinc-800 hover:text-[#c5a059] transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </nav>

          {/* Right Action: Black button with white text without hover */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/923158494785?text=Salam%20Nexora%20Umrah%20Services,%20I%20would%20like%20to%20request%20a%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[14px] font-semibold tracking-[0.16em] uppercase bg-black text-white border border-black"
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
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-black p-6 space-y-4 animate-header-enter">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-[#c5a059] py-2 border-b border-zinc-100 uppercase"
            >
              {t.navHome}
            </Link>
            <Link
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              {t.navFleet}
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              {t.navAbout}
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-wider text-zinc-800 py-2 border-b border-zinc-100 uppercase"
            >
              {t.navContact}
            </Link>
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-sm font-bold text-zinc-800 text-start cursor-pointer border-b border-zinc-100"
            >
              <span className="text-base">{t.langFlag}</span>
              <span>{t.langSwitchLabel}</span>
            </button>
          </nav>

          <a
            href="https://wa.me/923158494785?text=Salam%20Nexora%20Umrah%20Services,%20I%20would%20like%20to%20request%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 text-sm font-bold tracking-widest uppercase border border-[#c5a059] text-black bg-black text-white hover:bg-zinc-800 transition-all"
          >
            {t.requestRide}
          </a>
        </div>
      )}
    </header>
  );
}
