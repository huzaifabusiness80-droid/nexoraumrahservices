import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import prisma from "@/lib/prisma";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCar,
  FaGasPump,
  FaKey,
  FaUserFriends,
  FaCheck,
  FaShieldAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaTachometerAlt,
} from "react-icons/fa";

export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

async function getCarData(id: string) {
  try {
    const car = await prisma.rentalCar.findFirst({
      where: {
        OR: [
          { slug: id },
          { id: id },
          { name: { equals: id.replace(/-/g, " "), mode: "insensitive" } },
        ],
        isActive: true,
      },
    });

    return car;
  } catch (error) {
    console.error("Error fetching rental car from DB:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarData(id);

  if (!car) {
    return {
      title: "Vehicle Not Found | Nexora Journeys",
    };
  }

  const isContactPrice =
    car.dailyPriceAed <= 0 ||
    (Array.isArray(car.features) && car.features.includes("contact_for_price"));

  return {
    title: `${car.name} (${car.brand}) UAE Car Rental | Nexora Journeys`,
    description: isContactPrice
      ? `Rent ${car.name} in Dubai & Abu Dhabi. Custom rates available on request. Free hotel & airport delivery.`
      : `Rent ${car.name} in Dubai & Abu Dhabi from ${car.dailyPriceAed} AED/day. ${car.seats} seats, ${car.transmission}, free airport delivery.`,
  };
}

export default async function CarRentalDetailPage({ params }: Props) {
  const { id } = await params;
  const car = await getCarData(id);

  if (!car) {
    notFound();
  }

  const targetPhone = "923158494785";
  const realFeatures = (Array.isArray(car.features) ? car.features : []).filter(
    (f) => f && f !== "contact_for_price"
  );
  const isContactPrice =
    car.dailyPriceAed <= 0 ||
    (Array.isArray(car.features) && car.features.includes("contact_for_price"));

  const bookingText = encodeURIComponent(
    isContactPrice
      ? `Salam Nexora Journeys, I want to inquire about renting the "${car.name}" (${car.brand} - ${car.category}) in UAE. Please confirm availability and pricing.`
      : `Salam Nexora Journeys, I want to rent the "${car.name}" (${car.brand} - ${car.category}) in UAE. Daily rate: ${car.dailyPriceAed} AED. Please confirm availability and delivery.`
  );
  const waLink = `https://wa.me/${targetPhone}?text=${bookingText}`;
  const galleryImages = car.gallery || [];

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
              <span className="px-2.5 py-1 bg-[#faf6ed] text-[#b58e45] border border-[#e8ce97] text-[11px] font-semibold uppercase tracking-wider rounded">
                {car.brand}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              {car.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#b58e45]" />
              <span>Available in Dubai, Abu Dhabi, Sharjah &amp; UAE</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            {isContactPrice ? (
              <>
                <span className="text-xs text-gray-400 font-medium block">Rental Tariff</span>
                <div className="text-xl sm:text-2xl font-black text-[#b58e45] mt-0.5">
                  Contact For Pricing
                </div>
                <span className="text-xs text-emerald-600 font-medium block mt-0.5">
                  Custom quote on WhatsApp
                </span>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-400 font-medium block">Daily Rate</span>
                <div className="text-2xl sm:text-3xl font-black text-gray-900">
                  <span className="text-base font-bold text-[#b58e45] mr-1">AED</span>
                  {car.dailyPriceAed}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ Day</span>
                </div>
                {car.weeklyPriceAed && (
                  <span className="text-xs text-emerald-600 font-medium block mt-0.5">
                    Weekly: AED {car.weeklyPriceAed}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Vehicle Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Card */}
            <div className="bg-white border border-gray-200/90 rounded-xl overflow-hidden shadow-2xs">
              <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-zinc-950">
                <Image
                  src={car.image || "/images/fleet/toyota-camry.jpg"}
                  alt={car.name}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-2">
                  <FaShieldAlt className="text-[#c5a059]" />
                  <span>Comprehensive Insurance</span>
                </div>
              </div>
              <ServiceImageGallery images={galleryImages} alt={car.name} />

              {/* Core Specifications Bar (100% from Backend DB) */}
              <div className="p-5 sm:p-6 bg-white border-t border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Capacity
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaUserFriends className="text-[#b58e45]" />
                      <span>{car.seats} Seats</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Transmission
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaKey className="text-[#b58e45]" />
                      <span>{car.transmission}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Model Year
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaCalendarAlt className="text-[#b58e45]" />
                      <span>{car.year}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Fuel Type
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaGasPump className="text-[#b58e45]" />
                      <span>{car.fuelType}</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Daily Mileage
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaTachometerAlt className="text-[#b58e45]" />
                      <span>{car.freeMileagePerDay} KM/day</span>
                    </p>
                  </div>

                  <div className="px-2 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Security Deposit
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 flex items-center justify-center gap-1.5">
                      <FaShieldAlt className="text-[#b58e45]" />
                      <span>{car.securityDeposit > 0 ? `AED ${car.securityDeposit}` : "Zero Deposit"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Features (Only if added in DB by Admin) */}
            {realFeatures.length > 0 && (
              <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Key Features &amp; Equipment
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {realFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <FaCheck className="text-[#b58e45] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rates Table (Only Real Backend Configured Rates) */}
            {!isContactPrice && (
              <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Rental Rates &amp; Packages
                </h2>
                <p className="text-xs text-gray-500 mb-5">
                  Official fixed rates configured for {car.name}.
                </p>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-gray-200">
                    <thead className="bg-[#faf6ed] text-gray-900 font-bold uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Period</th>
                        <th className="py-3 px-4 text-right">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-900">Daily Rate (Per Day)</td>
                        <td className="py-3 px-4 text-right font-extrabold text-[#b58e45] text-base">
                          AED {car.dailyPriceAed}
                        </td>
                      </tr>
                      {car.weeklyPriceAed && (
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-gray-900">Weekly Package (7+ Days)</td>
                          <td className="py-3 px-4 text-right font-extrabold text-[#b58e45] text-base">
                            AED {car.weeklyPriceAed}
                          </td>
                        </tr>
                      )}
                      {car.monthlyPriceAed && (
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-gray-900">Monthly Package (30+ Days)</td>
                          <td className="py-3 px-4 text-right font-extrabold text-emerald-600 text-base">
                            AED {car.monthlyPriceAed}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Booking Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-sm">
              <div className="pb-4 mb-4 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Reserve This Car
                </span>
                {isContactPrice ? (
                  <div className="text-xl sm:text-2xl font-black text-[#b58e45] mt-1">
                    Contact For Pricing
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                    <span className="text-sm font-bold text-[#b58e45] mr-1">AED</span>
                    {car.dailyPriceAed}
                    <span className="text-xs font-normal text-gray-500 ml-1">/ Day</span>
                  </div>
                )}
              </div>

              {/* Rate Summary */}
              <div className="space-y-2.5 mb-6 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center">
                  <span>Vehicle:</span>
                  <span className="font-bold text-gray-900">{car.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Brand:</span>
                  <span className="font-semibold text-gray-700">{car.brand}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Category:</span>
                  <span className="font-semibold text-gray-700">{car.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Daily Mileage:</span>
                  <span className="font-semibold text-gray-700">{car.freeMileagePerDay} KM/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Security Deposit:</span>
                  <span className="font-semibold text-gray-700">
                    {car.securityDeposit > 0 ? `AED ${car.securityDeposit}` : "Zero Deposit"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-semibold text-gray-800">
                  <span>Delivery:</span>
                  <span className="text-emerald-600">Airport &amp; Hotel Delivery</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1fa951] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>{isContactPrice ? "Inquire on WhatsApp" : "Book on WhatsApp"}</span>
                </a>

                <a
                  href={`tel:+${targetPhone}`}
                  className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaPhoneAlt className="text-xs text-gray-400" />
                  <span>Call Us: +92 315 8494785</span>
                </a>
              </div>
            </div>

            {/* Back to all cars link */}
            <div className="text-center">
              <Link
                href="/services/uae-car-rental"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#b58e45] hover:text-[#9f7932] transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span>Browse All Rental Cars</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
