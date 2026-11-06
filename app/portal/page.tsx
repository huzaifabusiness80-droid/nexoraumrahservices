"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PortalDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/portal/dashboard")
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || "Unable to load your portal");
        return body;
      })
      .then(setData)
      .catch((err) => {
        if (err.message === "Unauthorized") window.location.replace("/portal/login");
        else setError(err.message || "Unable to load your portal");
      })
      .finally(() => setLoading(false));
  }, []);
  const money = (n: number, currency = "SAR") => `${currency} ${Number(n || 0).toLocaleString()}`;
  if (loading) return <div className="py-16 text-sm text-zinc-500">Loading your portal...</div>;
  if (error || !data?.summary || !data?.user) return <div className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error || "Your portal data is unavailable."}</div>;
  const cards = [
    ["Total Bookings", data.summary.totalBookings],
    ["Confirmed", data.summary.confirmedBookings],
    ["Total Amount", money(data.summary.totalAmount)],
    ["Remaining Balance", money(data.summary.balance)],
    ["My Inquiries", data.summary.inquiryCount || 0],
  ];
  return <div><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b38b45]">Client Portal</p><h1 className="text-2xl md:text-3xl font-bold mt-2">Welcome, {data.user.name}</h1><p className="text-sm text-zinc-500 mt-1">Here is your Nexora Journeys travel summary.</p></div>{data.upcoming && <section className="mb-6 border border-[#dfd0ad] bg-[#fffdf7] p-5 md:p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#9f7d3b]">Upcoming Trip</p><div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4"><div><h2 className="text-xl font-bold">{data.upcoming.itemName || data.upcoming.route || data.upcoming.serviceType.replaceAll("_", " ")}</h2><p className="text-sm text-zinc-600 mt-1">{data.upcoming.pickupLocation || "Destination"} · {data.upcoming.pickupDate ? new Date(data.upcoming.pickupDate).toLocaleDateString() : "Date to be confirmed"}</p></div><Link href={`/portal/trip-details/${data.upcoming.id}`} className="text-sm font-bold text-zinc-900 border-b border-zinc-900 self-start md:self-auto">View trip details</Link></div></section>}<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">{cards.map(([label, value]) => <div key={String(label)} className="border border-zinc-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</p><p className="text-xl font-bold mt-3">{value}</p></div>)}</div><div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"><Link href="/portal/bookings" className="border border-zinc-200 bg-white p-5 hover:border-[#c5a059]"><p className="font-bold">My Bookings</p><p className="text-sm text-zinc-500 mt-1">Review all your bookings and status.</p></Link><Link href="/portal/inquiries" className="border border-zinc-200 bg-white p-5 hover:border-[#c5a059]"><p className="font-bold">My Inquiries</p><p className="text-sm text-zinc-500 mt-1">Review questions sent to the agency.</p></Link><Link href="/portal/support" className="border border-zinc-200 bg-white p-5 hover:border-[#c5a059]"><p className="font-bold">Need assistance?</p><p className="text-sm text-zinc-500 mt-1">Contact our support team.</p></Link></div></div>;
}
