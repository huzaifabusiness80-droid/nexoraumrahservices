import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { ziyaratTours, ZiyaratTourItem } from "@/lib/data/ziyaratData";
import { FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheck, FaPhoneAlt, FaCar, FaShieldAlt, FaArrowLeft } from "react-icons/fa";


export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

async function getZiyaratData(id: string) {
  try {
    const tour = await prisma.ziyaratTour.findFirst({
      where: {
        OR: [
          { slug: id },
          { id: id },
          { title: { equals: id.replace(/-/g, " "), mode: "insensitive" } },
        ],
        isActive: true,
      },
    });

    if (tour) {
      return {
        id: tour.slug || tour.id,
        title: tour.title,
        badge: `${tour.city || "Sacred"} Ziyarat`,
        duration: tour.duration || "3 - 4 Hours",
        startingPriceSar: tour.priceSedan || 200,
        image: tour.image || "/images/hero/slide-2.jpg",
        overview: tour.description || `Experience the profound history of Islam through the guided ${tour.title}.`,
        stops: Array.isArray(tour.placesCovered) && tour.placesCovered.length > 0
          ? tour.placesCovered.map((place) => ({
              name: place,
              description: `Sacred pilgrimage landmark visited with dedicated chauffeur time for contemplation and prayers.`,
            }))
          : [
              { name: "Sacred Landmark Stops", description: "All prominent historic and religious places in this holy city." },
            ],
        inclusions: Array.isArray(tour.includes) && tour.includes.length > 0
          ? tour.includes
          : [
              "Private air-conditioned vehicle",
              "Multilingual driver (Urdu / Arabic / English)",
              "Direct hotel pickup & return transfer",
              "Sufficient time allowed for du'a and ziyarat at each site",
            ],
        vehiclePrices: [
          { vehicle: "Executive Sedan (Camry)", capacity: "4 Passengers", luggage: "2 Bags", priceSar: Math.round(tour.priceSedan || 250) },
          ...(tour.priceVan ? [{ vehicle: "Spacious Family Van (HiAce)", capacity: "10-12 Passengers", luggage: "8-10 Bags", priceSar: Math.round(tour.priceVan) }] : []),
          ...(tour.priceSuv ? [{ vehicle: "VIP Luxury SUV (GMC Yukon)", capacity: "7 Passengers", luggage: "6 Bags", priceSar: Math.round(tour.priceSuv) }] : []),
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching ziyarat from DB:", error);
  }

  // Fallback to static dummy list
  const staticTour = ziyaratTours.find(
    (t) => t.id === id || t.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );
  return staticTour || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = await getZiyaratData(id);

  if (!tour) {
    return {
      title: "Ziyarat Tour Not Found | Nexora Journeys",
    };
  }

  return {
    title: `${tour.title} Rates & Private Chauffeur Booking | Nexora Journeys`,
    description: `Book private ${tour.title} in Saudi Arabia. Duration: ${tour.duration}. Fixed SAR rates starting from ${tour.startingPriceSar} SAR with certified chauffeur.`,
  };
}

export default async function ZiyaratDetailPage({ params }: Props) {
  const { id } = await params;
  const tour = await getZiyaratData(id);

  if (!tour) {
    notFound();
  }

  const targetPhone = "923158494785";
  const bookingText = encodeURIComponent(
    `Salam Nexora Umrah Services, I would like to book the "${tour.title}" (${tour.duration}, starting from ${tour.startingPriceSar} SAR). Please share available dates.`
  );
  const waLink = `https://wa.me/${targetPhone}?text=${bookingText}`;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-zinc-600 flex items-center gap-2">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/services/umrah-ziyarat" className="hover:text-black">Sacred Ziyarat Tours</Link>
          <span>/</span>
          <span className="font-semibold text-zinc-900">{tour.title}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 shadow-sm">
            <div className="relative w-full h-80 sm:h-96 bg-zinc-950">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider">
                  {tour.badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#e4be72] font-semibold flex items-center gap-1.5 mb-1">
                  <FaClock /> {tour.duration} • Private Chauffeur
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  {tour.title}
                </h1>
              </div>
            </div>

            {/* Tour Overview */}
            <div className="p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-2 pb-2 border-b border-zinc-200">
                Spiritual Itinerary Overview
              </h2>
              <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed mb-6">
                {tour.overview}
              </p>

              {/* Key Holy Stops */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                Included Holy Sanctuaries &amp; Stops:
              </h3>
              <div className="space-y-3 mb-6">
                {tour.stops.map((stop, idx) => (
                  <div key={idx} className="bg-zinc-50 border border-zinc-200 p-3.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 bg-[#c5a059] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-zinc-900">
                        {stop.name}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 pl-7 leading-relaxed">
                      {stop.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                VIP Package Inclusions:
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheck className="text-[#c5a059] shrink-0 text-xs mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Vehicle Rates & Booking */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#8a651f] bg-[#faf5e9] px-2.5 py-1 border border-[#e6c989] uppercase tracking-widest inline-block mb-2">
                Guaranteed Fixed Rates
              </span>
              <h2 className="text-xl font-extrabold uppercase text-zinc-900 mb-2">
                Select Your Private Vehicle
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Rates quoted per private car with certified chauffeur, fuel, and wait times included.
              </p>
            </div>

            {/* Vehicle Rates Stack */}
            <div className="space-y-2.5">
              {tour.vehiclePrices.map((vp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 border border-zinc-200 hover:border-[#c5a059] bg-[#fdfbf6] flex items-center justify-between transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-zinc-900 uppercase">
                      {vp.vehicle}
                    </h3>
                    <span className="text-[11px] text-zinc-500 block">
                      Capacity: {vp.capacity} • {vp.luggage}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-black text-zinc-950">
                      {vp.priceSar} <span className="text-xs text-[#9b762c] font-bold">SAR</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 block">Fixed Tour Total</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <FaWhatsapp className="text-xl" />
                <span>Book Ziyarat On WhatsApp</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:923158494785`}
                  className="py-3 bg-zinc-900 hover:bg-black text-white text-center font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>PK (+923158494785)</span>
                </a>
                <a
                  href={`tel:+966536376568`}
                  className="py-3 bg-zinc-900 hover:bg-black text-white text-center font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>KSA (+966536376568)</span>
                </a>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 text-center pt-2">
              <span>Branch: Al Kakiya, Makkah, Saudi Arabia</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
