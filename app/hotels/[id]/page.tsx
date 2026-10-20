import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import prisma from "@/lib/prisma";
import { allHotels, HotelItem } from "@/lib/data/hotelData";
import { formatHotelPriceValidity, isHotelPriceAvailable } from "@/lib/hotelPricing";
import { FaWhatsapp, FaMapMarkerAlt, FaWalking, FaBusAlt, FaCheck, FaBed } from "react-icons/fa";


export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

async function getHotelData(id: string) {
  try {
    const hotel = await prisma.hotel.findFirst({
      where: {
        OR: [
          { slug: id },
          { id: id },
          { name: { equals: id.replace(/-/g, " "), mode: "insensitive" } },
        ],
        isActive: true,
      },
      include: {
        rooms: { orderBy: { pricePerNight: "asc" } },
      },
    });

    if (hotel) {
      const sharingRoom = hotel.rooms.find((r) => r.roomType.toLowerCase().includes("sharing"));
      const standardRoom = hotel.rooms.find((r) =>
        r.roomType.toLowerCase().includes("quad") ||
        r.roomType.toLowerCase().includes("double") ||
        r.roomType.toLowerCase().includes("standard")
      );
      const quintRoom = hotel.rooms.find((r) => r.roomType.toLowerCase().includes("quint"));

      return {
        id: hotel.slug || hotel.id,
        name: hotel.name,
        city: (hotel.city?.toLowerCase() === "madinah" ? "madinah" : "makkah") as "makkah" | "madinah",
        location: hotel.address || (hotel.city?.toLowerCase() === "makkah" ? "Ibrahim Khalil Road" : "Markazia Central Area"),
        mapLocation: hotel.address,
        distance: hotel.distance || "Walking Distance",
        image: hotel.image,
        gallery: hotel.gallery || [],
        sharingBed: sharingRoom ? Math.round(sharingRoom.pricePerNight) : undefined,
        quadBed: standardRoom ? Math.round(standardRoom.pricePerNight) : Math.round(hotel.startingPrice || 350),
        quintBed: quintRoom ? Math.round(quintRoom.pricePerNight) : undefined,
        isContactPricing: hotel.isContactPricing,
        priceValidFrom: hotel.priceValidFrom,
        priceValidUntil: hotel.priceValidUntil,
        validity: formatHotelPriceValidity(hotel.priceValidFrom, hotel.priceValidUntil) || "Current Umrah Season",
      };
    }
  } catch (error) {
    console.error("Error fetching hotel from DB:", error);
  }

  // Fallback to static dummy list
  const staticHotel = allHotels.find(
    (h) => h.id === id || h.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );
  return staticHotel
    ? { ...staticHotel, mapLocation: staticHotel.location, isContactPricing: false, priceValidFrom: null, priceValidUntil: null }
    : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hotel = await getHotelData(id);

  if (!hotel) {
    return {
      title: "Hotel Not Found | Nexora Journeys",
    };
  }

  const cityName = hotel.city === "makkah" ? "Makkah Al-Mukarramah" : "Madinah Al-Munawwarah";
  const hasPrice = isHotelPriceAvailable(hotel);

  return {
    title: `${hotel.name} ${hasPrice ? "Rates & Booking" : "Price Quote"} | Hotels in ${cityName} | Nexora Journeys`,
    description: hasPrice
      ? `Official rates for ${hotel.name} in ${cityName} (${hotel.location}, ${hotel.distance}). Sharing beds from ${hotel.sharingBed || hotel.quadBed} SAR.`
      : `Contact Nexora Journeys for current room rates and availability at ${hotel.name} in ${cityName}.`,
    keywords: [
      `${hotel.name} rates`,
      `${hotel.name} ${hotel.city}`,
      `Hotels in ${hotel.location}`,
      "Umrah hotel booking SAR",
      "Nexora Journeys Hotels",
    ],
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const { id } = await params;
  const hotel = await getHotelData(id);

  if (!hotel) {
    notFound();
  }

  const targetPhone = "447882749006";
  const hasPrice = isHotelPriceAvailable(hotel);
  const cityName = hotel.city === "makkah" ? "Makkah" : "Madinah";
  const bookingText = encodeURIComponent(
    `Salam Nexora Journeys, I would like to ${hasPrice ? "book" : "get a price quote for"} "${hotel.name}" in ${cityName} (${hotel.location}, ${hotel.distance}). Please confirm availability for my travel dates.`
  );
  const waLink = `https://wa.me/${targetPhone}?text=${bookingText}`;
  const galleryImages = "gallery" in hotel && Array.isArray(hotel.gallery) ? hotel.gallery : [];
  const mapLocation = hotel.mapLocation;
  const mapQuery = [hotel.name, mapLocation, cityName].filter(Boolean).join(", ");
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-zinc-600 flex items-center gap-2">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/services/umrah-hotels" className="hover:text-black">Umrah Hotels</Link>
          <span>/</span>
          <span className="capitalize">{hotel.city}</span>
          <span>/</span>
          <span className="font-semibold text-zinc-900">{hotel.name}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Hotel Overview & Gallery */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 shadow-sm overflow-hidden">
            <div className="relative w-full h-80 sm:h-96 bg-zinc-900">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  hotel.city === "makkah" ? "bg-[#c5a059] text-black" : "bg-emerald-600 text-white"
                }`}>
                  {cityName} Hotel
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  {hotel.name}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt className="text-[#c5a059]" />
                  <span>{hotel.location}</span>
                  <span>•</span>
                  <span>{hotel.distance === "Shuttle" ? "Free 24/7 Shuttle to Haram" : `${hotel.distance} Walking Distance`}</span>
                </p>
              </div>
            </div>
            <ServiceImageGallery images={galleryImages} alt={hotel.name} />

            {/* Room Rate Cards */}
            {hasPrice ? (
              <div className="p-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 pb-2 border-b border-zinc-200">
                  Official Room Configuration Rates ({hotel.validity})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-zinc-50 border border-zinc-200 p-4 text-center">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Sharing Bed
                    </span>
                    <p className="text-xl font-extrabold text-zinc-900">
                      {hotel.sharingBed ? `${hotel.sharingBed} SAR` : <span className="text-zinc-400 font-normal">N/A</span>}
                    </p>
                    <span className="text-[10px] text-zinc-500 block mt-1">Per Bed / Night</span>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-200 p-4 text-center">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                      Dbl / Trpl / Quad
                    </span>
                    <p className="text-xl font-extrabold text-zinc-950">
                      {hotel.quadBed ? `${hotel.quadBed} SAR` : <span className="text-zinc-400 font-normal">N/A</span>}
                    </p>
                    <span className="text-[10px] text-amber-800 font-medium block mt-1">Room / Night</span>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-4 text-center">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Quint Bed
                    </span>
                    <p className="text-xl font-extrabold text-zinc-900">
                      {hotel.quintBed ? `${hotel.quintBed} SAR` : <span className="text-zinc-400 font-normal">N/A</span>}
                    </p>
                    <span className="text-[10px] text-zinc-500 block mt-1">Room / Night</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-center">
                  <h2 className="text-lg font-bold text-zinc-900">Contact for pricing</h2>
                  <p className="mt-2 text-sm text-zinc-600">
                    Current room rates are not listed. Contact us on WhatsApp for pricing and availability.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking Summary & Direct WhatsApp */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase tracking-widest">
                Verified Availability
              </span>
              <h3 className="text-xl font-extrabold text-zinc-900 mt-2 mb-3">
                Reserve {hotel.name}
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-4">
                Enjoy hassle-free pilgrimage lodging in {cityName}. Official booking confirmation vouchers issued directly with 24/7 reception check-in.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-100 text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <FaCheck className="text-emerald-600 shrink-0" />
                <span>Air-conditioned rooms with private ensuite bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-emerald-600 shrink-0" />
                <span>Daily housekeeping &amp; clean linen supply</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-emerald-600 shrink-0" />
                <span>Fast elevators &amp; 24-hour reception desk</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-emerald-600 shrink-0" />
                <span>Proximity to restaurants, laundromats &amp; grocery stores</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <FaWhatsapp className="text-xl" />
                <span>Inquire &amp; Book On WhatsApp</span>
              </a>

            </div>
          </div>
        </div>

        {mapLocation && (
          <section className="mb-12 border border-zinc-200 bg-white p-5 sm:p-7 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">Hotel Location</h2>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-zinc-600 hover:text-[#9b762c] hover:underline"
                >
                  {mapLocation}
                </a>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c5a059] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#b08c47]"
              >
                <FaMapMarkerAlt />
                Get Directions
              </a>
            </div>
            <iframe
              title={`${hotel.name} location map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
