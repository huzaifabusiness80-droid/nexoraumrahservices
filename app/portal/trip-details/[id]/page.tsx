"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  useEffect(() => { fetch("/api/portal/bookings").then(r => r.json()).then(d => setBooking((d.bookings || []).find((b: any) => b.id === id) || null)); }, [id]);
  if (!booking) return <div className="py-16 text-sm text-zinc-500">Loading trip details...</div>;
  const rows = [
    ["Booking reference", booking.bookingNumber],
    ["Service", booking.serviceType.replaceAll("_", " ")],
    ["Hotel / item", booking.itemName || "-"],
    ["Route", booking.route || "-"],
    ["Pickup location", booking.pickupLocation || "-"],
    ["Drop-off location", booking.dropoffLocation || "-"],
    ["Travel date", booking.pickupDate ? new Date(booking.pickupDate).toLocaleString() : "To be confirmed"],
    ["Return date", booking.returnDate ? new Date(booking.returnDate).toLocaleString() : "-"],
    ["Passengers", booking.passengers],
    ["Luggage", booking.luggageCount || "-"],
    ["Booking status", booking.status],
    ["Payment status", booking.paymentStatus],
  ];
  return <div><h1 className="text-2xl font-bold mb-6">Trip Details</h1><div className="border border-zinc-200 bg-white"><div className="divide-y divide-zinc-100">{rows.map(([label, value]) => <div key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4 text-sm"><p className="text-zinc-500">{label}</p><p className="sm:col-span-2 font-semibold">{value}</p></div>)}</div></div></div>;
}
