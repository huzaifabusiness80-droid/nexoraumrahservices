"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaWhatsapp,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaCar,
  FaHotel,
  FaMosque,
  FaCompass,
  FaCampground,
  FaKey,
  FaPlus,
  FaBed,
} from "react-icons/fa";

interface HotelRoom {
  id: string;
  roomNumber: number;
  bedType: string;
}

interface Booking {
  id: string;
  bookingNumber?: string;
  clientId?: string | null;
  client?: { id: string; name: string; email: string } | null;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  customerCountry?: string | null;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  pickupDate?: string | null;
  returnDate?: string | null;
  passengers: number;
  bedsRequired?: number | null;
  luggageCount?: number | null;
  preferredTime?: string | null;
  itemName?: string | null;
  itemCategory?: string | null;
  route?: string | null;
  totalPrice?: number | null;
  currency: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  hotelRooms?: HotelRoom[];
}

const SERVICE_META: Record<
  string,
  { label: string; actionLabel: string; icon: any; color: string; bg: string }
> = {
  UMRAH_HOTEL: {
    label: "Umrah Hotels",
    actionLabel: "Add Hotel Booking",
    icon: FaHotel,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  UMRAH_TRANSPORT: {
    label: "Umrah Transport",
    actionLabel: "Add Transport Booking",
    icon: FaCar,
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  UMRAH_ZIYARAT: {
    label: "Umrah Ziyarat",
    actionLabel: "Add Ziyarat Booking",
    icon: FaMosque,
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  UAE_CITY_TOUR: {
    label: "UAE City Tours",
    actionLabel: "Add City Tour Booking",
    icon: FaCompass,
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  DESERT_SAFARI: {
    label: "Desert Safari",
    actionLabel: "Add Safari Booking",
    icon: FaCampground,
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
  CAR_RENTAL: {
    label: "Car Rental",
    actionLabel: "Add Car Rental Booking",
    icon: FaKey,
    color: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
  },
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
    if (!confirm(`Are you sure you want to permanently delete booking for "${name}"?`)) return;
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
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      b.customerName.toLowerCase().includes(searchLower) ||
      b.customerPhone.includes(search) ||
      (b.customerEmail && b.customerEmail.toLowerCase().includes(searchLower)) ||
      (b.itemName && b.itemName.toLowerCase().includes(searchLower)) ||
      (b.route && b.route.toLowerCase().includes(searchLower)) ||
      (b.bookingNumber && b.bookingNumber.toLowerCase().includes(searchLower));

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

  // Service counts
  const serviceCounts: Record<string, number> = {
    ALL: bookings.length,
    UMRAH_HOTEL: bookings.filter((b) => b.serviceType === "UMRAH_HOTEL").length,
    UMRAH_TRANSPORT: bookings.filter((b) => b.serviceType === "UMRAH_TRANSPORT").length,
    UMRAH_ZIYARAT: bookings.filter((b) => b.serviceType === "UMRAH_ZIYARAT").length,
    UAE_CITY_TOUR: bookings.filter((b) => b.serviceType === "UAE_CITY_TOUR").length,
    DESERT_SAFARI: bookings.filter((b) => b.serviceType === "DESERT_SAFARI").length,
    CAR_RENTAL: bookings.filter((b) => b.serviceType === "CAR_RENTAL").length,
  };

  const activeServiceMeta = serviceFilter !== "ALL" ? SERVICE_META[serviceFilter] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-wide">
            Reservations & Bookings
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Service-specific reservations, room allocations, tailored vouchers, and billing
          </p>
        </div>

        {/* 
          IMPORTANT: As requested by user:
          "agall services main se add booking ka button hatao oaky ager kisi or service main jata hun to add krta hun to us main create pr baki services ke boxes nahi dekhe okay just us ke dekhen okay"
          When serviceFilter === "ALL", NO button appears.
          When a specific service is selected, the dedicated "+ Add [Service] Booking" button appears!
        */}
        {activeServiceMeta && (
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/bookings/new?service=${serviceFilter}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#c5a059] hover:bg-[#b08d4b] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <FaPlus className="text-[10px]" />
              <span>{activeServiceMeta.actionLabel}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Service Selection Tabs (Alag Alag Services) */}
      <div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setServiceFilter("ALL")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              serviceFilter === "ALL"
                ? "bg-zinc-900 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            All Services ({serviceCounts.ALL})
          </button>

          {Object.entries(SERVICE_META).map(([key, meta]) => {
            const Icon = meta.icon;
            const count = serviceCounts[key] || 0;
            const isSelected = serviceFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setServiceFilter(key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#c5a059] text-white shadow-xs"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:border-[#c5a059]"
                }`}
              >
                <Icon className={isSelected ? "text-white" : meta.color} />
                <span>{meta.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-black/20 text-white" : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, email, booking reference, hotel, or vehicle..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 focus:outline-none focus:border-[#c5a059] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Loading bookings...
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
                <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3 px-4">Ref & Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Service Details & Rooms</th>
                  <th className="py-3 px-4">Date / Timing</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filtered.map((b) => {
                  const meta = SERVICE_META[b.serviceType] || {
                    label: b.serviceType,
                    icon: FaCar,
                    color: "text-zinc-600",
                    bg: "bg-zinc-100 border-zinc-200",
                  };
                  const Icon = meta.icon;

                  return (
                    <tr key={b.id} className="hover:bg-zinc-50/70 transition-colors">
                      {/* 1. Client & Reference */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] font-bold text-zinc-400 block">
                          #{b.bookingNumber?.slice(-6).toUpperCase() || b.id.slice(-6).toUpperCase()}
                        </span>
                        <p className="font-bold text-zinc-900 text-xs mt-0.5">{b.customerName}</p>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                          <a
                            href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 font-mono hover:text-emerald-700 font-semibold text-[10px]"
                          >
                            <FaWhatsapp className="text-[10px] text-emerald-600" />
                            {b.customerPhone}
                          </a>
                          {b.customerEmail && (
                            <span className="flex items-center gap-1 text-zinc-400 truncate max-w-[130px] text-[10px]">
                              <FaEnvelope className="text-[9px]" />
                              {b.customerEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 2. Service Type */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${meta.bg} ${meta.color}`}
                        >
                          <Icon className="text-[10px]" />
                          <span>{meta.label}</span>
                        </span>
                      </td>

                      {/* 3. Details & Hotel Rooms */}
                      <td className="py-3 px-4 max-w-[280px]">
                        <p className="font-bold text-zinc-800 truncate text-xs">
                          {b.itemName || b.route || "Custom Request"}
                        </p>

                        {/* For Umrah Hotels: show room allocations */}
                        {b.serviceType === "UMRAH_HOTEL" && (
                          <div className="mt-1 space-y-1">
                            {b.hotelRooms && b.hotelRooms.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {b.hotelRooms.map((r, idx) => (
                                  <span
                                    key={r.id || idx}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded"
                                  >
                                    <FaBed className="text-[8px]" />
                                    <span>
                                      R{r.roomNumber}: {r.bedType}
                                    </span>
                                  </span>
                                ))}
                              </div>
                            ) : b.bedsRequired ? (
                              <p className="text-[10px] text-zinc-500">
                                Beds required: {b.bedsRequired}
                              </p>
                            ) : null}
                            <p className="text-[10px] text-zinc-400">
                              Guests: {b.passengers}
                              {b.pickupLocation ? ` • City: ${b.pickupLocation}` : ""}
                            </p>
                          </div>
                        )}

                        {/* For Transport / Ziyarat / Tours: show details */}
                        {b.serviceType !== "UMRAH_HOTEL" && (
                          <div className="text-[10px] text-zinc-500 mt-0.5">
                            {b.pickupLocation && (
                              <p className="truncate">
                                <span className="text-zinc-400">From:</span> {b.pickupLocation}{" "}
                                {b.dropoffLocation ? `→ ${b.dropoffLocation}` : ""}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-zinc-400 mt-0.5">
                              <span>Pax: {b.passengers}</span>
                              {b.luggageCount !== null && b.luggageCount !== undefined && (
                                <span>• Bags: {b.luggageCount}</span>
                              )}
                              {b.preferredTime && <span>• Time: {b.preferredTime}</span>}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* 4. Date */}
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-700">
                        {b.pickupDate ? (
                          <div>
                            <p className="font-semibold">
                              {new Date(b.pickupDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            {b.returnDate && (
                              <p className="text-[10px] text-zinc-400 mt-0.5">
                                to{" "}
                                {new Date(b.returnDate).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-400">Flexible</span>
                        )}
                      </td>

                      {/* 5. Pricing */}
                      <td className="py-3 px-4">
                        {b.totalPrice ? (
                          <div>
                            <p className="font-bold text-zinc-900">
                              {b.totalPrice.toLocaleString()}{" "}
                              <span className="text-[10px] font-normal text-zinc-500">
                                {b.currency}
                              </span>
                            </p>
                            <span
                              className={`inline-block text-[9px] font-bold uppercase tracking-wider ${
                                b.paymentStatus === "PAID"
                                  ? "text-emerald-600"
                                  : b.paymentStatus === "PARTIAL"
                                  ? "text-blue-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {b.paymentStatus}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-400">TBD</span>
                        )}
                      </td>

                      {/* 6. Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                            b.status
                          )}`}
                        >
                          {b.status}
                        </span>
                      </td>

                      {/* 7. Actions: Invoice, View, Edit, Delete */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`/api/admin/bookings/${b.id}/invoice`}
                            download
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9f7d3b] hover:text-white bg-amber-50 hover:bg-[#b38b45] rounded transition-colors"
                            title="Download Service Invoice"
                          >
                            <FaFileInvoiceDollar className="text-xs" />
                            <span>Invoice</span>
                          </a>

                          <Link
                            href={`/admin/bookings/${b.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
                            title="View Full Booking"
                          >
                            <FaEye className="text-xs" />
                            <span>View</span>
                          </Link>

                          <Link
                            href={`/admin/bookings/${b.id}/edit`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 rounded transition-colors"
                            title="Edit Service Booking"
                          >
                            <FaEdit className="text-xs" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(b.id, b.customerName)}
                            disabled={deletingId === b.id}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
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
