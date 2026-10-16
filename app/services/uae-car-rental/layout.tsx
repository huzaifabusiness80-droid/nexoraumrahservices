import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury & Economy Car Rental Dubai & UAE | Self-Drive & Chauffeur",
  description:
    "Rent premium and economy vehicles across Dubai and UAE with zero hidden charges. Nissan Patrol, Range Rover, Toyota Camry, Hyundai Elantra, and 7-seater family SUVs with comprehensive insurance and free delivery.",
  keywords: [
    "Car Rental Dubai",
    "Rent Nissan Patrol Dubai",
    "Luxury Car Rental UAE",
    "Monthly Car Rental Dubai",
    "Self Drive Car Rental Dubai",
    "Dubai Airport Car Hire",
  ],
  alternates: {
    canonical: "https://nexorajourneys.com/services/uae-car-rental",
  },
  openGraph: {
    title: "Luxury & Economy Car Rental Dubai & UAE | Nexora Journeys",
    description:
      "Rent premium and economy vehicles across Dubai and UAE with comprehensive insurance and instant delivery.",
    url: "https://nexorajourneys.com/services/uae-car-rental",
  },
};

export default function UaeCarRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
