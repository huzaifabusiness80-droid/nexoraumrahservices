import { Metadata } from "next";
import TermsPage from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexora Journeys",
  description:
    "Nexora Journeys Privacy Policy. Learn how we safeguard your personal information, travel reservations, and contact details with strict confidentiality.",
  alternates: {
    canonical: "https://nexorajourneys.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <TermsPage />;
}
