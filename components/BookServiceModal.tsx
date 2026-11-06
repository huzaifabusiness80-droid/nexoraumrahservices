"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaCheckCircle, FaTimes, FaWhatsapp } from "react-icons/fa";

interface Props {
  serviceType:
    | "UMRAH_TRANSPORT"
    | "UMRAH_HOTEL"
    | "UMRAH_ZIYARAT"
    | "UAE_CITY_TOUR"
    | "DESERT_SAFARI"
    | "CAR_RENTAL";
  itemName: string;
  route?: string;
  currency?: string;
  totalPrice?: number | null;
  buttonLabel?: string;
  className?: string;
  whatsappUrl?: string;
}

export default function BookServiceModal({
  serviceType,
  itemName,
  route,
  currency = "SAR",
  totalPrice = null,
  buttonLabel = "Book Now",
  className = "",
  whatsappUrl,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [linked, setLinked] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [client, setClient] = useState<{ name: string; email: string; phone?: string | null } | null>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/portal/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setClient(data?.user || null))
      .catch(() => setClient(null));
  }, [open]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = {
      serviceType,
      customerName: form.get("customerName"),
      customerPhone: form.get("customerPhone"),
      customerEmail: form.get("customerEmail"),
      pickupLocation: form.get("pickupLocation"),
      dropoffLocation: form.get("dropoffLocation"),
      pickupDate: form.get("pickupDate"),
      returnDate: form.get("returnDate"),
      passengers: form.get("passengers"),
      luggageCount: form.get("luggageCount"),
      itemName,
      route,
      totalPrice,
      currency,
      customerNotes: form.get("customerNotes"),
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.error || "Unable to save your booking");
      setSaving(false);
      return;
    }
    setBooking(data.booking);
    setLinked(Boolean(data.linkedToPortal));
    setSuccess(true);
    setSaving(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setSuccess(false); setError(""); }}
        className={className || "bg-[#18181b] text-white px-5 py-3 text-sm font-bold hover:bg-[#c5a059] transition-colors cursor-pointer"}
      >
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white border border-zinc-200">
            <div className="flex items-start justify-between border-b border-zinc-200 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b38b45]">Nexora Booking</p>
                <h2 className="mt-1 text-lg font-bold">{success ? "Booking Saved" : itemName}</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close booking form" className="p-2 text-zinc-500 hover:text-zinc-900 cursor-pointer"><FaTimes /></button>
            </div>

            {success ? (
              <div className="p-6 text-center">
                <FaCheckCircle className="mx-auto text-5xl text-emerald-600" />
                <h3 className="mt-4 text-xl font-bold">Your booking request is registered</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                  Booking reference: <strong>{booking?.bookingNumber}</strong>. Our team will confirm availability, pricing, and payment details.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  {linked ? (
                    <button type="button" onClick={() => { setOpen(false); router.push("/portal/bookings"); router.refresh(); }} className="bg-[#18181b] px-5 py-3 text-sm font-bold text-white cursor-pointer">View My Bookings</button>
                  ) : (
                    <button type="button" onClick={() => { setOpen(false); router.push(`/portal/signup?email=${encodeURIComponent(client?.email || "")}`); }} className="bg-[#18181b] px-5 py-3 text-sm font-bold text-white cursor-pointer">Sign Up to Track Booking</button>
                  )}
                  {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-zinc-300 px-5 py-3 text-sm font-bold cursor-pointer"><FaWhatsapp className="text-emerald-600" />Message on WhatsApp</a>}
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                {error && <div className="md:col-span-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                <label className="text-xs font-bold uppercase text-zinc-600">Full Name<input name="customerName" required defaultValue={client?.name || ""} className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Phone / WhatsApp<input name="customerPhone" required defaultValue={client?.phone || ""} className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600 md:col-span-2">Email Address<input name="customerEmail" type="email" defaultValue={client?.email || ""} className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /><span className="mt-1 block text-[10px] font-normal normal-case text-zinc-500">Use your portal email to show this booking automatically after login.</span></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Pickup / Travel Date<input name="pickupDate" type="datetime-local" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Return Date<input name="returnDate" type="datetime-local" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Pickup Location<input name="pickupLocation" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Drop-off Location<input name="dropoffLocation" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Passengers<input name="passengers" type="number" min="1" defaultValue="1" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600">Luggage<input name="luggageCount" type="number" min="0" defaultValue="0" className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case" /></label>
                <label className="text-xs font-bold uppercase text-zinc-600 md:col-span-2">Special Requirements<textarea name="customerNotes" rows={3} className="mt-2 w-full border border-zinc-300 px-3 py-3 text-sm normal-case resize-none" /></label>
                <button disabled={saving} className="md:col-span-2 flex items-center justify-center gap-2 bg-[#18181b] px-6 py-3 text-sm font-bold text-white hover:bg-[#c5a059] disabled:opacity-60 cursor-pointer"><FaCalendarAlt />{saving ? "Saving Booking..." : "Confirm Booking Request"}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
