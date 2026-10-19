"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminNewCityTourPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Dubai");
  const [category, setCategory] = useState("City Sightseeing");
  const [duration, setDuration] = useState("4 - 5 Hours");
  const [priceAed, setPriceAed] = useState<number | "">(250);
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("Burj Khalifa, Dubai Marina Walk, Palm Jumeirah, Burj Al Arab, Gold Souk");
  const [inclusionsText, setInclusionsText] = useState("Private AC Vehicle, Chauffeur, Fuel & Salik Tolls, Doorstep Pickup");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || priceAed === "") {
      setError("Please fill in Tour Title, Price in AED, and Upload an Image.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const highlights = highlightsText.split(",").map((h) => h.trim()).filter(Boolean);
      const inclusions = inclusionsText.split(",").map((i) => i.trim()).filter(Boolean);

      const res = await fetch("/api/admin/city-tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          city,
          category,
          duration,
          priceAed: Number(priceAed),
          privateCarPrice: Number(priceAed),
          image,
          gallery,
          description,
          highlights,
          inclusions,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to create tour");

      router.push("/admin/city-tours");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link href="/admin/city-tours" className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1">
            <FaArrowLeft className="text-[10px]" />
            <span>Back to City Tours</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Add New City Tour
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure UAE private sightseeing, landmark highlights, and pricing in AED
          </p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Tour Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dubai Half-Day Modern Highlights"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                City / Emirate *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 - 5 Hours"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Tour Category *
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="City Sightseeing">City Sightseeing</option>
                <option value="Heritage & Culture">Heritage &amp; Culture</option>
                <option value="Family & Theme Parks">Family &amp; Theme Parks</option>
                <option value="Private Excursion">Private Excursion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Fixed Private Vehicle Price (AED) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={priceAed}
                onChange={(e) => setPriceAed(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                One flat vehicle price, regardless of passenger count.
              </p>
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
                <option value="true">Active (Visible)</option>
                <option value="false">Hidden (Draft)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Highlights (Comma-separated)
            </label>
            <input
              type="text"
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
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

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            2. Tour Photo (Cloudinary Upload)
          </h2>
          <ImageUploader value={image} onChange={(url) => setImage(url)} folder="nexora/tours" label="Upload Tour Photo *" />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/tours" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
          <Link href="/admin/city-tours" className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold uppercase rounded-lg">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin text-xs" /> : <FaSave className="text-xs" />}
            <span>Save City Tour</span>
          </button>
        </div>
      </form>
    </div>
  );
}
