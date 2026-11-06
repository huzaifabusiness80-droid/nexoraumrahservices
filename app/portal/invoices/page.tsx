"use client";
import { useEffect, useState } from "react";

export default function MyInvoices() {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => { fetch("/api/portal/bookings").then(r => r.json()).then(d => setBookings(d.bookings || [])); }, []);
  return <div><h1 className="text-2xl font-bold mb-6">My Invoices</h1>{bookings.length ? <div className="overflow-x-auto border border-zinc-200 bg-white"><table className="w-full min-w-[650px] text-sm"><thead className="bg-zinc-50 border-b border-zinc-200"><tr>{["Reference","Total","Paid","Balance","Payment","Action"].map(h => <th key={h} className="text-left px-4 py-3 font-bold text-zinc-600">{h}</th>)}</tr></thead><tbody>{bookings.map(b => {const total=b.totalPrice||0,paid=b.paidAmount||0,balance=Math.max(total-paid,0);return <tr key={b.id} className="border-b border-zinc-100"><td className="px-4 py-4">{b.bookingNumber}</td><td className="px-4 py-4">{b.currency} {total.toLocaleString()}</td><td className="px-4 py-4">{b.currency} {paid.toLocaleString()}</td><td className="px-4 py-4 font-bold">{b.currency} {balance.toLocaleString()}</td><td className="px-4 py-4">{b.paymentStatus}</td><td className="px-4 py-4"><a href={`/api/portal/documents/${b.id}?type=invoice`} download className="inline-flex items-center border border-[#b38b45] px-4 py-2 font-bold text-[#9f7d3b] hover:bg-[#b38b45] hover:text-white transition-colors">Download PDF</a></td></tr>})}</tbody></table></div> : <div className="border border-zinc-200 bg-white p-8 text-sm text-zinc-500">No invoices available.</div>}</div>;
}
