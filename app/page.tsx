import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import FleetSection from "@/components/FleetSection";
import VehicleTypeSection from "@/components/VehicleTypeSection";
import BookTripSection from "@/components/BookTripSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TransportBookingBanner from "@/components/TransportBookingBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        <HeroCarousel />
        <FleetSection />
        <VehicleTypeSection />
        <BookTripSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <TransportBookingBanner />
      </main>

      <Footer />
    </div>
  );
}
