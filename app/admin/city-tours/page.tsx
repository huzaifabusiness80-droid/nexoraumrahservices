"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";

export default function AdminCityToursListPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTours = () => {
    setLoading(true);
    fetch("/api/admin/city-tours")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setTours(data.tours);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/city-tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTours((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert("Failed to delete city tour");
      }
    } catch {
      alert("Error deleting city tour");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin" className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1">
              <FaArrowLeft className="text-[10px]" />
              <span>Dashboard</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Tours &amp; Tourism
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage destinations, experience categories, AED rates, and tour galleries
          </p>
        </div>

        <Link
          href="/admin/city-tours/new"
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Add New City Tour</span>
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059] mb-2" />
            <span className="text-xs">Loading city tours...</span>
          </div>
        ) : tours.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="py-3.5 px-4">Tour Name</th>
                  <th className="py-3.5 px-4">Emirate / City</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Vehicle Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-zinc-50/65 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded border border-zinc-200 overflow-hidden relative bg-zinc-100 shrink-0">
                          {tour.image ? (
                            <Image src={tour.image} alt={tour.title} fill sizes="56px" className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">No Pic</div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-sm">{tour.title}</p>
                          <p className="text-[11px] text-zinc-400">{tour.gallery?.length || 0} Gallery Photos</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded text-[11px] font-bold uppercase">
                        {tour.city}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-700">{tour.category || "City Sightseeing"}</td>

                    <td className="py-3 px-4 text-zinc-700 font-medium">{tour.duration}</td>

                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {tour.priceAed} <span className="text-[10px] text-[#c5a059]">AED</span>
                      <span className="block text-[10px] font-normal text-zinc-500">Flat rate · not per person</span>
                    </td>

                    <td className="py-3 px-4">
                      {tour.isActive ? (
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
                          href={`/admin/city-tours/${tour.id}/edit`}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FaEdit className="text-[11px]" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(tour.id, tour.title)}
                          disabled={deletingId === tour.id}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === tour.id ? <FaSpinner className="animate-spin text-[11px]" /> : <FaTrash className="text-[11px]" />}
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
            <p className="text-sm font-medium">No city tours found.</p>
            <Link href="/admin/city-tours/new" className="mt-3 inline-block px-4 py-2 bg-[#c5a059] text-white text-xs font-bold uppercase rounded">
              Add First City Tour
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
