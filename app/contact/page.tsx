import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaExternalLinkAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us | Nexora Journeys Umrah & Tourism",
  description:
    "Get in touch with Nexora Journeys on WhatsApp. Contact our Saudi (+966 53 637 6568), Pakistan (+92 315 849 4785), UAE (+971 50 840 1539), and UK (+44 7882 749006) service desks.",
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
  const pakistanPhone = "923158494785";
  const uaePhone = "971508401539";
  const ukPhone = "447882749006";

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
                    <span>Makkah Office — Al Kakiya</span>
                  </h3>
                </div>

                <a
                  href="https://maps.google.com/?q=District+Al+Kakiya,+Makkah"
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
                  title="District Al Kakiya, Makkah Map"
                  src="https://maps.google.com/maps?q=District%20Al%20Kakiya,%20Makkah&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
                      <p className="font-bold text-gray-900">Makkah Office</p>
                      <a
                        href="https://maps.google.com/?q=District+Al+Kakiya,+Makkah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-[11px] leading-snug hover:text-[#b58e45]"
                      >
                        District Al Kakiya, Makkah
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center shrink-0 border border-[#e8ce97]/60">
                      <FaMapMarkerAlt className="text-xs" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Pakistan Office</p>
                      <a
                        href="https://maps.google.com/?q=Ch+Zahoor+Ellahi+Stadium,+Gujrat,+Pakistan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-[11px] leading-snug hover:text-[#b58e45]"
                      >
                        Ch Zahoor Ellahi Stadium, Gujrat, Pakistan
                      </a>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={`https://wa.me/${saudiPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#b58e45]"
                  >
                    <FaWhatsapp className="text-sm text-[#25D366]" />
                    <span>Saudi Arabia: +966 53 637 6568</span>
                  </a>
                  <a
                    href={`https://wa.me/${pakistanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#b58e45]"
                  >
                    <FaWhatsapp className="text-sm text-[#25D366]" />
                    <span>Pakistan: +92 315 849 4785</span>
                  </a>
                  <a
                    href={`https://wa.me/${uaePhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#b58e45]"
                  >
                    <FaWhatsapp className="text-sm text-[#25D366]" />
                    <span>UAE: +971 50 840 1539</span>
                  </a>
                  <a
                    href={`https://wa.me/${ukPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>UK WhatsApp: +44 7882 749006</span>
                  </a>
                </div>

                  <span className="text-[11px] font-semibold text-[#b58e45] bg-[#faf6ed] px-2.5 py-1 rounded-full border border-[#e8ce97]/50">
                    Makkah • Madinah • Jeddah • UAE
                  </span>
                </div>
              </div>

            </div>
          </div>

      </main>

      <Footer />
    </div>
  );
}
