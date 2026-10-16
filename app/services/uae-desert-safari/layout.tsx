import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Tours | Red Dune Bashing, Camel Ride & BBQ",
  description:
    "Thrilling Dubai Red Dune Desert Safari adventures. Includes 4x4 dune bashing, sandboarding, sunset camel riding, VIP majlis seating, live fire and Tanoura shows, and full 5-star BBQ dinner buffet.",
  keywords: [
    "Dubai Desert Safari",
    "Evening Desert Safari Dubai",
    "VIP Red Dune Bashing",
    "Quad Bike Desert Dubai",
    "Desert Safari with BBQ Dinner",
    "Dubai Camel Trekking",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/uae-desert-safari",
  },
  openGraph: {
    title: "Dubai Desert Safari Tours | Red Dune Bashing & BBQ | Nexora Journeys",
    description:
      "Thrilling Red Dune Safari with 4x4 dune bashing, camel trek, live shows, and BBQ dinner.",
    url: "https://nexorajourneys.com/services/uae-desert-safari",
  },
};

export default function UaeDesertSafariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
