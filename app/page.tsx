import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import OurServicesSection from "@/components/OurServicesSection";
import HomeCtaSection from "@/components/HomeCtaSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeReviewsSection from "@/components/HomeReviewsSection";
import LatestBlogsSection from "@/components/blog/LatestBlogsSection";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* 1. Header */}
      <Header />

      <main className="flex-1 w-full flex flex-col">
        {/* 2. Hero Section */}
        <HeroCarousel />

        {/* 3. Our Services */}
        <div id="services">
          <OurServicesSection />
        </div>

        {/* 4. Call To Action Banner (Above About Section) */}
        <HomeCtaSection />

        {/* 5. About Us / Our Company */}
        <div id="about">
          <HomeAboutSection />
        </div>

        {/* 6. What Our Customers Say (Single Line Animated Marquee) */}
        <HomeReviewsSection />

        {/* 7. Latest travel guides */}
        <Suspense fallback={null}>
          <LatestBlogsSection />
        </Suspense>
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
