import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dubai & Abu Dhabi City Tours | Private Sightseeing & Chauffeur",
  description:
    "Private full-day and half-day sightseeing tours of Dubai and Abu Dhabi. Visit Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque, and Presidential Palace in air-conditioned comfort.",
  keywords: [
    "Dubai City Tour",
    "Abu Dhabi City Tour",
    "Burj Khalifa Tour",
    "Sheikh Zayed Grand Mosque Tour",
    "Private Chauffeur Tour Dubai",
    "Dubai Sightseeing Packages",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/uae-city-tours",
  },
  openGraph: {
    title: "Dubai & Abu Dhabi City Tours | Private Sightseeing | Nexora Journeys",
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
