import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import HomeTransportSection from "@/components/HomeTransportSection";
import HomeHotelsSection from "@/components/HomeHotelsSection";
import HomeZiyaratSection from "@/components/HomeZiyaratSection";
import HomeUaeToursSection from "@/components/HomeUaeToursSection";
import HomeCarRentalSection from "@/components/HomeCarRentalSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeReviewsSection from "@/components/HomeReviewsSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Carousel Banner */}
        <HeroCarousel />

        {/* 2. What We Offer (Bento Grid Overview) */}
        <div id="services">
          <WhatWeOfferSection />
        </div>

        {/* 3. Umrah Transport Fleet Showcase */}
        <HomeTransportSection />

        {/* 4. Umrah Hotels Tariff Showcase */}
        <HomeHotelsSection />

        {/* 5. Umrah Ziyarat Sanctuary Tours Showcase */}
        <HomeZiyaratSection />

        {/* 6. UAE City Tours & Desert Safari Showcase */}
        <HomeUaeToursSection />

        {/* 7. UAE Car Rental Fleet Showcase */}
        <HomeCarRentalSection />

        {/* 8. About the Company Overview */}
        <div id="about">
          <HomeAboutSection />
        </div>

        {/* 9. Verified Pilgrim Testimonials */}
        <HomeReviewsSection />

        {/* 10. Frequently Asked Questions */}
        <HomeFaqSection />
      </main>

      <Footer />
    </div>
  );
}
