"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaCar } from "react-icons/fa";

interface RentalCar {
  id: string;
  name: string;
  category: string;
  brand: string;
  year: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  dailyPriceAed: number;
  weeklyPriceAed: number | null;
  monthlyPriceAed: number | null;
  securityDeposit: number;
  freeMileagePerDay: number;
  isSelfDrive: boolean;
  withDriverOption: boolean;
  isActive: boolean;
  features?: string[];
}

export default function AdminCarRentalPage() {
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      const res = await fetch("/api/admin/car-rental");
      const data = await res.json();
      if (data.success) {
        setCars(data.cars || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/car-rental/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCars((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.error || "Failed to delete car");
      }
    } catch (err) {
      alert("Error deleting car");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = cars.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            UAE Car Rental Fleet
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage self-drive rentals and chauffeur-driven luxury sedans, SUVs, and sports cars across Dubai & UAE
          </p>
        </div>
        <Link
          href="/admin/car-rental/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-none self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Add Rental Car</span>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cars by model, brand, or category..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Loading car rental fleet...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-500">
            No cars found. Click &quot;Add Rental Car&quot; to configure your first vehicle.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3.5 px-4">Vehicle</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Specs</th>
                  <th className="py-3.5 px-4">Daily Rate</th>
                  <th className="py-3.5 px-4">Monthly Rate</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filtered.map((car) => (
                  <tr key={car.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-10 rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0">
                          {car.image ? (
                            <Image
                              src={car.image}
                              alt={car.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-zinc-400">
                              <FaCar className="text-zinc-300 text-base" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 leading-tight">{car.name}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {car.brand} • Model {car.year}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-semibold text-zinc-700">
                        {car.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-600 font-mono text-[11px]">
                      {car.seats} Seats • {car.transmission}
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {car.dailyPriceAed > 0 && !car.features?.includes("contact_for_price") ? (
                        <>
                          {car.dailyPriceAed} <span className="text-[10px] text-zinc-500 font-normal">AED / day</span>
                        </>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-850 border border-amber-200">
                          Contact for Price
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-zinc-700">
                      {car.monthlyPriceAed ? (
                        <span className="font-bold text-[#c5a059]">
                          {car.monthlyPriceAed} <span className="text-[10px] font-normal">AED / mo</span>
                        </span>
                      ) : (
                        <span className="text-zinc-400 text-[11px]">Contact</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          car.isActive ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {car.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/car-rental/${car.id}/edit`}
                          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                          title="Edit Rental Car"
                        >
                          <FaEdit className="text-xs" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(car.id, car.name)}
                          disabled={deletingId === car.id}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete Car"
                        >
                          {deletingId === car.id ? (
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
