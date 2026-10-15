"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";

export default function AdminTransportListPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVehicles = () => {
    setLoading(true);
    fetch("/api/admin/transport")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setVehicles(data.vehicles);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete vehicle "${name}" and all its route rates?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/transport/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert("Failed to delete vehicle");
      }
    } catch {
      alert("Error deleting vehicle");
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
            Umrah Transport Fleet
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage pilgrimage vehicles, specifications, and specific route tariffs in SAR
          </p>
        </div>

        <Link
          href="/admin/transport/new"
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* Vehicles Table Card */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059] mb-2" />
            <span className="text-xs">Loading fleet...</span>
          </div>
        ) : vehicles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="py-3.5 px-4">Vehicle</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Seats / Luggage</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Routes Configured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {vehicles.map((car) => (
                  <tr key={car.id} className="hover:bg-zinc-50/65 transition-colors">
                    {/* Vehicle with Photo */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded border border-zinc-200 overflow-hidden relative bg-zinc-100 shrink-0">
                          {car.image ? (
                            <Image
                              src={car.image}
                              alt={car.name}
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
                          <p className="font-bold text-zinc-900 text-sm">{car.name}</p>
                          <p className="text-[11px] text-zinc-400">{car.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-zinc-700 font-medium">
                      {car.category}
                    </td>

                    <td className="py-3 px-4 text-zinc-600">
                      <span>{car.seats}</span>
                      <span className="text-zinc-400 mx-1">•</span>
                      <span>{car.luggage}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-zinc-900 text-sm">
                        {car.startingPriceSar}
                      </span>
                      <span className="text-[10px] text-[#c5a059] font-bold ml-1">SAR</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded text-[11px] font-semibold">
                        {car.routes?.length || 0} Routes
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {car.isActive ? (
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
                          href={`/admin/transport/${car.id}/edit`}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FaEdit className="text-[11px]" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(car.id, car.name)}
                          disabled={deletingId === car.id}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === car.id ? (
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
            <p className="text-sm font-medium">No transport vehicles found.</p>
            <Link
              href="/admin/transport/new"
              className="mt-3 inline-block px-4 py-2 bg-[#c5a059] text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Add First Vehicle
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
