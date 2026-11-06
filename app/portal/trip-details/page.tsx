"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TripDetailsIndex() {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => { fetch("/api/portal/bookings").then(r => r.json()).then(d => setBookings(d.bookings || [])); }, []);
  return <div><h1 className="text-2xl font-bold mb-6">Trip Details</h1>{bookings.length ? <div className="space-y-3">{bookings.map(b => <Link key={b.id} href={`/portal/trip-details/${b.id}`} className="block border border-zinc-200 bg-white p-5 hover:border-[#c5a059]"><p className="font-bold">{b.itemName || b.route || b.serviceType.replaceAll("_", " ")}</p><p className="text-sm text-zinc-500 mt-1">{b.pickupDate ? new Date(b.pickupDate).toLocaleDateString() : "Date to be confirmed"}</p></Link>)}</div> : <div className="border border-zinc-200 bg-white p-8 text-sm text-zinc-500">No trip details available.</div>}</div>;
}
