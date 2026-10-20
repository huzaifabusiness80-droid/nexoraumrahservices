import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexorajourneys.com"),
  title: {
    default: "Nexora Journeys | Luxury VIP Umrah Transport, Hotels & Tours",
    template: "%s | Nexora Journeys",
  },
  description:
    "Official luxury private chauffeur, VIP Umrah transport across Jeddah Airport, Makkah, and Madinah, hotel bookings, sacred Ziyarat, and UAE tours. Fixed transparent SAR rates & 24/7 pilgrimage concierge.",
  keywords: [
    "Nexora Journeys",
    "Umrah Transport",
    "Jeddah Airport to Makkah Taxi",
    "Makkah to Madinah VIP Chauffeur",
    "Makkah Hotels Booking",
    "Madinah Hotels Walking Distance",
    "Umrah Ziyarat Tours",
    "GMC Yukon Umrah Chauffeur",
    "Dubai City Tours",
    "UAE Desert Safari",
    "Saudi Arabia Pilgrimage Services",
  ],
  authors: [{ name: "Nexora Journeys" }],
  creator: "Nexora Journeys",
  publisher: "Nexora Journeys",
  alternates: {
    canonical: "https://nexorajourneys.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexorajourneys.com",
    siteName: "Nexora Journeys",
    title: "Nexora Journeys | Luxury VIP Umrah Transport, Hotels & Tours",
    description:
      "Official luxury private chauffeur, VIP Umrah transport across Jeddah Airport, Makkah, and Madinah, hotel bookings, sacred Ziyarat, and UAE tours.",
    images: [
      {
        url: "/images/hero/slide-1.jpg",
        width: 1200,
        height: 630,
        alt: "Nexora Journeys VIP Pilgrimage Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Journeys | Luxury VIP Umrah Transport, Hotels & Tours",
    description:
      "Official luxury private chauffeur, VIP Umrah transport across Jeddah Airport, Makkah, and Madinah, hotel bookings, sacred Ziyarat, and UAE tours.",
    images: ["/images/hero/slide-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "d312c096c70a8a8d",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: "Nexora Journeys",
  url: "https://nexorajourneys.com",
  logo: "https://nexorajourneys.com/icon.svg",
  image: "https://nexorajourneys.com/images/hero/slide-1.jpg",
  description:
    "Premier VIP pilgrimage & tourism services across Saudi Arabia and the UAE. Private chauffeur airport transfers, Makkah & Madinah hotels, and sacred Ziyarat tours.",
  telephone: "+447882749006",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ibrahim Al Khalil Road",
    addressLocality: "Makkah",
    addressRegion: "Makkah Province",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.4225,
    longitude: 39.8262,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-900 selection:bg-black selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-764F2YT93E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-764F2YT93E');
          `}
        </Script>
      </body>
    </html>
  );
}
