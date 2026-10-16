"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminEditTransportVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Executive Sedan");
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [startingPriceSar, setStartingPriceSar] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [routes, setRoutes] = useState<
    { id?: string; route: string; fromCity: string; toCity: string; priceSar: number }[]
  >([]);

  useEffect(() => {
    fetch(`/api/admin/transport/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.vehicle) {
          const v = data.vehicle;
          setName(v.name || "");
          setCategory(v.category || "Executive Sedan");
          setSeats(v.seats || "");
          setLuggage(v.luggage || "");
          setStartingPriceSar(v.startingPriceSar || 0);
          setImage(v.image || "");
          setGallery(Array.isArray(v.gallery) ? v.gallery.slice(0, 6) : []);
          setDescription(v.description || "");
          setFeaturesText(Array.isArray(v.features) ? v.features.join(", ") : "");
          setIsActive(v.isActive !== undefined ? v.isActive : true);
          setRoutes(
            Array.isArray(v.routes)
              ? v.routes.map((r: any) => ({
                  id: r.id,
                  route: r.route,
                  fromCity: r.fromCity || "Jeddah",
                  toCity: r.toCity || "Makkah",
                  priceSar: r.priceSar || 0,
                }))
              : []
          );
        } else {
          setError(data?.error || "Vehicle not found");
        }
      })
      .catch((err) => setError(err?.message || "Failed to load vehicle"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddRoute = () => {
    setRoutes((prev) => [
      ...prev,
      { route: "New Route", fromCity: "Jeddah", toCity: "Makkah", priceSar: 200 },
    ]);
  };

  const handleRemoveRoute = (index: number) => {
    setRoutes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRouteChange = (index: number, field: string, val: any) => {
    setRoutes((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: val } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image || startingPriceSar === "") {
      setError("Please fill in Vehicle Name, Starting Price, and Upload an Image.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const features = featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/transport/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          seats,
          luggage,
          startingPriceSar: Number(startingPriceSar),
          image,
          gallery,
          description,
          features,
          routes,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update vehicle");
      }

      router.push("/admin/transport");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-zinc-400">
        <FaSpinner className="animate-spin text-3xl text-[#c5a059] mx-auto mb-3" />
        <p className="text-xs">Loading vehicle specifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link
            href="/admin/transport"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Transport Fleet</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Edit Vehicle: {name || "Transport"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify details, update route pricing in SAR, or upload a new photo
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Vehicle Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Vehicle Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Executive Sedan">Executive Sedan</option>
                <option value="Luxury MPV">Luxury MPV</option>
                <option value="VIP Luxury SUV">VIP Luxury SUV</option>
                <option value="Passenger Van">Passenger Van</option>
                <option value="Mini Bus">Mini Bus</option>
                <option value="VIP Luxury Coach">VIP Luxury Coach</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Seats Capacity
              </label>
              <input
                type="text"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                placeholder="e.g. 7 Seater"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Luggage Space
              </label>
              <input
                type="text"
                value={luggage}
                onChange={(e) => setLuggage(e.target.value)}
                placeholder="e.g. 06 to 08 Luggage"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Starting Price (SAR) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={startingPriceSar}
                onChange={(e) => setStartingPriceSar(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Active Status
              </label>
              <select
                value={isActive ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="true">Active (Visible on website)</option>
                <option value="false">Hidden (Draft / Unavailable)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Features (Comma-separated)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        {/* Section 2: Cloudinary Image Upload */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            2. Vehicle Photo (Cloudinary Upload)
          </h2>
          <ImageUploader
            value={image}
            onChange={(url) => setImage(url)}
            folder="nexora/transport"
            label="Upload or Replace Vehicle Picture"
          />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/transport" />
        </div>

        {/* Section 3: Dynamic Route Pricing Builder */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                3. Route Pricing List ({routes.length} Routes)
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Set individual routes and specific fares in SAR
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddRoute}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <FaPlus className="text-[10px]" />
              <span>Add Route</span>
            </button>
          </div>

          <div className="space-y-3">
            {routes.map((r, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-3 rounded-lg border border-zinc-200 bg-zinc-50/50 items-center"
              >
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Route Name
                  </label>
                  <input
                    type="text"
                    required
                    value={r.route}
                    onChange={(e) => handleRouteChange(idx, "route", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    From City
                  </label>
                  <select
                    value={r.fromCity}
                    onChange={(e) => handleRouteChange(idx, "fromCity", e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900 cursor-pointer"
                  >
                    <option value="Jeddah">Jeddah</option>
                    <option value="Makkah">Makkah</option>
                    <option value="Madinah">Madinah</option>
                    <option value="Badar">Badar</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Price (SAR)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      required
                      min="0"
                      value={r.priceSar}
                      onChange={(e) => handleRouteChange(idx, "priceSar", Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900"
                    />
                    <span className="text-[10px] font-bold text-zinc-400">SAR</span>
                  </div>
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveRoute(idx)}
                    className="p-2 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="Remove Route"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
          <Link
            href="/admin/transport"
            className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin text-xs" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <FaSave className="text-xs" />
                <span>Update Vehicle</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
