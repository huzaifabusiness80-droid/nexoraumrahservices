"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => { fetch("/api/portal/bookings").then(r => r.json()).then(d => setBookings(d.bookings || [])); }, []);
  return <div><h1 className="text-2xl font-bold mb-6">My Bookings</h1>{bookings.length === 0 ? <div className="border border-zinc-200 bg-white p-8 text-sm text-zinc-500">No bookings found under this account.</div> : <div className="space-y-3">{bookings.map(b => <Link href={`/portal/trip-details/${b.id}`} key={b.id} className="block border border-zinc-200 bg-white p-5 hover:border-[#c5a059]"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><p className="text-xs text-zinc-500">{b.bookingNumber}</p><h2 className="font-bold mt-1">{b.itemName || b.route || b.serviceType.replaceAll("_", " ")}</h2><p className="text-sm text-zinc-500 mt-1">{b.pickupDate ? new Date(b.pickupDate).toLocaleDateString() : "Date to be confirmed"} · {b.passengers} passenger(s)</p></div><div className="text-left md:text-right"><span className="inline-block border border-zinc-300 px-3 py-1 text-xs font-bold">{b.status}</span><p className="text-sm font-bold mt-2">{b.currency} {(b.totalPrice || 0).toLocaleString()}</p></div></div></Link>)}</div>}</div>;
}
