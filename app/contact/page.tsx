import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCompass,
  FaExternalLinkAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us | Nexora Journeys Umrah & Tourism",
  description:
    "Get in touch with Nexora Journeys 24/7 Pilgrimage Concierge. Contact our Saudi Arabia (+966 53 637 6568) and International (+92 315 8494785) dispatch desks.",
  keywords: [
    "Contact Nexora Journeys",
    "Umrah Taxi Contact",
    "Makkah Hotel Booking Support",
    "Jeddah Airport Chauffeur Phone Number",
    "Nexora WhatsApp",
  ],
};

export default function ContactPage() {
  const saudiPhone = "966536376568";
  const intlPhone = "923158494785";

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full bg-zinc-950 py-14 sm:py-18 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-1.jpg"
            alt="Contact Nexora Journeys"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3 rounded-sm">
            24/7 Guest Concierge Desk
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Contact Nexora Journeys
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our dedicated dispatch team is on standby round-the-clock in Saudi Arabia and UAE to coordinate your Umrah transport, hotels, and holy Ziyarat.
          </p>
        </div>
      </section>

      {/* Main Content Area: Left Form + Right Map */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Large Inquiry Form */}
          <div className="w-full flex flex-col">
            <ContactForm />
          </div>

          {/* Right Column: Matching-size Map & Office Information */}
          <div className="w-full flex flex-col">
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col h-full justify-between">
              
              {/* Map Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 px-2">
                <div>
                  <span className="text-[11px] font-bold text-[#b58e45] uppercase tracking-wider block">
                    Kingdom Ground Operations
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#b58e45] text-base shrink-0" />
                    <span>Makkah Al-Mukarramah Hub</span>
                  </h3>
                </div>

                <a
                  href="https://maps.google.com/?q=Masjid+al-Haram,+Makkah,+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-[#faf6ed] hover:text-[#b58e45] border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <span>Open in Maps</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-xl overflow-hidden border border-gray-200/80 shadow-inner">
                <iframe
                  title="Masjid Al-Haram, Makkah Map"
                  src="https://maps.google.com/maps?q=Masjid%20al-Haram,%20Makkah,%20Saudi%20Arabia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Hub Details and Quick Contact strip */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 px-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]/60">
                      <FaMapMarkerAlt className="text-xs" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Ground Headquarters</p>
                      <p className="text-gray-500 text-[11px] leading-snug">
                        Ibrahim Al Khalil St, Haram District, Makkah, Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]/60">
                      <FaClock className="text-xs" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Operating Hours</p>
                      <p className="text-gray-500 text-[11px] leading-snug">
                        24 Hours / 7 Days Non-Stop Chauffeur &amp; Airport Dispatch
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/${saudiPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>+966 53 637 6568</span>
                    </a>
                    <span className="text-gray-300">•</span>
                    <a
                      href={`tel:+${intlPhone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#b58e45]"
                    >
                      <FaPhoneAlt className="text-[11px]" />
                      <span>+92 315 8494785</span>
                    </a>
                  </div>

                  <span className="text-[11px] font-semibold text-[#b58e45] bg-[#faf6ed] px-2.5 py-1 rounded-full border border-[#e8ce97]/50">
                    Makkah • Madinah • Jeddah • UAE
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
