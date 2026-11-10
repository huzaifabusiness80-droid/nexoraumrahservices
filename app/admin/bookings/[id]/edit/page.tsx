"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/admin/BookingForm";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

export default function EditBookingPage() {
  const params = useParams();
  const id = params?.id as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/admin/bookings/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Booking not found");
        }
        setBooking(data.booking);
      } catch (err: any) {
        setError(err?.message || "Failed to load booking details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Loading reservation for editing...
        </span>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500 space-y-3">
        <p className="text-sm font-bold text-red-600">{error || "Booking not found."}</p>
        <div>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to bookings</span>
          </Link>
        </div>
      </div>
    );
  }

  return <BookingForm initialData={booking} isEdit={true} />;
}

