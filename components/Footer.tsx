"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaInstagram, FaClock, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      {/* 1. Official Brand Divisions Strip (Clean Luxury White Bar) */}
      <section className="w-full bg-white border-t border-b border-zinc-200 py-10 sm:py-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Subtle Section Title */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#c5a059]" />
            <span className="text-[11px] sm:text-xs font-bold text-zinc-500 tracking-[0.25em] uppercase text-center">
              Our Official Divisions &amp; Group Network
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#c5a059]" />
          </div>

          {/* 5 Seamless Brand Logos — Natural white background, crystal clear */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
            {[
              {
                src: "/images/logos/Nexora Umrah Transport Emblem.png",
                alt: "Nexora Umrah Transport",
                href: "/services/umrah-transport",
              },
              {
                src: "/images/logos/Nexora Umrah Hotels Logo.png",
                alt: "Nexora Umrah Hotels",
                href: "/services/umrah-hotels",
              },
              {
                src: "/images/logos/Nexora Umrah Ziarat Logo.png",
                alt: "Nexora Umrah Ziyarat",
                href: "/services/umrah-ziyarat",
              },
              {
                src: "/images/logos/Nexora Luxury Travel Emblem.png",
                alt: "Nexora Travels & Tourism",
                href: "/services/uae-city-tours",
              },
              {
                src: "/images/logos/Nexora Premium Car Rental Emblem.png",
                alt: "Nexora Car Rental",
                href: "/services/uae-car-rental",
              },
            ].map((branch) => (
              <Link
                key={branch.alt}
                href={branch.href}
                className="group w-full flex items-center justify-center p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all duration-300"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 relative group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={branch.src}
                    alt={branch.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                  />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Main Executive Dark Footer */}
      <footer className="w-full bg-[#0d1017] text-white pt-16 sm:pt-20 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800">
            
            {/* Col 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/images/nexora-journeys-logo-cropped.png"
                  alt="Nexora Journeys"
                  width={240}
                  height={85}
                  className="h-16 sm:h-20 w-auto object-contain brightness-105"
                />
              </Link>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-sm">
                Nexora Journeys is a licensed Umrah ground operator and executive travel concierge providing private chauffeur transfers, verified seasonal hotel tariffs, and guided holy excursions across Saudi Arabia and the UAE.
              </p>

              {/* Trust Badge */}
              <div className="flex items-center gap-2.5 text-xs text-[#c5a059] font-semibold tracking-wider uppercase">
                <FaShieldAlt className="text-sm shrink-0" />
                <span>Licensed Pilgrimage Ground Operator</span>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/447882749006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.08] hover:bg-[#25D366] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/Nexoraumrahservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.08] hover:bg-[#1877F2] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/nexoraumrahservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.08] hover:bg-[#E4405F] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.tiktok.com/@nexoraumrahservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.08] hover:bg-black hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Col 2: Umrah Pilgrimage Services (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase border-l-2 border-[#c5a059] pl-3">
                Umrah Services
              </h4>
              <ul className="space-y-3.5 text-sm sm:text-[15px] text-zinc-300 font-medium">
                <li>
                  <Link href="/services/umrah-transport" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Umrah Transport Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-hotels" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Makkah &amp; Madinah Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/services/umrah-ziyarat" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Umrah Ziyarat Tours
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    About Nexora Journeys
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    24/7 Dispatch Desk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Travels & Tourism Services (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase border-l-2 border-[#c5a059] pl-3">
                Travels &amp; Tourism
              </h4>
              <ul className="space-y-3.5 text-sm sm:text-[15px] text-zinc-300 font-medium">
                <li>
                  <Link href="/services/uae-city-tours" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Tours &amp; Tourism
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-desert-safari" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Desert Safari
                  </Link>
                </li>
                <li>
                  <Link href="/services/uae-car-rental" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Car Rental
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#c5a059] hover:translate-x-1 inline-block transition-all">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: 24/7 Operations & Direct Support Desk (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase border-l-2 border-[#c5a059] pl-3">
                24/7 Ground Desk
              </h4>

              <div className="space-y-3 text-sm sm:text-[15px]">
                <div className="p-3.5 bg-white/[0.04] border border-zinc-800 rounded-sm">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider mb-1">
                    Saudi Arabia Hotline
                  </span>
                  <a
                    href="tel:+966536376568"
                    className="text-base sm:text-lg font-bold text-white hover:text-[#c5a059] transition-colors flex items-center gap-2"
                  >
                    <FaPhoneAlt className="text-xs text-[#c5a059]" />
                    +966 53 637 6568
                  </a>
                </div>

                <div className="p-3.5 bg-white/[0.04] border border-zinc-800 rounded-sm">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider mb-1">
                    Pakistan Umrah Desk
                  </span>
                  <a
                    href="tel:+923158494785"
                    className="text-base sm:text-lg font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-2"
                  >
                    <FaPhoneAlt className="text-xs text-[#c5a059]" />
                    +92 315 849 4785
                  </a>
                </div>

                <div className="p-3.5 bg-white/[0.04] border border-zinc-800 rounded-sm">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider mb-1">
                    UAE Tourism, Safari &amp; Car Rental
                  </span>
                  <a
                    href="tel:+9715084015369"
                    className="text-base sm:text-lg font-bold text-white hover:text-[#c5a059] transition-colors flex items-center gap-2"
                  >
                    <FaPhoneAlt className="text-xs text-[#c5a059]" />
                    +971 50 840 15369
                  </a>
                </div>

                <div className="p-3.5 bg-white/[0.04] border border-zinc-800 rounded-sm">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider mb-1">
                    UK WhatsApp &amp; All-Service Desk
                  </span>
                  <a
                    href="https://wa.me/447882749006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-2"
                  >
                    <FaWhatsapp className="text-sm text-[#25D366]" />
                    +44 7882 749006
                  </a>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <a
                  href="https://maps.google.com/?q=District+Al+Kakiya,+Makkah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-[#c5a059] transition-colors"
                >
                  <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#c5a059]" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Makkah Office</span>
                    District Al Kakiya, Makkah
                  </span>
                </a>
                <a
                  href="https://maps.google.com/?q=Ch+Zahoor+Ellahi+Stadium,+Gujrat,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-[#c5a059] transition-colors"
                >
                  <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#c5a059]" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Pakistan Office</span>
                    Ch Zahoor Ellahi Stadium, Gujrat, Pakistan
                  </span>
                </a>
              </div>

              {/* Working Hours & Instant Inquiry Notice */}
              <div className="pt-1">
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                  <FaClock className="text-[#c5a059]" />
                  <span>Available 24/7, 365 days for airport &amp; intercity transfers</span>
                </div>

                <a
                  href="https://wa.me/447882749006?text=Salam%20Nexora,%20I%20would%20like%20to%20book%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Instant Booking Chat</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400 gap-4">
            <p className="text-center sm:text-left">
              &copy; 2025 Nexora Journeys. All Rights Reserved. Serving the Guests of Ar-Rahman.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
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
        href="https://wa.me/447882749006?text=Salam%20Nexora,%20I%20would%20like%20to%20inquire%20about%20booking%20services."
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
