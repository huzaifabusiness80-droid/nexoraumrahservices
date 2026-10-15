import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { uaeTours, UaeTourItem } from "@/lib/data/tourData";
import { FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheck, FaPhoneAlt, FaCar, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return uaeTours.map((t) => ({
    id: t.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = uaeTours.find((t) => t.id === id);

  if (!tour) {
    return {
      title: "Tour Not Found | Nexora Journeys",
    };
  }

  return {
    title: `${tour.title} Rates & Private Booking | Nexora Journeys`,
    description: `Book private ${tour.title} in Dubai & UAE. Duration: ${tour.duration}. Rates starting from ${tour.priceAed} AED with hotel transfers.`,
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { id } = await params;
  const tour = uaeTours.find((t) => t.id === id);

  if (!tour) {
    notFound();
  }

  const targetPhone = "923158494785";
  const bookingText = encodeURIComponent(
    `Salam Nexora Journeys, I would like to book the "${tour.title}" (${tour.duration}, ${tour.priceAed} AED). Please confirm availability.`
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
          <Link
            href={tour.category === "city-tour" ? "/services/uae-city-tours" : "/services/uae-desert-safari"}
            className="hover:text-black"
          >
            {tour.category === "city-tour" ? "UAE City Tours" : "UAE Desert Safari"}
          </Link>
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
                  <FaClock /> {tour.duration}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  {tour.title}
                </h1>
              </div>
            </div>

            {/* Overview */}
            <div className="p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-2 pb-2 border-b border-zinc-200">
                Experience Overview
              </h2>
              <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed mb-6">
                {tour.overview}
              </p>

              {/* Highlights */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                Key Experience Highlights:
              </h3>
              <ul className="space-y-2.5 mb-6 text-xs text-zinc-700">
                {tour.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <FaCheck className="text-[#c5a059] shrink-0 text-xs mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Inclusions */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                What&apos;s Included:
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <FaCheck className="text-emerald-600 shrink-0 text-xs mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing & Booking */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#8a651f] bg-[#faf5e9] px-2.5 py-1 border border-[#e6c989] uppercase tracking-widest inline-block mb-2">
                Transparent All-Inclusive Rate
              </span>
              <h2 className="text-xl font-extrabold uppercase text-zinc-900 mb-1">
                {tour.title}
              </h2>
              <p className="text-xs text-zinc-500">
                Instant confirmation with direct hotel transfers in Dubai.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 border border-[#c5a059]/40 bg-[#fdfbf6] text-center">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                Total Experience Price
              </span>
              <div className="text-3xl font-black text-zinc-950 mt-1">
                {tour.priceAed} <span className="text-sm text-[#9b762c] font-bold">AED</span>
              </div>
              <span className="text-[11px] text-zinc-500 block mt-1">
                {tour.category === "city-tour" ? "Per Private Vehicle" : "Per Person All-Inclusive"}
              </span>
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
                <span>Book This Tour On WhatsApp</span>
              </a>

              <a
                href={`tel:${targetPhone}`}
                className="w-full py-3.5 bg-zinc-900 hover:bg-black text-white text-center font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call Chauffeur Desk (+{targetPhone})</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
