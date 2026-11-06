"use client";

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaWhatsapp,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";

interface Inquiry {
  id: string;
  clientId?: string | null;
  name: string;
  email: string;
  phone: string;
  service?: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete inquiry message from "${name}"?`)) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Client Inquiries & Contact Leads
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Incoming direct contact queries from prospective Umrah pilgrims and UAE visitors
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by client name, email, phone number, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 focus:outline-none focus:border-[#c5a059] cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="NEW">New Leads</option>
          <option value="CONTACTED">Contacted</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {/* Inquiries List */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Loading inquiries...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-500">
            No incoming contact inquiries found.
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {filtered.map((item) => {
              const cleanPhone = item.phone.replace(/[^0-9]/g, "");
              return (
                <div key={item.id} className="p-5 sm:p-6 hover:bg-zinc-50/50 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-zinc-900">{item.name}</span>
                      {item.clientId && (
                        <span className="px-2 py-0.5 rounded bg-[#faf6ed] text-[9px] font-bold uppercase tracking-wider text-[#9f7d3b]">
                          Portal Linked
                        </span>
                      )}
                      {item.service && (
                        <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                          {item.service}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "RESOLVED"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "CONTACTED"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Message body */}
                  <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-100 text-xs text-zinc-700 leading-relaxed font-sans">
                    {item.subject && (
                      <p className="font-bold text-zinc-900 mb-1">Subject: {item.subject}</p>
                    )}
                    <p className="whitespace-pre-wrap">{item.message}</p>
                  </div>

                  {/* Actions & Contact */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold"
                        >
                          <FaWhatsapp className="text-xs" />
                          <span>{item.phone}</span>
                        </a>
                      )}
                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded text-xs text-zinc-800"
                        >
                          <FaEnvelope className="text-[10px] text-zinc-500" />
                          <span>{item.email}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status !== "CONTACTED" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, "CONTACTED")}
                          disabled={updatingId === item.id}
                          className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {item.status !== "RESOLVED" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, "RESOLVED")}
                          disabled={updatingId === item.id}
                          className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                        >
                          Mark Resolved
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={updatingId === item.id}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Delete Inquiry"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
