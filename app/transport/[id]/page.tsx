import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import BookServiceModal from "@/components/BookServiceModal";
import prisma from "@/lib/prisma";
import { transportVehicles } from "@/lib/data/transportData";
import { FaWhatsapp, FaSuitcase, FaUserFriends, FaCheck, FaShieldAlt } from "react-icons/fa";


export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

async function getVehicleData(id: string) {
  try {
    const vehicle = await prisma.transportVehicle.findFirst({
      where: {
        OR: [
          { slug: id },
          { id: id },
          { name: { equals: id.replace(/-/g, " "), mode: "insensitive" } },
        ],
        isActive: true,
      },
      include: {
        routes: { orderBy: { priceSar: "asc" } },
      },
    });

    if (vehicle) {
      return {
        id: vehicle.slug || vehicle.id,
        name: vehicle.name,
        category: vehicle.category || "Executive Fleet",
        seats: vehicle.seats || "4-7 Seater",
        luggage: vehicle.luggage || "Luggage Space Available",
        image: vehicle.image || "/images/fleet/toyota-camry.jpg",
        gallery: vehicle.gallery || [],
        posterImage: vehicle.posterImage || undefined,
        startingPriceSar: vehicle.startingPriceSar || (vehicle.routes?.[0]?.priceSar ?? 150),
        description: vehicle.description || `Luxury private chauffeur service for ${vehicle.name} across Makkah, Madinah, and Jeddah.`,
        features: Array.isArray(vehicle.features) && vehicle.features.length > 0 ? vehicle.features : [
          "Chilled Dual-Zone Climate Control",
          "Complimentary Chilled Bottled Water",
          "Professional English/Urdu/Arabic Speaking Chauffeur",
          "Door-to-door hotel terminal luggage assistance",
          "Real-time flight tracking & zero delay guarantee",
        ],
        rateList: vehicle.routes && vehicle.routes.length > 0 ? vehicle.routes.map((r) => ({
          route: r.route,
          priceSar: r.priceSar,
        })) : [
          { route: "Jeddah Airport → Makkah Hotel (Drop Off)", priceSar: vehicle.startingPriceSar || 250 },
          { route: "Makkah → Madina Hotel (Drop Off)", priceSar: Math.round((vehicle.startingPriceSar || 250) * 1.8) },
          { route: "Makkah Ziyarat Tour", priceSar: vehicle.startingPriceSar || 250 },
          { route: "Madina Ziyarat Tour", priceSar: Math.round((vehicle.startingPriceSar || 250) * 0.9) },
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching vehicle from DB:", error);
  }

  // Fallback to static dummy list
  const staticCar = transportVehicles.find(
    (c) => c.id === id || c.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );
  return staticCar || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = await getVehicleData(id);

  if (!car) {
    return {
      title: "Vehicle Not Found | Nexora Journeys",
    };
  }

  return {
    title: `${car.name} Rates & Umrah Transport Booking | Nexora Journeys`,
    description: `Book private ${car.name} (${car.seats}, ${car.luggage}) for Jeddah Airport, Makkah, and Madinah transfers. Transparent rates starting from ${car.startingPriceSar} SAR.`,
    keywords: [
      `${car.name} Umrah Taxi`,
      `${car.name} Makkah to Madinah`,
      `${car.name} Jeddah Airport Price`,
      "Saudi Arabia Chauffeur Service",
      "Nexora Journeys Fleet",
    ],
  };
}

export default async function TransportDetailPage({ params }: Props) {
  const { id } = await params;
  const car = await getVehicleData(id);

  if (!car) {
    notFound();
  }

  const targetPhone = "447882749006";
  const bookingText = encodeURIComponent(
    `Salam Nexora Journeys, I would like to book the ${car.name} (${car.seats}). Please confirm price and availability for my travel dates.`
  );
  const waLink = `https://wa.me/${targetPhone}?text=${bookingText}`;
  const galleryImages = "gallery" in car && Array.isArray(car.gallery) ? car.gallery : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-zinc-600 flex items-center gap-2">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/services/umrah-transport" className="hover:text-black">Umrah Transport</Link>
          <span>/</span>
          <span className="font-semibold text-zinc-900">{car.name}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Top Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Vehicle Image & Specs */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 shadow-sm overflow-hidden">
            <div className="relative w-full h-80 sm:h-96 bg-zinc-950">
              <Image
                src={car.image}
                alt={car.name}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider">
                  {car.category}
                </span>
              </div>
            </div>
            <ServiceImageGallery images={galleryImages} alt={car.name} />

            {/* Quick Specs Bar */}
            <div className="p-6 border-t border-zinc-200">
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-zinc-200">
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Capacity
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-1">
                    <FaUserFriends className="text-[#c5a059]" />
                    {car.seats}
                  </p>
                </div>
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Luggage
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-1">
                    <FaSuitcase className="text-[#c5a059]" />
                    {car.luggage}
                  </p>
                </div>
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Starting From
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                    {car.startingPriceSar} SAR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Summary & Features */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">
                Official Chauffeur Service
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight mt-1 mb-3">
                {car.name}
              </h1>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                {car.description}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3">
                Included VIP Amenities:
              </h3>
              <ul className="space-y-2.5 mb-8">
                {car.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                    <FaCheck className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Booking Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <BookServiceModal
                serviceType="UMRAH_TRANSPORT"
                itemName={car.name}
                route={"rateList" in car && car.rateList[0] ? car.rateList[0].route : car.category}
                currency="SAR"
                totalPrice={car.startingPriceSar || null}
                buttonLabel="Book This Vehicle"
                whatsappUrl={waLink}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              />

            </div>
          </div>
        </div>

        {/* Detailed Route Rates Table (Exact Prices from Reference Flyer) */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-zinc-200 gap-2">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-tight">
                Complete {car.name} Route Rate List
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                All prices are fixed, quoted per vehicle (not per person), and include fuel, highway tolls, and driver allowance.
              </p>
            </div>
            <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider border border-zinc-200 self-start sm:self-auto">
              Currency: SAR (Saudi Riyal)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-zinc-50 text-zinc-700 border-b border-zinc-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Route / Destination</th>
                  <th className="py-3 px-4 font-bold text-center">Vehicle</th>
                  <th className="py-3 px-4 font-bold text-center">Service Type</th>
                  <th className="py-3 px-4 font-bold text-right">Fixed Price (SAR)</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                {car.rateList.map((route, idx) => {
                  const itemWaText = encodeURIComponent(
                    `Salam Nexora Journeys, I would like to book ${car.name} for route: "${route.route}" (${route.priceSar} SAR).`
                  );
                  const itemWaLink = `https://wa.me/${targetPhone}?text=${itemWaText}`;

                  return (
                    <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-zinc-900">
                        {route.route}
                      </td>
                      <td className="py-3.5 px-4 text-center text-zinc-600">
                        {car.name}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                          Private Chauffeur
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-zinc-950 text-base">
                        {route.priceSar} <span className="text-xs font-normal text-zinc-500">SAR</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={itemWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4295a5] hover:bg-[#327784] text-white text-xs font-bold tracking-wider uppercase transition-colors"
                        >
                          <FaWhatsapp className="text-sm" />
                          <span>Reserve</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3">
            <FaShieldAlt className="text-2xl text-[#c5a059] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">100% On-Time Guarantee</h4>
              <p className="text-xs text-zinc-500 mt-1">Flight monitored in real-time. Chauffeur arrives 20 minutes prior to scheduled pickup.</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3">
            <FaCheck className="text-2xl text-emerald-600 shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Transparent Fixed SAR Rates</h4>
              <p className="text-xs text-zinc-500 mt-1">Zero meter disputes, zero dynamic surge pricing. What you see is what you pay.</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3">
            <FaWhatsapp className="text-2xl text-[#25D366] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Direct WhatsApp Dispatch</h4>
              <p className="text-xs text-zinc-500 mt-1">Immediate driver details, vehicle plate number, and live tracking location shared.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
