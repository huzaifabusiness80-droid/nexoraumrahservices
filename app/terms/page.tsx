import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaShieldAlt,
  FaFileContract,
  FaCalendarCheck,
  FaPlaneArrival,
  FaCarSide,
  FaLock,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Terms & Policies | Nexora Journeys Umrah & Tourism",
  description:
    "Review the terms of service, cancellation policy, flight delay tracking guarantees, and privacy policies of Nexora Journeys.",
  keywords: [
    "Nexora Terms of Service",
    "Umrah Transport Cancellation Policy",
    "Makkah Hotel Booking Terms",
    "Nexora Journeys Policies",
  ],
};

export default function TermsAndPoliciesPage() {
  const targetPhone = "923158494785";

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative w-full bg-zinc-950 py-14 sm:py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest mb-3">
            Legal &amp; Customer Commitments
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Terms &amp; Policies
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Transparent, fair, and respectful guidelines ensuring complete peace of mind for every pilgrim and visitor served by Nexora Journeys.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 space-y-10">
        
        {/* Intro Highlight Box */}
        <div className="bg-[#faf6ed] border border-[#e8ce97] rounded-xl p-5 sm:p-6 text-xs sm:text-sm text-gray-800 leading-relaxed">
          <p className="font-semibold text-gray-900 mb-1">
            Our Hospitality Commitment to Allah&apos;s Guests:
          </p>
          <p>
            At Nexora Journeys, our policies are designed around fairness, honesty, and mutual respect. We do not engage in surprise surge pricing, unannounced fees, or hidden deductions.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaCalendarCheck className="text-[#b58e45]" />
            <h2>1. Booking &amp; Reservation Confirmation</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            All vehicle bookings, hotel allotments, and holy Ziyarat excursions are confirmed upon receipt of travel dates, flight numbers (where applicable), passenger numbers, and pickup locations.
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1.5 pt-1">
            <li>An official digital confirmation voucher is issued via WhatsApp and email.</li>
            <li>Chauffeur phone numbers and vehicle plates are dispatched to you prior to arrival.</li>
            <li>Hotel check-in vouchers follow official Saudi Ministry of Tourism and municipal regulations.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaPlaneArrival className="text-[#b58e45]" />
            <h2>2. Flight Delay Tracking &amp; Airport Meet-and-Greet</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We understand international flight schedules can change unexpectedly.
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1.5 pt-1">
            <li>
              <strong>Complimentary Flight Tracking:</strong> Our dispatch desk monitors live flight statuses into King Abdulaziz Airport (JED), Prince Mohammad Airport (MED), and Dubai Airport (DXB).
            </li>
            <li>
              <strong>Zero Delay Penalties:</strong> If your incoming flight is delayed, your scheduled chauffeur is automatically rescheduled at no extra charge.
            </li>
            <li>
              <strong>Standard Airport Waiting Time:</strong> Includes 90 minutes of complimentary wait time after flight touchdown for luggage collection and immigration.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaShieldAlt className="text-[#b58e45]" />
            <h2>3. Cancellation &amp; Rescheduling Policy</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We strive to provide maximum flexibility for families and pilgrimage groups:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1.5 pt-1">
            <li>
              <strong>Free Rescheduling:</strong> You may adjust pickup dates or times up to 12 hours prior to service without penalty.
            </li>
            <li>
              <strong>Cancellations:</strong> Cancellations made 24 hours or more before scheduled transfer are eligible for full refund or credit voucher.
            </li>
            <li>
              <strong>Hotel Bookings:</strong> Subject to specific hotel seasonal cutoff terms as indicated on the official tariff voucher.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaCarSide className="text-[#b58e45]" />
            <h2>4. Fleet Standards &amp; Luggage Capacity</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            To ensure your safety and comfort on Saudi and UAE highways:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1.5 pt-1">
            <li>All vehicles undergo regular mechanical safety inspections and air conditioning sanitization.</li>
            <li>Pilgrims must select a vehicle size that safely accommodates all passengers and luggage pieces.</li>
            <li>Smoking and consumption of non-halal items are strictly prohibited inside all vehicles.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaLock className="text-[#b58e45]" />
            <h2>5. Privacy &amp; Data Protection</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Your personal information (passports, flight schedules, WhatsApp contact) is gathered solely for dispatching chauffeurs, securing hotel check-ins, and issuing booking vouchers. We never sell, lease, or share your data with unauthorized third parties.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-gray-900">
            <FaQuestionCircle className="text-[#b58e45]" />
            <h2>6. Inquiries &amp; Customer Support</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            If you have questions regarding any policy or require immediate assistance during your trip, contact our 24/7 dispatch desk:
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${targetPhone}?text=Salam%20Nexora,%20I%20have%20a%20question%20regarding%20terms%20or%20booking%20policies.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-2xs transition-colors inline-flex items-center gap-2"
            >
              <FaWhatsapp className="text-base" />
              <span>Contact Dispatch Desk</span>
            </a>
            <Link
              href="/contact"
              className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded-md transition-colors inline-flex items-center gap-2"
            >
              <span>View All Contact Desks</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
