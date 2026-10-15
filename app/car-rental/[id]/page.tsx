import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { carRentalVehicles } from "@/lib/data/carRentalData";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCar,
  FaGasPump,
  FaKey,
  FaUserFriends,
  FaSuitcase,
  FaCheck,
  FaShieldAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaTachometerAlt,
} from "react-icons/fa";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return carRentalVehicles.map((car) => ({
    id: car.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = carRentalVehicles.find((c) => c.id === id);

  if (!car) {
    return {
      title: "Vehicle Not Found | Nexora Journeys",
    };
  }

  return {
    title: `${car.name} UAE Car Rental | Dubai & Abu Dhabi Rates | Nexora Journeys`,
    description: `Rent ${car.name} in Dubai & Abu Dhabi from ${car.dailyPriceAed} AED/day. ${car.passengers}, ${car.luggage}, automatic transmission, free airport delivery, and comprehensive insurance.`,
    keywords: [
      `${car.name} Rental Dubai`,
      `${car.name} Car Hire Abu Dhabi`,
      "Rent a Car Dubai Airport",
      "UAE Car Rental Rates",
      "Nexora Journeys Car Hire",
    ],
  };
}

export default async function CarRentalDetailPage({ params }: Props) {
  const { id } = await params;
  const car = carRentalVehicles.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const targetPhone = "923158494785";
  const bookingText = encodeURIComponent(
    `Salam Nexora Journeys, I want to rent the "${car.name}" (${car.category}) in UAE. Daily rate: ${car.dailyPriceAed} AED. Please confirm vehicle delivery and requirements.`
  );
  const waLink = `https://wa.me/${targetPhone}?text=${bookingText}`;

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services/uae-car-rental" className="hover:text-gray-900 transition-colors">
            UAE Car Rental
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{car.name}</span>
        </div>
      </nav>

      {/* Main Vehicle Details Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Title Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider rounded">
                {car.category}
              </span>
              <span className="text-xs text-[#b58e45] font-semibold bg-[#faf6ed] px-2.5 py-0.5 border border-[#e8ce97] rounded">
                Free Airport &amp; Hotel Delivery
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              {car.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#b58e45]" />
              <span>Available in Dubai, Abu Dhabi, Sharjah &amp; Ajman</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-gray-400 font-medium block">Starting Daily Tariff</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900">
              <span className="text-base font-bold text-[#b58e45] mr-1">AED</span>
              {car.dailyPriceAed}
              <span className="text-xs font-normal text-gray-500 ml-1">/ Day</span>
            </div>
            <span className="text-xs text-emerald-600 font-medium block mt-0.5">
              Weekly: AED {car.weeklyPriceAed} (Save 15%)
            </span>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Vehicle Presentation, Specifications & Info (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* High-Res Hero Image Card */}
            <div className="bg-white border border-gray-200/90 rounded-xl overflow-hidden shadow-2xs">
              <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-zinc-950">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-2">
                  <FaShieldAlt className="text-[#c5a059]" />
                  <span>Comprehensive RTA UAE Insurance</span>
                </div>
              </div>

              {/* Core Specifications Bar (6 tiles) */}
              <div className="p-5 sm:p-6 bg-white border-t border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Capacity
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaUserFriends className="text-[#b58e45]" />
                      <span>{car.passengers}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Luggage
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaSuitcase className="text-[#b58e45]" />
                      <span>{car.luggage}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Gearbox
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaKey className="text-[#b58e45]" />
                      <span>{car.transmission}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Engine
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaCar className="text-[#b58e45]" />
                      <span>{car.engine}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Fuel
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaGasPump className="text-[#b58e45]" />
                      <span>{car.fuelType}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Salik Tag
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaTachometerAlt className="text-[#b58e45]" />
                      <span>Pre-Installed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Overview */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Vehicle Overview
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {car.overview}
              </p>
            </div>

            {/* Key Features & Amenities */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Key Features &amp; Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {car.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <FaCheck className="text-[#b58e45] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparent Pricing Tiers */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Transparent Tariff Structure
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Fixed and honest rates with no unexpected extra platform fees.
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-gray-200">
                  <thead className="bg-[#faf6ed] text-gray-900 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Rental Duration</th>
                      <th className="py-3 px-4">Price (AED)</th>
                      <th className="py-3 px-4">Savings &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {car.pricingTiers.map((tier, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-900">{tier.duration}</td>
                        <td className="py-3 px-4 font-extrabold text-[#b58e45] text-base">
                          AED {tier.priceAed}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{tier.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rental Requirements & Documents */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Rental Documents &amp; Requirements
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Booking requires standard valid verification documents. Zero lengthy red tape.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {car.rentalRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <FaCheck className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                What is Included in Your Rental
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                {car.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b58e45] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Card & Support (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-sm">
              <div className="pb-4 mb-4 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Reserve This Car
                </span>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                  <span className="text-sm font-bold text-[#b58e45] mr-1">AED</span>
                  {car.dailyPriceAed}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ Day</span>
                </div>
              </div>

              {/* Rate Summary */}
              <div className="space-y-2.5 mb-6 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center">
                  <span>Daily Tariff (1-6 days):</span>
                  <span className="font-bold text-gray-900">AED {car.dailyPriceAed} / day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weekly Tariff (7+ days):</span>
                  <span className="font-bold text-[#b58e45]">AED {car.weeklyPriceAed} / wk</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Tariff (30 days):</span>
                  <span className="font-bold text-emerald-600">AED {car.monthlyPriceAed} / mo</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-semibold text-gray-800">
                  <span>Airport Delivery:</span>
                  <span className="text-emerald-600">FREE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#b58e45] hover:bg-[#9f7932] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Book on WhatsApp</span>
                </a>

                <a
                  href={`tel:+${targetPhone}`}
                  className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaPhoneAlt className="text-xs text-gray-400" />
                  <span>Call Us: +92 315 8494785</span>
                </a>
              </div>

              {/* Value Guarantees */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 text-xs shrink-0" />
                  <span>Free doorstep or airport delivery in Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 text-xs shrink-0" />
                  <span>Zero hidden insurance deductions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 text-xs shrink-0" />
                  <span>Full tank upon handover</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-500 text-xs shrink-0" />
                  <span>24/7 Roadside Mechanical Support</span>
                </div>
              </div>
            </div>

            {/* Back to all cars link */}
            <div className="text-center">
              <Link
                href="/services/uae-car-rental"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#b58e45] hover:text-[#9f7932] transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span>View All UAE Rental Cars</span>
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
