"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaSnapchatGhost, FaEnvelope } from "react-icons/fa";

export default function Footer() {
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
      <footer className="w-full bg-[#0d1017] text-white pt-16 sm:pt-20 pb-12 font-sans border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Branch Logos Strip */}
          <div className="pb-12 mb-12 ">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {[
                { src: "/images/logos/Nexora Umrah Transport Emblem.png", alt: "Nexora Umrah Transport", href: "/services/umrah-transport" },
                { src: "/images/logos/Nexora Umrah Hotels Logo.png", alt: "Nexora Umrah Hotels", href: "/services/umrah-hotels" },
                { src: "/images/logos/Nexora Umrah Ziarat Logo.png", alt: "Nexora Umrah Ziyarat", href: "/services/umrah-ziyarat" },
                { src: "/images/logos/Nexora Luxury Travel Emblem.png", alt: "Nexora Travel & Tourism", href: "/services/uae-city-tours" },
                { src: "/images/logos/Nexora Premium Car Rental Emblem.png", alt: "Nexora Rental Cars", href: "/services/uae-car-rental" },
              ].map((branch) => (
                <Link key={branch.alt} href={branch.href} className="group flex flex-col items-center gap-2.5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-33 lg:h-33  overflow-hidden relative group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={branch.src}
                      alt={branch.alt}
                      fill
                      className="object-contain p-1"
                      sizes="144px"
                    />
                  </div>
                
                </Link>
              ))}
            </div>
          </div>
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
            
            {/* Col 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/images/nexora-journeys-logo-cropped.png"
                  alt="Nexora Journeys"
                  width={220}
                  height={80}
                  className="h-14 sm:h-16 w-auto object-contain brightness-105"
                />
              </Link>

              <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                Nexora Journeys is a licensed Umrah ground operator and executive travel concierge providing private chauffeur transfers, verified seasonal hotel tariffs, and guided holy excursions across Saudi Arabia and the UAE.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://wa.me/923158494785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-white/[0.06] hover:bg-[#25D366] hover:text-white text-zinc-400 flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-white/[0.06] hover:bg-[#1877F2] hover:text-white text-zinc-400 flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-white/[0.06] hover:bg-[#FFFC00] hover:text-black text-zinc-400 flex items-center justify-center transition-all duration-200"
                  aria-label="Snapchat"
                >
                  <FaSnapchatGhost className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Umrah Pilgrimage Services (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                Umrah Services
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li>
                  <Link href="/services/umrah-transport" className="hover:text-[#c5a059] transition-colors">
                    Umrah Transport Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-hotels" className="hover:text-[#c5a059] transition-colors">
                    Makkah &amp; Madinah Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-ziyarat" className="hover:text-[#c5a059] transition-colors">
                    Umrah Ziyarat Tours
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#c5a059] transition-colors">
                    About Nexora Journeys
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#c5a059] transition-colors">
                    24/7 Dispatch Desk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: UAE Tourism Services (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                UAE Tourism
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li>
                  <Link href="/services/uae-city-tours" className="hover:text-[#c5a059] transition-colors">
                    UAE City Tours
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-desert-safari" className="hover:text-[#c5a059] transition-colors">
                    Desert Safari
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-car-rental" className="hover:text-[#c5a059] transition-colors">
                    UAE Car Rental
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#c5a059] transition-colors">
                    Terms &amp; Policies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: 24/7 Operations & Newsletter (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                24/7 Ground Desks
              </h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <p>
                  <strong className="text-zinc-200">Saudi Arabia:</strong>{" "}
                  <a href="tel:+966536376568" className="hover:text-[#c5a059] transition-colors">
                    +966 53 637 6568
                  </a>
                </p>
                <p>
                  <strong className="text-zinc-200">International:</strong>{" "}
                  <a href="tel:+923158494785" className="hover:text-[#c5a059] transition-colors">
                    +92 315 8494785
                  </a>
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="space-y-2.5 pt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for tariff updates..."
                  required
                  className="w-full px-3.5 py-2.5 bg-[#161b24] border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a059] rounded transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-300 rounded cursor-pointer"
                >
                  {subscribed ? "Subscribed Successfully!" : "Subscribe For Tariff Updates"}
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>
              &copy; 2025 Nexora Journeys. All Rights Reserved. Serving the Guests of Ar-Rahman.
            </p>
            <div className="flex items-center gap-4 text-zinc-400 text-xs">
              <Link href="/about" className="hover:text-[#c5a059] transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[#c5a059] transition-colors">
                Contact
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#c5a059] transition-colors">
                Terms &amp; Policies
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-[#c5a059] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Buttons */}
      <a
        href="tel:03158494785"
        className="fixed bottom-6 left-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#00A859] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Call Direct Desk"
      >
        <FaPhoneAlt className="text-lg text-white" />
      </a>

      <a
        href="https://wa.me/923158494785?text=Salam%20Nexora,%20I%20would%20like%20to%20inquire%20about%20booking%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl sm:text-3xl text-white" />
      </a>
    </>
  );
}
