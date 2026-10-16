"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner, FaTrash } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminEditCityTourPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Dubai");
  const [category, setCategory] = useState("City Sightseeing");
  const [duration, setDuration] = useState("4 - 5 Hours");
  const [priceAed, setPriceAed] = useState<number | "">(250);
  const [pricePerPerson, setPricePerPerson] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [inclusionsText, setInclusionsText] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function loadTour() {
      try {
        const res = await fetch(`/api/admin/city-tours/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Tour not found");
        const tour = data.tour;
        setTitle(tour.title || "");
        setCity(tour.city || "Dubai");
        setCategory(tour.category || "City Sightseeing");
        setDuration(tour.duration || "4 - 5 Hours");
        setPriceAed(tour.priceAed !== undefined ? tour.priceAed : 250);
        setPricePerPerson(tour.pricePerPerson !== null && tour.pricePerPerson !== undefined ? tour.pricePerPerson : "");
        setImage(tour.image || "");
        setGallery(Array.isArray(tour.gallery) ? tour.gallery.slice(0, 6) : []);
        setDescription(tour.description || "");
        setHighlightsText(Array.isArray(tour.highlights) ? tour.highlights.join(", ") : "");
        setInclusionsText(Array.isArray(tour.inclusions) ? tour.inclusions.join(", ") : "");
        setIsActive(tour.isActive !== undefined ? tour.isActive : true);
      } catch (err: any) {
        setError(err?.message || "Failed to load tour");
      } finally {
        setInitialLoading(false);
      }
    }
    if (id) loadTour();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || priceAed === "") {
      setError("Please fill in Tour Title, Price in AED, and Upload an Image.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const highlights = highlightsText.split(",").map((h) => h.trim()).filter(Boolean);
      const inclusions = inclusionsText.split(",").map((i) => i.trim()).filter(Boolean);

      const res = await fetch(`/api/admin/city-tours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          city,
          category,
          duration,
          priceAed: Number(priceAed),
          pricePerPerson: pricePerPerson !== "" ? Number(pricePerPerson) : null,
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
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update tour");

      router.push("/admin/city-tours");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this UAE City Tour?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/city-tours/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");
      router.push("/admin/city-tours");
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
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Loading tour details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link href="/admin/city-tours" className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1">
            <FaArrowLeft className="text-[10px]" />
            <span>Back to City Tours</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Edit City Tour
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify details, pricing in AED, and photos for {title || "this tour"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          {deleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
          <span>Delete Tour</span>
        </button>
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
                Private Vehicle Price (AED) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={priceAed}
                onChange={(e) => setPriceAed(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Per Person Price (AED, Optional)
              </label>
              <input
                type="number"
                min="0"
                value={pricePerPerson}
                onChange={(e) => setPricePerPerson(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#c5a059] rounded border-zinc-300 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isActiveCheck" className="text-xs text-zinc-700 cursor-pointer">
                  Active (visible on website)
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Tour Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed itinerary overview, pickup details, and vehicle comfort..."
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Highlights (comma separated)
            </label>
            <textarea
              rows={2}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Burj Khalifa, Dubai Marina, Palm Jumeirah, Burj Al Arab"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Inclusions (comma separated)
            </label>
            <textarea
              rows={2}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              placeholder="Chauffeur, Salik Tolls, Water bottles, Doorstep Pickup"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            2. Tour Image
          </h2>
          <ImageUploader
            value={image}
            onChange={setImage}
            label="Upload High-Quality Tour Photo *"
            folder="nexora/city-tours"
          />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/city-tours" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/city-tours"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
