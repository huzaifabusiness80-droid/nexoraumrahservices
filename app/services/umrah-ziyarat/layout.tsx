import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Umrah Ziyarat Tours | Makkah, Madinah & Badar Historic Sites",
  description:
    "Explore blessed Islamic landmarks in Makkah and Madinah with experienced multilingual chauffeurs. Cave Hira, Jabal Thowr, Mina, Arafat, Masjid Quba, Mount Uhud, and Battle of Badar.",
  keywords: [
    "Makkah Ziyarat Tour",
    "Madinah Ziyarat Taxi",
    "Cave Hira Visit",
    "Jabal Thowr Tour",
    "Masjid Quba Chauffeur",
    "Mount Uhud Tour",
    "Battle of Badar Excursion",
    "Umrah Historical Sites",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/umrah-ziyarat",
  },
  openGraph: {
    title: "Sacred Umrah Ziyarat Tours | Makkah, Madinah & Badar | Nexora Journeys",
    description:
      "Explore blessed Islamic landmarks in Makkah and Madinah with experienced multilingual chauffeurs. Transparent rates in SAR.",
    url: "https://nexorajourneys.com/services/umrah-ziyarat",
  },
};

export default function UmrahZiyaratLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
