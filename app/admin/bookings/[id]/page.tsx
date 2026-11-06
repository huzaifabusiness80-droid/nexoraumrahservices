"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaTrash,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

export default function AdminBookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [booking, setBooking] = useState<any>(null);
  const [status, setStatus] = useState("PENDING");
  const [paymentStatus, setPaymentStatus] = useState("UNPAID");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [paidAmount, setPaidAmount] = useState<number | "">("");
  const [adminNotes, setAdminNotes] = useState("");
  const [assignedDriver, setAssignedDriver] = useState("");

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/admin/bookings/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Booking not found");
        const b = data.booking;
        setBooking(b);
        setStatus(b.status || "PENDING");
        setPaymentStatus(b.paymentStatus || "UNPAID");
        setTotalPrice(b.totalPrice !== undefined && b.totalPrice !== null ? b.totalPrice : "");
        setPaidAmount(b.paidAmount !== undefined && b.paidAmount !== null ? b.paidAmount : 0);
        setAdminNotes(b.adminNotes || "");
        setAssignedDriver(b.assignedDriver || "");
      } catch (err: any) {
        setError(err?.message || "Failed to load booking");
      } finally {
        setInitialLoading(false);
      }
    }
    if (id) loadBooking();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          paymentStatus,
          totalPrice: totalPrice !== "" ? Number(totalPrice) : null,
          paidAmount: paidAmount !== "" ? Number(paidAmount) : 0,
          adminNotes,
          assignedDriver,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update booking");

      setSuccess("Booking status & details updated successfully.");
      setBooking(data.booking);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this reservation?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");
      router.push("/admin/bookings");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Delete failed");
      setDeleting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Loading reservation details...
        </span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500">
        Booking not found.{" "}
        <Link href="/admin/bookings" className="text-[#c5a059] underline">
          Return to bookings
        </Link>
      </div>
    );
  }

  const cleanPhone = booking.customerPhone?.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link
            href="/admin/bookings"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to All Bookings</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Reservation #{id.slice(-6).toUpperCase()}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Placed on {new Date(booking.createdAt).toLocaleString()} • {booking.serviceType}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          {deleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
          <span>Delete</span>
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-2">
            <FaUser className="text-[#c5a059]" />
            <span>Client Information</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Client Name</span>
              <p className="text-sm font-bold text-zinc-900">{booking.customerName}</p>
            </div>

            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Direct Contact</span>
              <div className="flex items-center gap-2 mt-1">
                {cleanPhone && (
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold"
                  >
                    <FaWhatsapp className="text-xs" />
                    <span>{booking.customerPhone}</span>
                  </a>
                )}
              </div>
            </div>

            {booking.customerEmail && (
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Email Address</span>
                <a
                  href={`mailto:${booking.customerEmail}`}
                  className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-[#c5a059] font-medium mt-0.5"
                >
                  <FaEnvelope className="text-[10px] text-zinc-400" />
                  <span>{booking.customerEmail}</span>
                </a>
              </div>
            )}

            {booking.customerCountry && (
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Origin / Country</span>
                <p className="font-medium text-zinc-800">{booking.customerCountry}</p>
              </div>
            )}
          </div>
        </div>

        {/* Itinerary & Service Details Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#c5a059]" />
            <span>Service & Itinerary Details</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Service Type</span>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">{booking.serviceType}</p>
            </div>

            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Requested Vehicle / Package</span>
              <p className="text-sm font-bold text-zinc-900">{booking.itemName || booking.route || "General Request"}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Location</span>
                <p className="font-medium text-zinc-800">{booking.pickupLocation || "Not specified"}</p>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Dropoff Location</span>
                <p className="font-medium text-zinc-800">{booking.dropoffLocation || "Not specified"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Date</span>
                <p className="font-mono font-medium text-zinc-800">
                  {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : "Flexible"}
                </p>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Passengers / Guests</span>
                <p className="font-mono font-medium text-zinc-800">{booking.passengers} Pax</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Action & Status Update Form */}
      <form onSubmit={handleUpdate} className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
          Manage Status & Pricing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Booking Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
            >
              <option value="PENDING">PENDING (Awaiting confirmation)</option>
              <option value="CONFIRMED">CONFIRMED (Chauffeur / slot booked)</option>
              <option value="COMPLETED">COMPLETED (Trip concluded)</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
            >
              <option value="UNPAID">UNPAID (Cash upon arrival)</option>
              <option value="PARTIAL">PARTIAL (Advance received)</option>
              <option value="PAID">PAID (Full payment received)</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Total Amount ({booking.currency || "SAR/AED"})
            </label>
            <input
              type="number"
              min="0"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 550"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Paid Amount ({booking.currency || "SAR/AED"})
            </label>
            <input
              type="number"
              min="0"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 250"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Assigned Chauffeur / Vehicle Plate
            </label>
            <input
              type="text"
              value={assignedDriver}
              onChange={(e) => setAssignedDriver(e.target.value)}
              placeholder="e.g. Chauffeur Tariq (+966 50 123 4567) - GMC Yukon Plate 8492"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Internal Admin Notes
            </label>
            <textarea
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Client requested child booster seat, arriving via flight SV102 at terminal 1..."
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/bookings"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
            <span>Update Reservation</span>
          </button>
        </div>
      </form>
    </div>
  );
}
