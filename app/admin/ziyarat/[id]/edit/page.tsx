"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminEditZiyaratPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Makkah");
  const [duration, setDuration] = useState("");
  const [priceSedan, setPriceSedan] = useState<number | "">("");
  const [priceVan, setPriceVan] = useState<number | "">("");
  const [priceSuv, setPriceSuv] = useState<number | "">("");
  const [priceStaria, setPriceStaria] = useState<number | "">("");
  const [priceBus, setPriceBus] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [placesText, setPlacesText] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/ziyarat/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.tour) {
          const t = data.tour;
          setTitle(t.title || "");
          setCity(t.city || "Makkah");
          setDuration(t.duration || "");
          setPriceSedan(t.priceSedan || 0);
          setPriceVan(t.priceVan !== null ? t.priceVan : "");
          setPriceSuv(t.priceSuv !== null ? t.priceSuv : "");
          setPriceStaria(t.priceStaria !== null ? t.priceStaria : "");
          setPriceBus(t.priceBus !== null ? t.priceBus : "");
          setImage(t.image || "");
          setGallery(Array.isArray(t.gallery) ? t.gallery.slice(0, 6) : []);
          setDescription(t.description || "");
          setPlacesText(Array.isArray(t.placesCovered) ? t.placesCovered.join(", ") : "");
          setIsActive(t.isActive !== undefined ? t.isActive : true);
        } else {
          setError(data?.error || "Tour not found");
        }
      })
      .catch((err) => setError(err?.message || "Failed to load tour"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || priceSedan === "") {
      setError("Please fill in Tour Title, Sedan Price, and Upload an Image.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const placesCovered = placesText.split(",").map((p) => p.trim()).filter(Boolean);

      const res = await fetch(`/api/admin/ziyarat/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          city,
          duration,
          priceSedan: Number(priceSedan),
          priceVan: priceVan !== "" ? Number(priceVan) : null,
          priceSuv: priceSuv !== "" ? Number(priceSuv) : null,
          priceStaria: priceStaria !== "" ? Number(priceStaria) : null,
          priceBus: priceBus !== "" ? Number(priceBus) : null,
          image,
          gallery,
          description,
          placesCovered,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update tour");

      router.push("/admin/ziyarat");
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
        <p className="text-xs">Loading tour details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link href="/admin/ziyarat" className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1">
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Ziyarat Tours</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Edit Ziyarat Tour: {title}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify holy stops, duration, and vehicle options in SAR
          </p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Tour Details
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
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Makkah">Makkah Al-Mukarramah</option>
                <option value="Madinah">Madinah Al-Munawwarah</option>
                <option value="Badar">Battlefield of Badar</option>
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
                <option value="true">Active (Visible)</option>
                <option value="false">Hidden (Draft)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Sedan Rate (SAR) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={priceSedan}
                onChange={(e) => setPriceSedan(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Van Rate (SAR)
              </label>
              <input
                type="number"
                min="0"
                value={priceVan}
                onChange={(e) => setPriceVan(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                GMC Yukon Rate (SAR)
              </label>
              <input
                type="number"
                min="0"
                value={priceSuv}
                onChange={(e) => setPriceSuv(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Hyundai Staria Rate (SAR)
              </label>
              <input
                type="number"
                min="0"
                value={priceStaria}
                onChange={(e) => setPriceStaria(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Bus Rate (SAR)
              </label>
              <input
                type="number"
                min="0"
                value={priceBus}
                onChange={(e) => setPriceBus(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Holy Places Covered (Comma-separated)
            </label>
            <input
              type="text"
              value={placesText}
              onChange={(e) => setPlacesText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Tour Description
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
          <ImageUploader value={image} onChange={(url) => setImage(url)} folder="nexora/ziyarat" label="Upload or Replace Tour Photo" />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/ziyarat" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
          <Link href="/admin/ziyarat" className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold uppercase rounded-lg">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin text-xs" /> : <FaSave className="text-xs" />}
            <span>Update Ziyarat Tour</span>
          </button>
        </div>
      </form>
    </div>
  );
}
