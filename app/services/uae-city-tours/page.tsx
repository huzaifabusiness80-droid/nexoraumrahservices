import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaCheck, FaClock, FaCar, FaCamera, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "UAE City Tours | Private Dubai & Abu Dhabi Sightseeing | Nexora Journeys",
  description:
    "Experience private luxury sightseeing tours across Dubai and Abu Dhabi. Visit Burj Khalifa, Palm Jumeirah, and Sheikh Zayed Grand Mosque with dedicated chauffeurs and customizable itineraries from 250 AED.",
  keywords: [
    "Dubai City Tour Private Car",
    "Abu Dhabi Full Day Tour",
    "Sheikh Zayed Mosque Chauffeur Tour",
    "Dubai Sightseeing Package",
    "UAE Luxury Tours Nexora Journeys"
  ],
};

export default function UaeCityToursPage() {
  const targetPhone = "923158494785";

  const tourPackages = [
    {
      id: "dubai-half-day",
      title: "Dubai Half-Day Modern Highlights",
      duration: "4 - 5 Hours",
      priceAed: 250,
      image: "/images/hero/slide-2.jpg",
      description: "Ideal introductory tour of iconic Dubai landmarks with memorable photo stops at Burj Al Arab, Palm Jumeirah, Dubai Marina, and Downtown.",
      stops: [
        "Dubai Marina Walk & Yacht Lagoon",
        "Palm Jumeirah & The Pointe (Atlantis view)",
        "Burj Al Arab shoreline photo point",
        "Jumeirah Mosque exterior view",
        "Downtown Dubai & Dubai Mall"
      ]
    },
    {
      id: "dubai-full-day",
      title: "Dubai Full-Day Heritage & Modern Tour",
      duration: "8 - 9 Hours",
      priceAed: 450,
      image: "/images/hero/slide-1.jpg",
      description: "Complete immersion combining old-world historical charm with the futuristic architectural wonder of modern Dubai.",
      stops: [
        "Al Fahidi Historical Fort & Bastakiya Quarter",
        "Traditional Wooden Abra Boat ride across Dubai Creek",
        "Gold Souk & Authentic Spice Souk shopping",
        "Dubai Frame & Zabeel Palace drive-through",
        "Burj Khalifa & Dubai Fountain Boardwalk"
      ]
    },
    {
      id: "abu-dhabi-full-day",
      title: "Abu Dhabi Capital Heritage & Grand Mosque",
      duration: "9 - 10 Hours",
      priceAed: 600,
      image: "/images/hero/slide-3.jpg",
      description: "A majestic private day tour from Dubai to the UAE capital featuring the world's most magnificent architectural wonder.",
      stops: [
        "Sheikh Zayed Grand Mosque (Full interior visit)",
        "Abu Dhabi Corniche Waterfront promenade",
        "Emirates Palace & Presidential Palace (Qasr Al Watan view)",
        "Heritage Village traditional craft market",
        "Yas Island (Ferrari World & Warner Bros photo point)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      <Header />

      {/* Top Banner */}
      <section className="relative w-full bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/hero/slide-2.jpg"
            alt="UAE City Tours"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#c5a059] text-black text-[11px] font-bold uppercase tracking-widest mb-3">
            Private Chauffeur Excursions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            UAE City Tours &amp; Sightseeing
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover the iconic landmarks of Dubai and Abu Dhabi in air-conditioned private comfort with dedicated English-speaking chauffeurs.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight">
            Curated Sightseeing Packages
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            All tours include private vehicle, certified driver, fuel, parking fees, and door-to-door hotel transfers in Dubai.
          </p>
        </div>

        {/* 3 Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tourPackages.map((pkg) => {
            const waText = encodeURIComponent(
              `Salam Nexora Journeys, I am interested in booking the "${pkg.title}" (${pkg.priceAed} AED). Please provide availability for my dates.`
            );
            const waLink = `https://wa.me/${targetPhone}?text=${waText}`;

            return (
              <div
                key={pkg.id}
                className="bg-white border border-zinc-200 hover:border-[#c5a059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-60 bg-zinc-900">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/80 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/10 uppercase">
                        <FaClock className="text-[#c5a059]" /> {pkg.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#c5a059] text-white px-3.5 py-1.5 font-black text-sm uppercase shadow-md">
                      From {pkg.priceAed} AED
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-zinc-900 uppercase tracking-tight mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-5">
                      {pkg.description}
                    </p>

                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 mb-3 pb-1 border-b border-zinc-100">
                      Included Highlights:
                    </h4>
                    <ul className="space-y-2 mb-6 text-xs text-zinc-700">
                      {pkg.stops.map((stop, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <FaCheck className="text-[#c5a059] shrink-0 text-xs mt-0.5" />
                          <span>{stop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <Link
                    href={`/tours/${pkg.id}`}
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.16em] uppercase text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>View Details</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
