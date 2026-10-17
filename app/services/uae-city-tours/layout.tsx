import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travels & Tourism in Dubai, Abu Dhabi & Sharjah | Nexora Journeys",
  description:
    "Private full-day and half-day sightseeing tours of Dubai and Abu Dhabi. Visit Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque, and Presidential Palace in air-conditioned comfort.",
  keywords: [
    "Tours and Tourism Dubai",
    "Dubai City Sightseeing",
    "Abu Dhabi Private Tours",
    "Sharjah Cultural Tours",
    "UAE Family Excursions",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/uae-city-tours",
  },
  openGraph: {
    title: "Travels & Tourism in Dubai, Abu Dhabi & Sharjah | Nexora Journeys",
    description:
      "Private sightseeing tours of Dubai and Abu Dhabi with dedicated chauffeur, hotel pickup, and custom photo stops.",
    url: "https://nexorajourneys.com/services/uae-city-tours",
  },
};

export default function UaeCityToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
