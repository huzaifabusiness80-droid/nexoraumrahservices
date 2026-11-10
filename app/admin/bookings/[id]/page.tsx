"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaSpinner,
  FaTrash,
  FaWhatsapp,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaBed,
  FaHotel,
  FaCar,
  FaMosque,
  FaCompass,
  FaCampground,
  FaKey,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import InvoiceDownloadModal from "@/components/admin/InvoiceDownloadModal";

const SERVICE_META: Record<
  string,
  { label: string; icon: any; color: string; bg: string }
> = {
  UMRAH_HOTEL: {
    label: "Umrah Hotels",
    icon: FaHotel,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  UMRAH_TRANSPORT: {
    label: "Umrah Transport",
    icon: FaCar,
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  UMRAH_ZIYARAT: {
    label: "Umrah Ziyarat",
    icon: FaMosque,
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  UAE_CITY_TOUR: {
    label: "UAE City Tours",
    icon: FaCompass,
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  DESERT_SAFARI: {
    label: "Desert Safari",
    icon: FaCampground,
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
  CAR_RENTAL: {
    label: "Car Rental",
    icon: FaKey,
    color: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
  },
};

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
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

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

  const handleQuickUpdate = async (e: React.FormEvent) => {
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

      setSuccess("Booking status & billing updated successfully.");
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
      <div className="py-12 text-center text-xs text-zinc-500 space-y-3">
        <p>Booking not found.</p>
        <Link href="/admin/bookings" className="text-[#c5a059] underline font-bold">
          Return to bookings
        </Link>
      </div>
    );
  }

  const cleanPhone = booking.customerPhone?.replace(/[^0-9]/g, "");
  const meta = SERVICE_META[booking.serviceType] || {
    label: booking.serviceType,
    icon: FaCar,
    color: "text-zinc-600",
    bg: "bg-zinc-100 border-zinc-200",
  };
  const ServiceIcon = meta.icon;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <Link
            href="/admin/bookings"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to All Bookings</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
              Reservation #{booking.bookingNumber?.slice(-6).toUpperCase() || id.slice(-6).toUpperCase()}
            </h1>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${meta.bg} ${meta.color}`}
            >
              <ServiceIcon className="text-xs" />
              <span>{meta.label}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Placed on {new Date(booking.createdAt).toLocaleString()} • Ref: {booking.bookingNumber || booking.id}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Service Invoice with Payment or without Payment choice */}
          <button
            type="button"
            onClick={() => setIsInvoiceModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#9f7d3b] hover:text-white bg-amber-50 hover:bg-[#b38b45] rounded-lg transition-colors shadow-xs cursor-pointer"
            title="Download Service Invoice / Voucher"
          >
            <FaFileInvoiceDollar className="text-sm" />
            <span>Download Invoice</span>
          </button>

          {/* EDIT BUTTON (DEDICATED FULL EDIT PAGE) */}
          <Link
            href={`/admin/bookings/${id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            title="Edit All Booking Fields & Rooms"
          >
            <FaEdit className="text-xs" />
            <span>Edit Booking</span>
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          >
            {deleting ? <FaSpinner className="animate-spin text-xs" /> : <FaTrash className="text-xs" />}
            <span>Delete</span>
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">{error}</div>}
      {success && <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <FaUser className="text-[#c5a059]" />
              <span>Client Information</span>
            </h2>
            <Link
              href={`/admin/bookings/${id}/edit`}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaEdit className="text-[10px]" />
              <span>Edit</span>
            </Link>
          </div>

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

            {booking.passportNumber && (
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Passport Number</span>
                <p className="font-mono font-medium text-zinc-800">{booking.passportNumber}</p>
              </div>
            )}

            {booking.nationality && (
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Nationality</span>
                <p className="font-medium text-zinc-800">{booking.nationality}</p>
              </div>
            )}

            {booking.voucherNumber && (
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Voucher Number</span>
                <p className="font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block text-xs">
                  {booking.voucherNumber}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SERVICE-SPECIFIC ITINERARY & DETAILS CARD */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <ServiceIcon className="text-[#c5a059]" />
              <span>{meta.label} Details</span>
            </h2>
            <Link
              href={`/admin/bookings/${id}/edit`}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaEdit className="text-[10px]" />
              <span>Edit Details</span>
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {/* 1. Item Name */}
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">
                {booking.serviceType === "UMRAH_HOTEL"
                  ? "Reserved Hotel"
                  : booking.serviceType === "UMRAH_TRANSPORT"
                  ? "Requested Vehicle"
                  : booking.serviceType === "UMRAH_ZIYARAT"
                  ? "Ziyarat Tour"
                  : booking.serviceType === "CAR_RENTAL"
                  ? "Rental Car"
                  : "Booked Package"}
              </span>
              <p className="text-sm font-bold text-zinc-900">{booking.itemName || "Standard Request"}</p>
            </div>

            {/* 2. Hotel Specific View: Rooms & Bed Allocations */}
            {booking.serviceType === "UMRAH_HOTEL" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">City</span>
                    <p className="font-bold text-zinc-800">{booking.pickupLocation || "Makkah / Madinah"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Guests</span>
                    <p className="font-bold text-zinc-800">{booking.passengers} Guests</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Check-in Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Check-out Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                </div>

                {/* ROOM ALLOCATIONS BADGES & BREAKDOWN */}
                <div className="pt-2 border-t border-zinc-100">
                  <span className="text-zinc-500 block text-[10px] uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                    <FaBed className="text-[#c5a059]" />
                    <span>Allocated Rooms & Bed Types:</span>
                  </span>

                  {booking.hotelRooms && booking.hotelRooms.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {booking.hotelRooms.map((r: any, idx: number) => (
                        <div
                          key={r.id || idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-amber-50/70 border border-amber-200"
                        >
                          <span className="font-bold text-zinc-900">Room {r.roomNumber || idx + 1}</span>
                          <span className="px-2 py-0.5 rounded bg-white text-[#9f7d3b] border border-amber-200 text-[10px] font-extrabold">
                            {r.bedType} Bed
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 italic">
                      {booking.bedsRequired ? `${booking.bedsRequired} beds specified` : "Standard room"}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* 3. Transport & Transfers View */}
            {booking.serviceType === "UMRAH_TRANSPORT" && (
              <>
                {booking.route && (
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Route</span>
                    <p className="font-medium text-zinc-800">{booking.route}</p>
                  </div>
                )}
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
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Travel Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Time</span>
                    <p className="font-medium text-zinc-800">{booking.preferredTime || "Flexible"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Passengers / Bags</span>
                    <p className="font-medium text-zinc-800">
                      {booking.passengers} Pax {booking.luggageCount ? `• ${booking.luggageCount} Bags` : ""}
                    </p>
                  </div>
                </div>
                {booking.assignedDriver && (
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Assigned Chauffeur</span>
                    <p className="font-medium text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                      {booking.assignedDriver}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* 4. Ziyarat View */}
            {booking.serviceType === "UMRAH_ZIYARAT" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Holy City</span>
                    <p className="font-bold text-zinc-800">{booking.itemCategory || "Makkah / Madinah"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Vehicle Type</span>
                    <p className="font-bold text-zinc-800">{booking.route || "Sedan / SUV / Van"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Tour Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Starting Time</span>
                    <p className="font-medium text-zinc-800">{booking.preferredTime || "Morning"}</p>
                  </div>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Hotel Pickup Location</span>
                  <p className="font-medium text-zinc-800">{booking.pickupLocation || "Lobby"}</p>
                </div>
                {booking.assignedDriver && (
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Assigned Guide / Driver</span>
                    <p className="font-medium text-zinc-800 bg-zinc-50 p-2 rounded">{booking.assignedDriver}</p>
                  </div>
                )}
              </>
            )}

            {/* 5. City Tours View */}
            {booking.serviceType === "UAE_CITY_TOUR" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Emirate</span>
                    <p className="font-bold text-zinc-800">{booking.itemCategory || "Dubai"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Participants</span>
                    <p className="font-bold text-zinc-800">{booking.passengers} Guests</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Tour Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Time</span>
                    <p className="font-medium text-zinc-800">{booking.preferredTime || "Morning"}</p>
                  </div>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Location</span>
                  <p className="font-medium text-zinc-800">{booking.pickupLocation || "Hotel Lobby"}</p>
                </div>
              </>
            )}

            {/* 6. Desert Safari View */}
            {booking.serviceType === "DESERT_SAFARI" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Package Type</span>
                    <p className="font-bold text-zinc-800">{booking.itemCategory || "Evening Safari"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Guests</span>
                    <p className="font-bold text-zinc-800">{booking.passengers} Guests</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Safari Date</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Time</span>
                    <p className="font-medium text-zinc-800">{booking.preferredTime || "03:00 PM"}</p>
                  </div>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pickup Address</span>
                  <p className="font-medium text-zinc-800">{booking.pickupLocation || "Residence / Hotel"}</p>
                </div>
              </>
            )}

            {/* 7. Car Rental View */}
            {booking.serviceType === "CAR_RENTAL" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Category</span>
                    <p className="font-bold text-zinc-800">{booking.itemCategory || "Luxury SUV"}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Authorized Passengers</span>
                    <p className="font-bold text-zinc-800">{booking.passengers}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Rental Start</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Rental End</span>
                    <p className="font-mono font-medium text-zinc-800">
                      {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString("en-GB") : "Flexible"}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">Delivery / Return Location</span>
                  <p className="font-medium text-zinc-800">{booking.pickupLocation || "Dubai Airport"}</p>
                </div>
              </>
            )}

            {/* Customer Special Notes */}
            {booking.customerNotes && (
              <div className="pt-2 border-t border-zinc-100">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Customer Notes</span>
                <p className="text-zinc-700 italic bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  &ldquo;{booking.customerNotes}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Admin Action & Status Update Form */}
      <form onSubmit={handleQuickUpdate} className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Quick Status & Pricing Controls
          </h2>
          <Link
            href={`/admin/bookings/${id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
          >
            <FaEdit />
            <span>Open Full Edit Form</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
              <option value="CONFIRMED">CONFIRMED (Slot/Room booked)</option>
              <option value="IN_PROGRESS">IN_PROGRESS (Currently active)</option>
              <option value="COMPLETED">COMPLETED (Concluded)</option>
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
              Total Amount ({booking.currency || "SAR"})
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
              Paid Amount ({booking.currency || "SAR"})
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
              Assigned Chauffeur / Guide / Room Note
            </label>
            <input
              type="text"
              value={assignedDriver}
              onChange={(e) => setAssignedDriver(e.target.value)}
              placeholder="e.g. Chauffeur Tariq (+966 50 123 4567)"
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
              placeholder="Client requested early check-in or specific floor..."
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/bookings"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
          >
            Back to Bookings
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
            <span>Save Quick Updates</span>
          </button>
        </div>
      </form>

      {/* Invoice With/Without Payment Choice Modal */}
      <InvoiceDownloadModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        bookingId={id}
        bookingNumber={booking.bookingNumber || id}
        customerName={booking.customerName}
        serviceType={booking.serviceType}
      />
    </div>
  );
}
