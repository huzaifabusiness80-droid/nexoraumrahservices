"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaArrowLeft, FaCheck, FaTimes, FaStar } from "react-icons/fa";
import { formatHotelPriceValidity, isHotelPriceAvailable } from "@/lib/hotelPricing";

export default function AdminHotelsListPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchHotels = () => {
    setLoading(true);
    fetch("/api/admin/hotels")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setHotels(data.hotels);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete hotel "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/hotels/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHotels((prev) => prev.filter((h) => h.id !== id));
      } else {
        alert("Failed to delete hotel");
      }
    } catch {
      alert("Error deleting hotel");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin" className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1">
              <FaArrowLeft className="text-[10px]" />
              <span>Dashboard</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Umrah Hotels (Makkah &amp; Madinah)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage verified seasonal accommodations, room types, and tariffs in SAR
          </p>
        </div>

        <Link
          href="/admin/hotels/new"
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Add New Hotel</span>
        </Link>
      </div>

      {/* Hotels Table Card */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059] mb-2" />
            <span className="text-xs">Loading hotels...</span>
          </div>
        ) : hotels.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="py-3.5 px-4">Hotel Property</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Distance from Haram</th>
                  <th className="py-3.5 px-4">Starting Rate</th>
                  <th className="py-3.5 px-4">Room Types</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-zinc-50/65 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded border border-zinc-200 overflow-hidden relative bg-zinc-100 shrink-0">
                          {hotel.image ? (
                            <Image
                              src={hotel.image}
                              alt={hotel.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">
                              No Pic
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                            <span>{hotel.name}</span>
                            <span className="inline-flex items-center text-[#c5a059] text-[10px]">
                              {hotel.stars} <FaStar className="text-[9px] ml-0.5" />
                            </span>
                          </p>
                          <p className="text-[11px] text-zinc-400">{hotel.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          hotel.city?.toLowerCase() === "makkah"
                            ? "bg-amber-50 text-amber-800"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {hotel.city}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-700 font-medium">
                      {hotel.distance}
                    </td>

                    <td className="py-3 px-4">
                      {!isHotelPriceAvailable(hotel) ? (
                        <span className="font-semibold text-amber-700">Contact for pricing</span>
                      ) : (
                        <>
                          <span className="font-bold text-zinc-900 text-sm">{hotel.startingPrice}</span>
                          <span className="text-[10px] text-[#c5a059] font-bold ml-1">SAR / Night</span>
                          {formatHotelPriceValidity(hotel.priceValidFrom, hotel.priceValidUntil) && (
                            <span className="block text-[10px] text-zinc-500 mt-1">
                              {formatHotelPriceValidity(hotel.priceValidFrom, hotel.priceValidUntil)}
                            </span>
                          )}
                        </>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded text-[11px] font-semibold">
                        {hotel.rooms?.length || 0} Tariffs
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {hotel.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                          <FaCheck className="text-[9px]" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                          <FaTimes className="text-[9px]" /> Hidden
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/hotels/${hotel.id}/edit`}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FaEdit className="text-[11px]" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(hotel.id, hotel.name)}
                          disabled={deletingId === hotel.id}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === hotel.id ? (
                            <FaSpinner className="animate-spin text-[11px]" />
                          ) : (
                            <FaTrash className="text-[11px]" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-zinc-400">
            <p className="text-sm font-medium">No hotels found.</p>
            <Link
              href="/admin/hotels/new"
              className="mt-3 inline-block px-4 py-2 bg-[#c5a059] text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Add First Hotel
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
