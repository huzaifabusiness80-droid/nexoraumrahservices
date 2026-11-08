"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaSearch,
  FaSpinner,
  FaTrash,
  FaUserCircle,
  FaWhatsapp,
  FaFileInvoiceDollar,
} from "react-icons/fa";

interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    bookings: number;
    inquiries: number;
  };
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) setClients(data.clients || []);
      if (!res.ok) alert(data.error || "Failed to load clients");
    } catch {
      alert("Unable to load registered clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filtered = clients.filter((client) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      (client.phone || "").toLowerCase().includes(term) ||
      (client.country || "").toLowerCase().includes(term)
    );
  });

  const deleteClient = async (client: ClientUser) => {
    if (!confirm(`Delete registered client "${client.name}"? This cannot be undone.`)) return;
    setDeletingId(client.id);
    try {
      const res = await fetch(`/api/admin/clients/${client.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to delete client");
        return;
      }
      setClients((current) => current.filter((item) => item.id !== client.id));
    } catch {
      alert("Unable to delete client");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Registered Clients
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            All users who created a Client Portal account
          </p>
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Total: <span className="text-[#c5a059]">{clients.length}</span>
        </div>
      </div>

      <div className="relative">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search clients by name, email, phone, or country..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059]"
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Loading clients...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FaUserCircle className="text-3xl mx-auto mb-2 text-zinc-300" />
            <p className="text-xs text-zinc-500">No registered clients found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Activity</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.map((client) => {
                  const phone = (client.phone || "").replace(/[^0-9]/g, "");
                  return (
                    <tr key={client.id} className="hover:bg-zinc-50/60">
                      <td className="py-4 px-4">
                        <p className="font-bold text-zinc-900">{client.name}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{client.id}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 text-zinc-700 hover:text-[#c5a059]">
                            <FaEnvelope className="text-[10px]" />
                            {client.email}
                          </a>
                          {client.phone && (
                            <span className="flex items-center gap-1.5 text-zinc-500">
                              <FaPhone className="text-[10px]" />
                              {client.phone}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-600">{client.country || "—"}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                            {client._count.bookings} Bookings
                          </span>
                          <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-[10px] font-bold">
                            {client._count.inquiries} Inquiries
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-500 whitespace-nowrap">
                        {new Date(client.createdAt).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/clients/${client.id}/statement`}
                            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#faf6ed] text-[#9f7d3b] border border-[#e8dcbf] hover:bg-[#f2e8ce] font-bold"
                          >
                            <FaFileInvoiceDollar />
                            Statement
                          </Link>
                          {phone && (
                            <a
                              href={`https://wa.me/${phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100"
                              aria-label={`WhatsApp ${client.name}`}
                            >
                              <FaWhatsapp />
                            </a>
                          )}
                          <button
                            onClick={() => deleteClient(client)}
                            disabled={deletingId === client.id}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                            aria-label={`Delete ${client.name}`}
                          >
                            {deletingId === client.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
