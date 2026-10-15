import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
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
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
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
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            24/7 Guest Concierge Desk
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Contact Nexora Journeys
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our dedicated dispatch team is on standby round-the-clock in Saudi Arabia and the UAE to assist with your Umrah transport, hotel reservations, and holy Ziyarat.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Desk 1: Saudi Arabia Ground Operations */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
              <FaMapMarkerAlt />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Ground Dispatch
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Saudi Arabia Operations
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Jeddah Airport, Makkah Al-Mukarramah, and Madinah Al-Munawwarah transfers.
            </p>
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <a
                href={`https://wa.me/${saudiPhone}?text=Salam%20Nexora,%20I%20need%20immediate%20ground%20assistance%20in%20Saudi%20Arabia.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-gray-800 hover:text-[#b58e45] transition-colors"
              >
                <FaWhatsapp className="text-[#25D366] text-base" />
                <span>+966 53 637 6568</span>
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <FaClock className="text-gray-400" />
                <span>Available 24/7 • Non-Stop Service</span>
              </div>
            </div>
          </div>

          {/* Desk 2: International Bookings & Coordination */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
              <FaHeadset />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Pilgrim Support
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              International Bookings Desk
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Advance booking, custom family packages, and official hotel vouchers.
            </p>
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <a
                href={`https://wa.me/${intlPhone}?text=Salam%20Nexora%20Journeys,%20I%20would%20like%20to%20inquire%20about%20booking%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-gray-800 hover:text-[#b58e45] transition-colors"
              >
                <FaWhatsapp className="text-[#25D366] text-base" />
                <span>+92 315 8494785</span>
              </a>
              <a
                href={`tel:+${intlPhone}`}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-[#b58e45] transition-colors"
              >
                <FaPhoneAlt className="text-gray-400" />
                <span>Direct Hotline Call</span>
              </a>
            </div>
          </div>

          {/* Desk 3: UAE Tours & Car Rental */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#faf6ed] text-[#b58e45] flex items-center justify-center text-xl mb-4 border border-[#e8ce97]">
              <FaShieldAlt />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Tourism Desk
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              UAE Tourism &amp; Car Rental
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Dubai Airport delivery, Desert Safari, Abu Dhabi tours &amp; luxury rentals.
            </p>
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-gray-400" />
                <span>contact@nexorajourneys.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaClock className="text-gray-400" />
                <span>Instant confirmation via WhatsApp</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2-Column Section: Direct Inquiry Form + Value Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Send an Instant Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Fill in your travel details below and our concierge will respond on WhatsApp within minutes.
            </p>

            <form
              action={`https://wa.me/${intlPhone}`}
              method="get"
              target="_blank"
              className="space-y-4 text-xs sm:text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#b58e45] text-gray-900 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 / +92 / +44..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#b58e45] text-gray-900 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Service of Interest
                </label>
                <select className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#b58e45] text-gray-900 text-xs sm:text-sm cursor-pointer">
                  <option value="umrah-transport">Umrah Transport (Jeddah, Makkah, Madinah)</option>
                  <option value="umrah-hotels">Umrah Hotel Booking (Makkah / Madinah)</option>
                  <option value="umrah-ziyarat">Holy Ziyarat Sanctuary Excursion</option>
                  <option value="uae-car-rental">UAE Car Rental (Self-Drive / Chauffeur)</option>
                  <option value="uae-tours">UAE City Tour / Desert Safari</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Travel Dates &amp; Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please specify arrival date, passenger count, preferred vehicle or hotel..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#b58e45] text-gray-900 text-xs sm:text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#b58e45] hover:bg-[#9f7932] text-white font-semibold rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
              >
                <FaWhatsapp className="text-base" />
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Value Assurances & Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#faf6ed] border border-[#e8ce97] rounded-xl p-6 sm:p-7">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Why Pilgrims Rely on Nexora
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-[#b58e45] shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Punctuality Guarantee:</strong> Our chauffeurs arrive 15 minutes before your scheduled pickup.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-[#b58e45] shrink-0 mt-0.5" />
                  <span>
                    <strong>Complimentary Flight Delay Tracking:</strong> We track flight arrivals into Jeddah &amp; Madinah airports with zero waiting surcharges.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-[#b58e45] shrink-0 mt-0.5" />
                  <span>
                    <strong>Official Hotel Vouchers:</strong> Guaranteed room allotments with official seasonal tariff rates.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-[#b58e45] shrink-0 mt-0.5" />
                  <span>
                    <strong>Multilingual Courteous Chauffeurs:</strong> Fluent in Urdu, Arabic, and English to assist elderly pilgrims and families.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-2xs text-center">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">
                Emergency Ground Hotline
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Already arrived in the Kingdom and need an urgent vehicle?
              </p>
              <a
                href={`tel:+${saudiPhone}`}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call Saudi Desk: +966 53 637 6568</span>
              </a>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
