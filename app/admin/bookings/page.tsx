"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaCalendarCheck,
  FaEye,
  FaTrash,
  FaSpinner,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

interface Booking {
  id: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCountry?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  returnDate?: string;
  passengers: number;
  itemName?: string;
  route?: string;
  totalPrice?: number;
  currency: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const SERVICE_LABELS: Record<string, string> = {
  UMRAH_TRANSPORT: "Umrah Transport",
  UMRAH_HOTEL: "Umrah Hotel",
  UMRAH_ZIYARAT: "Umrah Ziyarat",
  UAE_CITY_TOUR: "UAE City Tour",
  DESERT_SAFARI: "Desert Safari",
  UAE_CAR_RENTAL: "Car Rental",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete reservation for "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(data.error || "Failed to delete booking");
      }
    } catch (err) {
      alert("Error deleting booking");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesService = serviceFilter === "ALL" || b.serviceType === serviceFilter;
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone.includes(search) ||
      b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (b.itemName && b.itemName.toLowerCase().includes(search.toLowerCase())) ||
      (b.route && b.route.toLowerCase().includes(search.toLowerCase()));

    return matchesService && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Client Reservations & Bookings
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time inquiries and verified bookings across all 6 services with status controls
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings by customer name, phone, email, or vehicle..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 focus:outline-none focus:border-[#c5a059] cursor-pointer"
          >
            <option value="ALL">All Services</option>
            <option value="UMRAH_TRANSPORT">Umrah Transport</option>
            <option value="UMRAH_HOTEL">Umrah Hotels</option>
            <option value="UMRAH_ZIYARAT">Umrah Ziyarat</option>
            <option value="UAE_CITY_TOUR">UAE City Tours</option>
            <option value="DESERT_SAFARI">Desert Safari</option>
            <option value="UAE_CAR_RENTAL">UAE Car Rental</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 focus:outline-none focus:border-[#c5a059] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Loading client bookings...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-500">
            No reservations found matching the current search / filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Details / Route</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-zinc-900 leading-tight">{b.customerName}</p>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <FaPhoneAlt className="text-[9px] text-[#c5a059]" />
                          {b.customerPhone}
                        </span>
                        {b.customerEmail && (
                          <span className="flex items-center gap-1">
                            <FaEnvelope className="text-[9px] text-zinc-400" />
                            {b.customerEmail}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                        {SERVICE_LABELS[b.serviceType] || b.serviceType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-zinc-800">{b.itemName || b.route || "Custom Inquiry"}</p>
                      {b.pickupLocation && (
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          From: {b.pickupLocation} {b.dropoffLocation ? `→ ${b.dropoffLocation}` : ""}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-zinc-600 font-mono text-[11px]">
                      {b.pickupDate ? new Date(b.pickupDate).toLocaleDateString() : "Flexible"}
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {b.totalPrice ? (
                        <span>
                          {b.totalPrice} <span className="text-[10px] text-zinc-500 font-normal">{b.currency}</span>
                        </span>
                      ) : (
                        <span className="text-zinc-400 font-normal">TBD</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
                          title="View Full Booking"
                        >
                          <FaEye className="text-xs" />
                          <span>View</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(b.id, b.customerName)}
                          disabled={deletingId === b.id}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete Booking"
                        >
                          {deletingId === b.id ? (
                            <FaSpinner className="animate-spin text-xs" />
                          ) : (
                            <FaTrash className="text-xs" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
