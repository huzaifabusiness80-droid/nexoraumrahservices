"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaWhatsapp } from "react-icons/fa";

export default function HomeFaqSection() {
  const targetPhone = "923158494785";
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I book an Umrah transport transfer or hotel room with Nexora?",
      a: "Booking is instant and straightforward. Simply choose your desired vehicle, hotel, or Ziyarat tour on our website and click 'Book Now' or 'Book on WhatsApp'. Our 24/7 dispatch desk will verify your travel dates and passenger count, then immediately issue your official digital confirmation voucher.",
    },
    {
      q: "What happens if my international flight into Jeddah or Madinah is delayed?",
      a: "All airport pickups include complimentary live flight tracking. We monitor your flight's real-time arrival status into King Abdulaziz Airport (JED) or Prince Mohammad Airport (MED). If your flight is delayed, your scheduled chauffeur is automatically adjusted with zero waiting fee penalties.",
    },
    {
      q: "Are the transport route prices and hotel room tariffs fixed?",
      a: "Yes, 100%. All rates displayed on our website and official tariffs are fixed with zero hidden tolls, fuel charges, or municipal tax additions. You will never encounter unexpected price increases or airport surge fees upon arrival.",
    },
    {
      q: "Can our family spend extra time at specific holy sanctuaries during Ziyarat?",
      a: "Absolutely. All our Ziyarat tours are private and exclusively for your family or group. Our courteous multilingual chauffeurs allow flexible, relaxed wait times at Cave Hira, Mount Uhud, Masjid Quba, and the Badar battlefield so you can pray and make dua in complete peace.",
    },
    {
      q: "What documents are required to rent a self-drive car in Dubai or Abu Dhabi?",
      a: "Tourists require a valid passport copy with UAE entry visa, and a valid home country driving license or an International Driving Permit (IDP). Minimum driver age is 21 years. All rentals include comprehensive insurance and free airport or hotel delivery.",
    },
    {
      q: "How can I contact your ground team once I arrive in Saudi Arabia?",
      a: "Our ground operations team is active 24/7 in Makkah Al-Mukarramah, Madinah Al-Munawwarah, and Jeddah. You can reach our direct Saudi hotline at +966 53 637 6568 or message our international coordination desk on WhatsApp at +92 315 8494785.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Exact What We Offer Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase max-w-2xl mx-auto">
            Everything You Need to Know Before Booking Your Journey
          </p>
        </motion.div>

        {/* Accordion List with Framer Motion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-[#c5a059] shadow-sm bg-white"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 flex items-center gap-2.5">
                    <FaQuestionCircle className="text-[#c5a059] shrink-0 text-sm" />
                    <span>{faq.q}</span>
                  </span>
                  <FaChevronDown
                    className={`text-zinc-400 text-xs shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#c5a059]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 sm:p-7 bg-[#faf6ed] border border-[#e8ce97] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
              Have a specific question about your journey?
            </h4>
            <p className="text-xs text-zinc-600 mt-0.5">
              Our 24/7 human concierge desk is available round-the-clock.
            </p>
          </div>
          <a
            href={`https://wa.me/${targetPhone}?text=Salam%20Nexora%20Journeys,%20I%20have%20a%20question%20regarding%20my%20trip.`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded shadow-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <FaWhatsapp className="text-base" />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
