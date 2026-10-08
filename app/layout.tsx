import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora Umrah Services | Luxury VIP Transportation in Makkah & Madinah",
  description:
    "Premium private chauffeur and VIP pilgrimage transportation services across Jeddah Airport, Makkah, and Madinah. Luxury fleet including Mercedes V-Class, GMC Yukon, and executive Sprinters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-900 selection:bg-black selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
