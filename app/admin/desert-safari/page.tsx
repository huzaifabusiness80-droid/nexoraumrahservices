"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch } from "react-icons/fa";

interface SafariPackage {
  id: string;
  title: string;
  slug: string;
  packageType: string;
  timing: string;
  priceAed: number;
  image: string;
  activities: string[];
  includes: string[];
  isActive: boolean;
}

export default function AdminDesertSafariPage() {
  const [safaris, setSafaris] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSafaris = async () => {
    try {
      const res = await fetch("/api/admin/desert-safari");
      const data = await res.json();
      if (data.success) {
        setSafaris(data.safaris || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSafaris();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/desert-safari/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSafaris((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting safari package");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = safaris.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.packageType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Desert Safari Packages
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage red dunes dune bashing, VIP desert camps, quad biking, and sunset BBQs
          </p>
        </div>
        <Link
          href="/admin/desert-safari/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-none self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Add Safari Package</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search desert safaris by name or type..."
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
              Loading safari packages...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-500">
            No desert safari packages found. Click &quot;Add Safari Package&quot; to configure your first package.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-3.5 px-4">Package</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Timing</th>
                  <th className="py-3.5 px-4">Fixed Package Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filtered.map((safari) => (
                  <tr key={safari.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0">
                          {safari.image ? (
                            <Image
                              src={safari.image}
                              alt={safari.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-zinc-400">
                              No Pic
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 leading-tight">{safari.title}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {safari.activities?.length || 0} activities included
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-semibold text-zinc-700">
                        {safari.packageType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-600 font-mono text-[11px]">{safari.timing}</td>
                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {safari.priceAed} <span className="text-[10px] text-zinc-500 font-normal">AED</span>
                      <span className="block text-[10px] font-normal text-zinc-500">Flat package rate - not per person</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          safari.isActive ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {safari.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/desert-safari/${safari.id}/edit`}
                          className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                          title="Edit Safari Package"
                        >
                          <FaEdit className="text-xs" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(safari.id, safari.title)}
                          disabled={deletingId === safari.id}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete Package"
                        >
                          {deletingId === safari.id ? (
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
