"use client";
import { useEffect, useState } from "react";

export default function MyInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/portal/inquiries")
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setInquiries(data.inquiries || []))
      .catch(() => window.location.replace("/portal/login"))
      .finally(() => setLoading(false));
  }, []);
  return <div><h1 className="text-2xl font-bold mb-6">My Inquiries</h1>{loading ? <div className="py-8 text-sm text-zinc-500">Loading inquiries...</div> : inquiries.length ? <div className="space-y-3">{inquiries.map((item) => <article key={item.id} className="border border-zinc-200 bg-white p-5"><div className="flex flex-col sm:flex-row sm:justify-between gap-2"><div><p className="font-bold">{item.subject || item.service || "Website inquiry"}</p><p className="text-xs text-zinc-500 mt-1">{new Date(item.createdAt).toLocaleString()}</p></div><span className="self-start border border-zinc-300 px-3 py-1 text-xs font-bold">{item.status}</span></div><p className="text-sm text-zinc-600 mt-4 whitespace-pre-wrap">{item.message}</p></article>)}</div> : <div className="border border-zinc-200 bg-white p-8 text-sm text-zinc-500">You have no inquiries linked to this account.</div>}</div>;
}
