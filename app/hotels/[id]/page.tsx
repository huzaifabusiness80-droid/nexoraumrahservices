import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import BookServiceModal from "@/components/BookServiceModal";
import prisma from "@/lib/prisma";
import { allHotels } from "@/lib/data/hotelData";
import { formatHotelPriceValidity, isHotelPriceAvailable } from "@/lib/hotelPricing";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaWalking,
  FaStar,
  FaCheck,
  FaShieldAlt,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";

export const instant = false;

interface Props {
  params: Promise<{ id: string }>;
}

interface HotelRoomDetail {
  id?: string;
  roomType: string;
  capacity: number;
  pricePerNight: number;
  hasKaabaView: boolean;
}

interface ProcessedHotel {
  id: string;
  name: string;
  city: "makkah" | "madinah";
  stars: number;
  location: string;
  mapLocation?: string | null;
  distance: string;
  image: string;
  gallery: string[];
  startingPrice: number;
  sharingBed?: number;
  quadBed?: number;
  quintBed?: number;
  isContactPricing: boolean;
  priceValidFrom?: string | null;
  priceValidUntil?: string | null;
  validity: string;
  description: string;
  amenities: string[];
  rooms: HotelRoomDetail[];
}

async function getHotelData(id: string): Promise<ProcessedHotel | null> {
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
      const dbRooms: HotelRoomDetail[] = hotel.rooms.map((r) => ({
        id: r.id,
        roomType: r.roomType.trim(),
        capacity: r.capacity || 2,
        pricePerNight: Math.round(r.pricePerNight),
        hasKaabaView: Boolean(r.hasKaabaView),
      }));

      const sharingRoom = dbRooms.find((r) => r.roomType.toLowerCase().includes("sharing"));
      const standardRoom = dbRooms.find((r) =>
        r.roomType.toLowerCase().includes("quad") ||
        r.roomType.toLowerCase().includes("double") ||
        r.roomType.toLowerCase().includes("standard")
      );
      const quintRoom = dbRooms.find((r) => r.roomType.toLowerCase().includes("quint"));

      const minRoomPrice =
        dbRooms.length > 0 && dbRooms.some((r) => r.pricePerNight > 0)
          ? Math.min(...dbRooms.map((r) => r.pricePerNight).filter((p) => p > 0))
          : hotel.startingPrice;

      // Fallback default rooms if no room types configured in DB
      const finalRooms =
        dbRooms.length > 0
          ? dbRooms
          : [
              {
                roomType: "Double Room (Standard)",
                capacity: 2,
                pricePerNight: Math.round(hotel.startingPrice || 350),
                hasKaabaView: false,
              },
              {
                roomType: "Triple Room",
                capacity: 3,
                pricePerNight: Math.round((hotel.startingPrice || 350) * 1.15),
                hasKaabaView: false,
              },
              {
                roomType: "Quad Room",
                capacity: 4,
                pricePerNight: Math.round((hotel.startingPrice || 350) * 1.3),
                hasKaabaView: false,
              },
            ];

      return {
        id: hotel.slug || hotel.id,
        name: hotel.name,
        city: (hotel.city?.toLowerCase() === "madinah" ? "madinah" : "makkah") as "makkah" | "madinah",
        stars: hotel.stars || 5,
        location: hotel.address || (hotel.city?.toLowerCase() === "makkah" ? "Ibrahim Khalil Road" : "Markazia Central Area"),
        mapLocation: hotel.address,
        distance: hotel.distance || "Walking Distance",
        image: hotel.image,
        gallery: hotel.gallery || [],
        startingPrice: Math.round(hotel.startingPrice || (isFinite(minRoomPrice) ? minRoomPrice : 350)),
        sharingBed: sharingRoom ? sharingRoom.pricePerNight : undefined,
        quadBed: standardRoom ? standardRoom.pricePerNight : Math.round(hotel.startingPrice || 350),
        quintBed: quintRoom ? quintRoom.pricePerNight : undefined,
        isContactPricing: Boolean(hotel.isContactPricing),
        priceValidFrom: hotel.priceValidFrom,
        priceValidUntil: hotel.priceValidUntil,
        validity: formatHotelPriceValidity(hotel.priceValidFrom, hotel.priceValidUntil) || "Current Umrah Season",
        description:
          hotel.description ||
          `Luxury pilgrimage lodging at ${hotel.name} located conveniently in ${hotel.city}. Complete with 24/7 reception, modern ensuite amenities, and verified booking confirmation.`,
        amenities:
          Array.isArray(hotel.amenities) && hotel.amenities.length > 0
            ? hotel.amenities
            : [
                "Air-conditioned rooms with private ensuite bathrooms",
                "Daily housekeeping & clean linen supply",
                "Fast elevators & 24-hour reception desk",
                "High-speed complimentary WiFi",
                "Proximity to restaurants, grocery stores & pharmacies",
              ],
        rooms: finalRooms,
      };
    }
  } catch (error) {
    console.error("Error fetching hotel from DB:", error);
  }

  // Fallback to static dummy list
  const staticHotel = allHotels.find(
    (h) => h.id === id || h.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  if (staticHotel) {
    const staticRooms: HotelRoomDetail[] = [];
    if (staticHotel.sharingBed) {
      staticRooms.push({
        roomType: "Sharing Bed (Single Bed in Quad Room)",
        capacity: 1,
        pricePerNight: staticHotel.sharingBed,
        hasKaabaView: false,
      });
    }
    if (staticHotel.quadBed) {
      staticRooms.push({
        roomType: "Double / Triple / Quad Standard Room",
        capacity: 4,
        pricePerNight: staticHotel.quadBed,
        hasKaabaView: false,
      });
    }
    if (staticHotel.quintBed) {
      staticRooms.push({
        roomType: "Quint Room (5 Beds)",
        capacity: 5,
        pricePerNight: staticHotel.quintBed,
        hasKaabaView: false,
      });
    }

    return {
      id: staticHotel.id,
      name: staticHotel.name,
      city: staticHotel.city,
      stars: staticHotel.stars || 4,
      location: staticHotel.location,
      mapLocation: staticHotel.location,
      distance: staticHotel.distance,
      image: staticHotel.image,
      gallery: [],
      startingPrice: staticHotel.sharingBed || staticHotel.quadBed || 150,
      sharingBed: staticHotel.sharingBed || undefined,
      quadBed: staticHotel.quadBed || undefined,
      quintBed: staticHotel.quintBed || undefined,
      isContactPricing: false,
      priceValidFrom: null,
      priceValidUntil: null,
      validity: staticHotel.validity || "Current Umrah Season",
      description: staticHotel.description,
      amenities: staticHotel.amenities,
      rooms: staticRooms,
    };
  }

  return null;
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
      ? `Official rates for ${hotel.name} in ${cityName} (${hotel.location}, ${hotel.distance}). Room tariffs starting from ${hotel.startingPrice} SAR.`
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
        {/* Top Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Hotel Main Media & Quick Specs */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 shadow-sm overflow-hidden">
            <div className="relative w-full h-80 sm:h-96 bg-zinc-900">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    hotel.city === "makkah" ? "bg-[#c5a059] text-black" : "bg-emerald-600 text-white"
                  }`}
                >
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

            {/* Quick Specs Bar (matching Transport specs layout) */}
            <div className="p-6 border-t border-zinc-200">
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-zinc-200">
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Distance to Haram
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-1">
                    <FaWalking className="text-[#c5a059]" />
                    <span>{hotel.distance}</span>
                  </p>
                </div>
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Property Rating
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1 mt-1">
                    <span className="flex text-amber-400">
                      {[...Array(hotel.stars || 5)].map((_, i) => (
                        <FaStar key={i} className="text-[10px]" />
                      ))}
                    </span>
                    <span className="ml-0.5">{hotel.stars}-Star</span>
                  </p>
                </div>
                <div className="px-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {hasPrice ? "Starting From" : "Tariff Status"}
                  </span>
                  {hasPrice ? (
                    <p className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                      {hotel.startingPrice} <span className="text-xs font-normal text-zinc-500">SAR</span>
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm font-bold text-[#b58e45] mt-1">
                      Contact for Quote
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Summary & Amenities */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">
                Official Umrah Accommodation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight mt-1 mb-3">
                {hotel.name}
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                {hotel.description}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3">
                Included VIP Amenities:
              </h3>
              <ul className="space-y-2.5 mb-8">
                {hotel.amenities.map((feat, idx) => (
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
                serviceType="UMRAH_HOTEL"
                itemName={hotel.name}
                route={`${cityName} - ${hotel.location}`}
                currency="SAR"
                buttonLabel={hasPrice ? `Book ${hotel.name}` : "Request Hotel Booking"}
                whatsappUrl={waLink}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold tracking-wider uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Detailed Room Tariffs & Nightly Rate List Table (matching Transport Route Rate List) */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-zinc-200 gap-2">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-tight">
                {hasPrice
                  ? `Complete ${hotel.name} Room Tariffs & Nightly Rate List`
                  : `${hotel.name} Room Rate & Booking Inquiry`}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {hasPrice
                  ? "All room rates are fixed per night in SAR (Saudi Riyal) for the entire room/bed, including taxes and hotel service charges."
                  : "Official rates for this property are provided on request based on travel dates and room availability."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {hasPrice && hotel.validity && (
                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
                  {hotel.validity}
                </span>
              )}
              <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider border border-zinc-200">
                Currency: SAR (Saudi Riyal)
              </span>
            </div>
          </div>

          {hasPrice ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-700 border-b border-zinc-200 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Room Category / Type</th>
                    <th className="py-3 px-4 font-bold text-center">Occupancy / Capacity</th>
                    <th className="py-3 px-4 font-bold text-center">View &amp; Features</th>
                    <th className="py-3 px-4 font-bold text-right">Fixed Rate / Night</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                  {hotel.rooms.map((room, idx) => {
                    const itemWaText = encodeURIComponent(
                      `Salam Nexora Journeys, I would like to reserve "${hotel.name}" - ${room.roomType} (${room.pricePerNight} SAR / night, Capacity: ${room.capacity} Guests) in ${cityName}. Please confirm availability for my travel dates.`
                    );
                    const itemWaLink = `https://wa.me/${targetPhone}?text=${itemWaText}`;

                    return (
                      <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-zinc-900 text-sm">{room.roomType}</p>
                          <span className="text-[11px] text-zinc-400">Ensuite Bath • Clean Linens • Housekeeping</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 text-zinc-800 text-xs font-semibold">
                            <FaUserFriends className="text-[#c5a059]" />
                            <span>{room.capacity === 1 ? "1 Bed (Sharing)" : `${room.capacity} Guests`}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {room.hasKaabaView ? (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                              Kaaba / Haram View
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                              City / Standard View
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-extrabold text-zinc-950 text-base">
                            {room.pricePerNight} <span className="text-xs font-normal text-zinc-500">SAR</span>
                          </div>
                          <span className="text-[10px] text-zinc-400">Per Night</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={itemWaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4295a5] hover:bg-[#327784] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-2xs"
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
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-8 text-center space-y-4">
              <div className="max-w-xl mx-auto">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-2">
                  Pricing Upon Request
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                  Contact Us For Current {hotel.name} Tariffs
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Nightly rates for this property fluctuate with seasonal pilgrimage demand. Contact our dedicated Umrah concierge on WhatsApp for instant pricing, room availability, and custom group quotes.
                </p>
                <div className="mt-5">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-md"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Inquire Rates On WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust Guarantees (matching Transport layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3 shadow-sm">
            <FaShieldAlt className="text-2xl text-[#c5a059] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">100% Verified Hotel Booking</h4>
              <p className="text-xs text-zinc-500 mt-1">Official hotel confirmation vouchers issued directly with guaranteed 24/7 check-in reception.</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3 shadow-sm">
            <FaCheck className="text-2xl text-emerald-600 shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Transparent Fixed SAR Rates</h4>
              <p className="text-xs text-zinc-500 mt-1">Zero hidden booking commissions or surprise taxes. Transparent nightly room rates in SAR.</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 flex items-start gap-3 shadow-sm">
            <FaWhatsapp className="text-2xl text-[#25D366] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Direct WhatsApp Concierge</h4>
              <p className="text-xs text-zinc-500 mt-1">Instant voucher delivery, room preference requests, and direct Haram shuttle guidance.</p>
            </div>
          </div>
        </div>

        {/* Google Maps Location Section */}
        {mapLocation && (
          <section className="mb-12 border border-zinc-200 bg-white p-5 sm:p-7 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">Hotel Location &amp; Haram Proximity</h2>
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
                className="inline-flex items-center gap-2 bg-[#c5a059] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#b08c47] transition-colors"
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
