"use client";

import React, { useState } from "react";
import { FaWhatsapp, FaUser, FaEnvelope, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Umrah Transport (Jeddah, Makkah, Madinah)",
    passengers: "1-4 Persons",
    travelDate: "",
    message: "",
  });

  const whatsappNumber = "447882749006";
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    fetch("/api/portal/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.user) {
          setFormData((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email || prev.email,
            phone: data.user.phone || prev.phone,
          }));
        }
      })
      .catch(() => undefined);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          subject: `Travel date: ${formData.travelDate || "Flexible"}`,
          message: `Passengers: ${formData.passengers}\n${formData.message || "No specific requirements provided"}`,
        }),
      });
    } catch {
      // Keep WhatsApp fallback available even if database submission fails.
    }

    const textMessage = `*Salam Nexora Journeys Inquiry:*
━━━━━━━━━━━━━━━━━━━━
*Guest Name:* ${formData.name || "Not provided"}
*WhatsApp/Phone:* ${formData.phone || "Not provided"}
*Email:* ${formData.email || "Not provided"}
*Service Requested:* ${formData.service}
*Pilgrims / Passengers:* ${formData.passengers}
*Travel Date:* ${formData.travelDate || "Flexible"}
*Details / Requirements:*
${formData.message || "No specific note provided"}`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
    setSubmitting(false);
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-5">
          <span className="inline-block px-3 py-1 bg-[#faf6ed] text-[#b58e45] text-xs font-bold uppercase tracking-wider rounded-md border border-[#e8ce97]/60 mb-2">
            Instant Assistance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Send an Inquiry
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
            Fill out your pilgrimage or travel details below. Our 24/7 concierge will reply immediately on WhatsApp with official rates and availability.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FaUser className="text-xs" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Farooq"
                  className="w-full pl-9 pr-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                WhatsApp Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FaWhatsapp className="text-xs" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+966 / +92 / +971 / +44..."
                  className="w-full pl-9 pr-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope className="text-xs" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className="w-full pl-9 pr-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all cursor-pointer"
              >
                <option value="Umrah Transport (Jeddah, Makkah, Madinah)">Umrah Transport (Jeddah, Makkah, Madinah)</option>
                <option value="Umrah Hotel Booking (Makkah / Madinah)">Umrah Hotel Booking (Makkah / Madinah)</option>
                <option value="Holy Ziyarat Sanctuary Excursion">Holy Ziyarat Sanctuary Excursion</option>
                <option value="VIP Airport Chauffeur Service">VIP Airport Chauffeur Service</option>
                <option value="Car Rental (Self-Drive / Chauffeur)">Car Rental (Self-Drive / Chauffeur)</option>
                <option value="Travels & Tourism, Desert Safari">Travels &amp; Tourism, Desert Safari</option>
              </select>
            </div>
          </div>

          {/* Passengers & Travel Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Estimated Travel Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FaCalendarAlt className="text-xs" />
                </div>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Number of Passengers / Pilgrims
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FaUsers className="text-xs" />
                </div>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <option value="1-4 Persons (Sedan / Camry / Sonata)">1 - 4 Persons (Sedan / Camry / Sonata)</option>
                  <option value="5-7 Persons (GMC Yukon / Staria / Innova)">5 - 7 Persons (GMC Yukon / Staria / Innova)</option>
                  <option value="8-12 Persons (Toyota HiAce / Coaster)">8 - 12 Persons (Toyota HiAce / Coaster)</option>
                  <option value="Group 15+ Persons (VIP Luxury Coach)">Group 15+ Persons (VIP Luxury Coach)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Trip Details &amp; Special Requirements
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Flight arrival time at Jeddah Airport, number of luggage bags, preferred hotel category near Haram..."
              className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b58e45] focus:bg-white text-gray-900 text-xs sm:text-sm transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-[#b58e45] hover:bg-[#9f7932] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider"
          >
            <FaWhatsapp className="text-lg text-white" />
            <span>{submitting ? "Saving Inquiry..." : "Submit Inquiry via WhatsApp"}</span>
          </button>
        </form>
      </div>

      {/* Quick reassurance */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          24/7 Dispatch active
        </span>
        <span>Average WhatsApp response: <strong>&lt; 5 minutes</strong></span>
      </div>
    </div>
  );
}
