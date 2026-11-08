"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";
import ImageGalleryUploader from "@/components/admin/ImageGalleryUploader";

export default function AdminEditHotelPage({
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
  const [city, setCity] = useState("Makkah");
  const [hotelType, setHotelType] = useState("Economy");
  const [starCategory, setStarCategory] = useState("");
  const [stars, setStars] = useState<number>(5);
  const [distance, setDistance] = useState("");
  const [address, setAddress] = useState("");
  const [startingPrice, setStartingPrice] = useState<number | "">("");
  const [isContactPricing, setIsContactPricing] = useState(false);
  const [priceValidFrom, setPriceValidFrom] = useState("");
  const [priceValidUntil, setPriceValidUntil] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [amenitiesText, setAmenitiesText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  const [rooms, setRooms] = useState<
    { id?: string; roomType: string; capacity: number; pricePerNight: number; hasKaabaView: boolean }[]
  >([]);
  const [pricePeriods, setPricePeriods] = useState<
    { id?: string; validFrom: string; validUntil: string; pricePerNight: number | "" }[]
  >([]);

  useEffect(() => {
    fetch(`/api/admin/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.hotel) {
          const h = data.hotel;
          setName(h.name || "");
          setCity(h.city || "Makkah");
          setHotelType(h.hotelType || "Economy");
          setStarCategory(["Economy", "Executive Economy"].includes(h.category) ? h.category : "");
          setStars(h.stars || 5);
          setDistance(h.distance || "");
          setAddress(h.address || "");
          setStartingPrice(h.startingPrice || 0);
          setIsContactPricing(Boolean(h.isContactPricing));
          setPriceValidFrom(h.priceValidFrom || "");
          setPriceValidUntil(h.priceValidUntil || "");
          setImage(h.image || "");
          setGallery(Array.isArray(h.gallery) ? h.gallery.slice(0, 6) : []);
          setDescription(h.description || "");
          setAmenitiesText(Array.isArray(h.amenities) ? h.amenities.join(", ") : "");
          setIsActive(h.isActive !== undefined ? h.isActive : true);
          setFeatured(Boolean(h.featured));
          setRooms(
            Array.isArray(h.rooms)
              ? h.rooms.map((r: any) => ({
                  id: r.id,
                  roomType: r.roomType,
                  capacity: r.capacity || 2,
                  pricePerNight: r.pricePerNight || 0,
                  hasKaabaView: Boolean(r.hasKaabaView),
                }))
              : []
          );
          setPricePeriods(
            Array.isArray(h.pricePeriods)
              ? h.pricePeriods.map((period: any) => ({
                  id: period.id,
                  validFrom: period.validFrom || "",
                  validUntil: period.validUntil || "",
                  pricePerNight: Number(period.pricePerNight || 0),
                }))
              : []
          );
        } else {
          setError(data?.error || "Hotel not found");
        }
      })
      .catch((err) => setError(err?.message || "Failed to load hotel"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      { roomType: "Sharing Bed", capacity: 1, pricePerNight: 150, hasKaabaView: false },
    ]);
  };

  const handleRemoveRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPricePeriod = () => {
    setPricePeriods((prev) => [
      ...prev,
      { validFrom: "", validUntil: "", pricePerNight: startingPrice || 450 },
    ]);
  };

  const handleRoomChange = (index: number, field: string, val: any) => {
    setRooms((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: val } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Please fill in Hotel Name and Upload an Image.");
      return;
    }
    const hasRoomPrice = Array.isArray(rooms) && rooms.some((r) => Number(r.pricePerNight) > 0);
    if (!isContactPricing && !startingPrice && !hasRoomPrice) {
      setError("Please enter a starting rate or configure room tariffs, or choose Contact for pricing.");
      return;
    }
    if (!isContactPricing && priceValidFrom && priceValidUntil && priceValidUntil < priceValidFrom) {
      setError("Price Valid Until date cannot be earlier than Price Valid From date.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const amenities = amenitiesText
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/hotels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          city,
          hotelType,
          category: starCategory,
          stars: Number(stars),
          distance,
          address,
          startingPrice: isContactPricing ? 0 : Number(startingPrice),
          isContactPricing,
          priceValidFrom: isContactPricing ? null : priceValidFrom,
          priceValidUntil: isContactPricing ? null : priceValidUntil,
          image,
          gallery,
          description,
          amenities,
          rooms: isContactPricing ? undefined : rooms,
          pricePeriods: isContactPricing ? [] : pricePeriods,
          isActive,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update hotel");
      }

      router.push("/admin/hotels");
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
        <p className="text-xs">Loading hotel details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <Link
            href="/admin/hotels"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Umrah Hotels</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Edit Hotel: {name || "Hotel"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Modify property details, room tariffs, and distance from Haram
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
        
        {/* Section 1: Property Details */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Hotel Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Hotel Name *
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
                City Destination *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Makkah">Makkah Al-Mukarramah</option>
                <option value="Madinah">Madinah Al-Munawwarah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Star Rating
              </label>
              <select
                value={starCategory || String(stars)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "Economy") {
                    setStarCategory("Economy");
                    setStars(2);
                  } else if (value === "Executive Economy") {
                    setStarCategory("Executive Economy");
                    setStars(3);
                  } else {
                    setStarCategory("");
                    setStars(Number(value));
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Economy">Economy</option>
                <option value="Executive Economy">Executive Economy</option>
                <option value={2}>2 Star</option>
                <option value={3}>3 Star</option>
                <option value={5}>5 Star</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Hotel Type
              </label>
              <select
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Economy">Economy</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Distance / Proximity to Haram *
              </label>
              <input
                type="text"
                required
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="sm:col-span-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isContactPricing}
                  onChange={(e) => setIsContactPricing(e.target.checked)}
                  className="mt-0.5 rounded border-zinc-300 text-[#c5a059] focus:ring-0"
                />
                <span>
                  <span className="block text-xs font-bold text-zinc-800">Contact for pricing</span>
                  <span className="block text-xs text-zinc-500 mt-1">
                    Use this when rates are not available. Customers will see no room prices and can request a quote.
                  </span>
                </span>
              </label>
            </div>

            {!isContactPricing && (
              <>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Starting Rate (SAR / Night) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Price Valid From (Optional)
                  </label>
                  <input
                    type="date"
                    value={priceValidFrom}
                    max={priceValidUntil || undefined}
                    onChange={(e) => setPriceValidFrom(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Price Valid Until (Optional)
                  </label>
                  <input
                    type="date"
                    value={priceValidUntil}
                    min={priceValidFrom || undefined}
                    onChange={(e) => setPriceValidUntil(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Hotel Location / Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Amenities &amp; Features (Comma-separated)
            </label>
            <input
              type="text"
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
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

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-zinc-300 text-[#c5a059] focus:ring-0"
              />
              <span>Active (Visible on public hotel directory)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-zinc-300 text-[#c5a059] focus:ring-0"
              />
              <span>Featured Hotel</span>
            </label>
          </div>
        </div>

        {/* Section 2: Cloudinary Image Upload */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            2. Hotel Photo (Cloudinary Upload)
          </h2>
          <ImageUploader
            value={image}
            onChange={(url) => setImage(url)}
            folder="nexora/hotels"
            label="Upload or Replace Hotel Picture"
          />
          <ImageGalleryUploader value={gallery} onChange={setGallery} folder="nexora/hotels" />
        </div>

        {/* Section 3: Date-Based Hotel Prices */}
        {!isContactPricing && (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  3. Date-Based Nightly Prices
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Configure different prices for different stay periods.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddPricePeriod}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#faf6ed] text-[#9f7d3b] rounded-lg text-xs font-bold border border-[#e8dcbf] hover:bg-[#f2e8ce]"
              >
                <FaPlus className="text-[10px]" /> Add Price Period
              </button>
            </div>

            {pricePeriods.length === 0 ? (
              <p className="text-xs text-zinc-400 py-2">No date-based prices configured.</p>
            ) : (
              <div className="space-y-3">
                {pricePeriods.map((period, index) => (
                  <div key={period.id || index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end border border-zinc-100 rounded-lg p-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Valid From</label>
                      <input type="date" value={period.validFrom} max={period.validUntil || undefined}
                        onChange={(e) => setPricePeriods((prev) => prev.map((item, i) => i === index ? { ...item, validFrom: e.target.value } : item))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Valid Until</label>
                      <input type="date" value={period.validUntil} min={period.validFrom || undefined}
                        onChange={(e) => setPricePeriods((prev) => prev.map((item, i) => i === index ? { ...item, validUntil: e.target.value } : item))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Price / Night SAR</label>
                      <input type="number" min="0" value={period.pricePerNight}
                        onChange={(e) => setPricePeriods((prev) => prev.map((item, i) => i === index ? { ...item, pricePerNight: e.target.value === "" ? "" : Number(e.target.value) } : item))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm" />
                    </div>
                    <button type="button" onClick={() => setPricePeriods((prev) => prev.filter((_, i) => i !== index))}
                      className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100" aria-label="Remove price period">
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 4: Dynamic Room Tariffs */}
        {!isContactPricing && <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                3. Room Categories &amp; Nightly Tariffs ({rooms.length} Categories)
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Configure rates for Double, Triple, Quad, Sharing Bed, Kaaba View
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddRoom}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <FaPlus className="text-[10px]" />
              <span>Add Room Type</span>
            </button>
          </div>

          <div className="space-y-3">
            {rooms.map((r, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-3 rounded-lg border border-zinc-200 bg-zinc-50/50 items-center"
              >
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Room Type Name
                  </label>
                  <input
                    type="text"
                    required
                    value={r.roomType}
                    onChange={(e) => handleRoomChange(idx, "roomType", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={r.capacity}
                    onChange={(e) => handleRoomChange(idx, "capacity", Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    Rate / Night (SAR)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      required
                      min="0"
                      value={r.pricePerNight}
                      onChange={(e) => handleRoomChange(idx, "pricePerNight", Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded text-xs text-zinc-900"
                    />
                    <span className="text-[10px] font-bold text-zinc-400">SAR</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center justify-between pt-3 sm:pt-0">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-zinc-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={r.hasKaabaView}
                      onChange={(e) => handleRoomChange(idx, "hasKaabaView", e.target.checked)}
                      className="rounded border-zinc-300 text-[#c5a059]"
                    />
                    <span>Kaaba View</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(idx)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="Remove Room"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
          <Link
            href="/admin/hotels"
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
                <span>Update Hotel Property</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
