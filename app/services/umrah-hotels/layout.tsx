import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Makkah & Madinah Hotels Booking | Haram View & Budget Rates",
  description:
    "Book verified 3-Star, 4-Star, and 5-Star luxury hotels in Makkah & Madinah. Walking distance to Masjid Al-Haram and Masjid Al-Nabawi with Kaaba views and 24/7 complimentary shuttle. Fixed SAR pricing.",
  keywords: [
    "Makkah Hotels Booking",
    "Madinah Hotels Walking Distance",
    "Haram View Hotels Makkah",
    "Swissotel Makkah",
    "Pullman Zamzam Makkah",
    "Clock Tower Hotels Makkah",
    "Budget Umrah Hotels",
    "Sharing Bed Makkah SAR",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/umrah-hotels",
  },
  openGraph: {
    title: "Makkah & Madinah Hotels Booking | Haram View & Budget Rates | Nexora Journeys",
    description:
      "Book verified 3-Star, 4-Star, and 5-Star luxury hotels in Makkah & Madinah. Walking distance to Haram, Kaaba views, and 24/7 shuttle service.",
    url: "https://nexorajourneys.com/services/umrah-hotels",
  },
};

export default function UmrahHotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
