"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner, FaTrash } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminEditDesertSafariPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [packageType, setPackageType] = useState("Evening Safari");
  const [timing, setTiming] = useState("03:00 PM - 09:00 PM");
  const [priceAed, setPriceAed] = useState<number | "">(150);
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [activitiesText, setActivitiesText] = useState("");
  const [includesText, setIncludesText] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function loadSafari() {
      try {
        const res = await fetch(`/api/admin/desert-safari/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Safari package not found");
        const s = data.safari;
        setTitle(s.title || "");
        setPackageType(s.packageType || "Evening Safari");
        setTiming(s.timing || "03:00 PM - 09:00 PM");
        setPriceAed(s.priceAed !== undefined ? s.priceAed : 150);
        setImage(s.image || "");
        setGallery(Array.isArray(s.gallery) ? s.gallery.slice(0, 6) : []);
        setDescription(s.description || "");
        setActivitiesText(Array.isArray(s.activities) ? s.activities.join(", ") : "");
        setIncludesText(Array.isArray(s.includes) ? s.includes.join(", ") : "");
        setIsActive(s.isActive !== undefined ? s.isActive : true);
      } catch (err: any) {
        setError(err?.message || "Failed to load safari package");
      } finally {
        setInitialLoading(false);
      }
    }
    if (id) loadSafari();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || priceAed === "") {
      setError("Please provide Package Title, Standard Price in AED, and Upload a Cover Photo.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const activities = activitiesText.split(",").map((a) => a.trim()).filter(Boolean);
      const includes = includesText.split(",").map((i) => i.trim()).filter(Boolean);

      const res = await fetch(`/api/admin/desert-safari/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          packageType,
          timing,
          priceAed: Number(priceAed),
          image,
          gallery,
          description,
          activities,
          includes,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update package");

      router.push("/admin/desert-safari");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this Desert Safari Package?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/desert-safari/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");
      router.push("/admin/desert-safari");
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
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Loading safari package...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link
            href="/admin/desert-safari"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Desert Safari</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Edit Desert Safari Package
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify pricing, inclusions, live show itinerary, and photos for {title || "this package"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          {deleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
          <span>Delete Package</span>
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Package Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Package Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VIP Evening Desert Safari & BBQ Dinner"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Safari Type *
              </label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Evening Safari">Evening Safari</option>
                <option value="Morning Safari">Morning Safari</option>
                <option value="Overnight Safari">Overnight Safari</option>
                <option value="VIP Private Camp">VIP Private Camp</option>
                <option value="Quad Bike / Dune Buggy">Quad Bike / Dune Buggy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Timing / Schedule
              </label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="e.g. 03:00 PM - 09:30 PM"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Fixed Package Price (AED) *
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
                One fixed package price, regardless of passenger count.
              </p>
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
                  Active (show package on website)
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Experience thrill and hospitality in the Dubai Lahbab red desert dunes..."
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Camp Activities (comma separated)
            </label>
            <textarea
              rows={2}
              value={activitiesText}
              onChange={(e) => setActivitiesText(e.target.value)}
              placeholder="Dune Bashing, Camel Ride, Sandboarding, Henna Tattoo, Tanoura Dance, Fire Show"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Included Amenities (comma separated)
            </label>
            <textarea
              rows={2}
              value={includesText}
              onChange={(e) => setIncludesText(e.target.value)}
              placeholder="4x4 Pick and Drop, BBQ Buffet Dinner, Arabic Coffee & Dates, Soft Drinks"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            2. Package Image
          </h2>
          <ImageUploader
            value={image}
            onChange={setImage}
            label="Upload Desert Safari Cover Photo *"
            folder="nexora/desert-safari"
          />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/desert-safari" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/desert-safari"
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
