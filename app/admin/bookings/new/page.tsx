"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewBookingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.error || "Unable to create booking");
      setSaving(false);
      return;
    }
    router.push(`/admin/bookings/${data.booking.id}`);
    router.refresh();
  }

  return (
    <div className="max-w-4xl">
      <div className="pb-6 mb-6 border-b border-zinc-200">
        <Link href="/admin/bookings" className="text-xs text-zinc-500 hover:text-zinc-900">
          Back to bookings
        </Link>
        <h1 className="text-2xl font-bold mt-2 uppercase tracking-wide">Create Client Booking</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Matching the customer email to a client account makes this booking visible in that portal automatically.
        </p>
      </div>
      {error && <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={submit} className="bg-white border border-zinc-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="text-xs font-bold uppercase text-zinc-600">Service<select name="serviceType" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case"><option value="UMRAH_TRANSPORT">Umrah Transport</option><option value="UMRAH_HOTEL">Umrah Hotel</option><option value="UMRAH_ZIYARAT">Umrah Ziyarat</option><option value="UAE_CITY_TOUR">UAE City Tour</option><option value="DESERT_SAFARI">Desert Safari</option><option value="CAR_RENTAL">Car Rental</option></select></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Booking Status<select name="status" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case"><option value="PENDING">Pending</option><option value="CONFIRMED">Confirmed</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></select></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Customer Name<input name="customerName" required className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Phone<input name="customerPhone" required className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Email<input name="customerEmail" type="email" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Country<input name="customerCountry" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Pickup Location<input name="pickupLocation" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Drop-off Location<input name="dropoffLocation" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Travel Date<input name="pickupDate" type="datetime-local" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Passengers<input name="passengers" type="number" min="1" defaultValue="1" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Hotel / Vehicle / Package<input name="itemName" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Route / Description<input name="route" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Total Amount<input name="totalPrice" type="number" min="0" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Paid Amount<input name="paidAmount" type="number" min="0" defaultValue="0" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <label className="text-xs font-bold uppercase text-zinc-600">Currency<select name="currency" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case"><option value="SAR">SAR</option><option value="AED">AED</option><option value="USD">USD</option><option value="PKR">PKR</option></select></label>
        <label className="text-xs font-bold uppercase text-zinc-600 md:col-span-2">Payment Status<select name="paymentStatus" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case"><option value="UNPAID">Unpaid</option><option value="PARTIAL">Partial</option><option value="PAID">Paid</option><option value="REFUNDED">Refunded</option></select></label>
        <label className="text-xs font-bold uppercase text-zinc-600 md:col-span-2">Admin Notes<textarea name="adminNotes" rows={4} className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
        <button disabled={saving} className="md:col-span-2 justify-self-start bg-[#18181b] text-white px-6 py-3 text-sm font-bold hover:bg-[#c5a059] disabled:opacity-60 cursor-pointer">
          {saving ? "Creating..." : "Create Booking"}
        </button>
      </form>
    </div>
  );
}
