"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <footer className="w-full bg-[#11151c] text-white pt-16 sm:pt-20 pb-12 font-sans border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 4 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/70">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-6">
              {/* Nexora Journeys Logo */}
              <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-xl shadow-lg transition-transform hover:scale-105">
                <Image
                  src="/images/nexora-journeys-logo-cropped.png"
                  alt="Nexora Journeys"
                  width={220}
                  height={90}
                  className="h-16 w-auto object-contain"
                />
              </Link>

              {/* Company Description */}
              <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
                {t.footerDesc}
              </p>

              {/* Social Icons (Facebook, WhatsApp, Snapchat) using React Icons */}
              <div className="flex items-center gap-4 text-zinc-400">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#c5a059] hover:text-black flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/923158494785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>

                {/* Snapchat */}
                <a
                  href="https://snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#FFFC00] hover:text-black flex items-center justify-center transition-all duration-200"
                  aria-label="Snapchat"
                >
                  <FaSnapchatGhost className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Umrah Pilgrimage Services */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                Umrah Services
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
                <li>
                  <Link href="/services/umrah-transport" className="hover:text-[#c5a059] transition-colors">
                    Umrah Transport
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-hotels" className="hover:text-[#c5a059] transition-colors">
                    Umrah Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-ziyarat" className="hover:text-[#c5a059] transition-colors">
                    Umrah Ziyarat
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-[#c5a059] transition-colors">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: UAE Tourism & Luxury Services */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                UAE Tourism Services
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
                <li>
                  <Link href="/services/uae-city-tours" className="hover:text-[#c5a059] transition-colors">
                    UAE City Tours
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-desert-safari" className="hover:text-[#c5a059] transition-colors">
                    UAE Desert Safari
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-car-rental" className="hover:text-[#c5a059] transition-colors">
                    UAE Car Rental
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#c5a059] transition-colors">
                    Contact Chauffeur Desk
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us & Newsletter */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                {t.footerContactUs}
              </h4>
              <p className="text-xs text-zinc-400">
                {t.footerNewsletterSub}
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footerEmailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-[#181c24] border border-zinc-700/70 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a059] rounded transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-3 border border-[#c5a059] text-white hover:bg-[#c5a059] hover:text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded shadow-sm cursor-pointer"
                >
                  {subscribed ? t.footerSubscribedBtn : t.footerSubscribeBtn}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 text-center text-xs text-zinc-500">
            <p>
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons using React Icons */}
      {/* 1. Floating Phone Call Button (Bottom Left) */}
      <a
        href="tel:03158494785"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00A859] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Call Us"
      >
        <FaPhoneAlt className="text-xl sm:text-2xl text-white" />
      </a>

      {/* 2. Floating WhatsApp Button (Bottom Right) */}
      <a
        href="https://wa.me/923158494785?text=Salam%20Nexora,%20I%20would%20like%20to%20inquire%20about%20transportation%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl sm:text-4xl text-white" />
      </a>
    </>
  );
}
