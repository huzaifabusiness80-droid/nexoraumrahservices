"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm, { ServiceType } from "@/components/admin/BookingForm";
import { FaSpinner } from "react-icons/fa";

function NewBookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") as ServiceType | null;

  const validServices: ServiceType[] = [
    "UMRAH_HOTEL",
    "UMRAH_TRANSPORT",
    "UMRAH_ZIYARAT",
    "UAE_CITY_TOUR",
    "DESERT_SAFARI",
    "CAR_RENTAL",
  ];

  const defaultService =
    serviceParam && validServices.includes(serviceParam)
      ? serviceParam
      : "UMRAH_HOTEL";

  return <BookingForm defaultService={defaultService} isEdit={false} />;
}

export default function NewBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Loading booking form...
          </span>
        </div>
      }
    >
      <NewBookingContent />
    </Suspense>
  );
}
