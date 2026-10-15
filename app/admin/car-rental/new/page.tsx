"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminNewCarRentalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Mercedes-Benz");
  const [category, setCategory] = useState("Executive Sedan");
  const [year, setYear] = useState<number | "">(2024);
  const [seats, setSeats] = useState<number | "">(5);
  const [transmission, setTransmission] = useState("Automatic");
  const [fuelType, setFuelType] = useState("Petrol");
  const [dailyPriceAed, setDailyPriceAed] = useState<number | "">(650);
  const [weeklyPriceAed, setWeeklyPriceAed] = useState<number | "">(4200);
  const [monthlyPriceAed, setMonthlyPriceAed] = useState<number | "">(14500);
  const [isContactForPrice, setIsContactForPrice] = useState(false);
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(1500);
  const [freeMileagePerDay, setFreeMileagePerDay] = useState<number | "">(250);
  const [image, setImage] = useState("");
  const [featuresText, setFeaturesText] = useState(
    "Apple CarPlay, 360-Degree Camera, Panoramic Sunroof, Leather Seats, Cruise Control, GPS Navigation"
  );
  const [isSelfDrive, setIsSelfDrive] = useState(true);
  const [withDriverOption, setWithDriverOption] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Please fill in Car Model Name and Upload a Vehicle Photo.");
      return;
    }

    if (!isContactForPrice && (dailyPriceAed === "" || Number(dailyPriceAed) <= 0)) {
      setError("Please enter a Daily Price in AED or select 'Contact for Pricing'.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const features = featuresText
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f && f !== "contact_for_price");

      if (isContactForPrice) {
        features.push("contact_for_price");
      }

      const res = await fetch("/api/admin/car-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          brand,
          category,
          year: Number(year || 2024),
          seats: Number(seats || 5),
          transmission,
          fuelType,
          dailyPriceAed: isContactForPrice ? 0 : Number(dailyPriceAed),
          weeklyPriceAed: !isContactForPrice && weeklyPriceAed !== "" ? Number(weeklyPriceAed) : null,
          monthlyPriceAed: !isContactForPrice && monthlyPriceAed !== "" ? Number(monthlyPriceAed) : null,
          securityDeposit: Number(securityDeposit || 0),
          freeMileagePerDay: Number(freeMileagePerDay || 250),
          features,
          isSelfDrive,
          withDriverOption,
          image,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to create rental car");

      router.push("/admin/car-rental");
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
          <Link
            href="/admin/car-rental"
            className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1 mb-1"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Car Rental</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Add Rental Vehicle
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure luxury sedans, SUVs, sports cars, and monthly leasing rates across UAE
          </p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            1. Vehicle Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Model Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mercedes-Benz S-Class S500"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Brand / Make *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Mercedes-Benz, BMW, Audi, Toyota, Nissan"
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
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Sports & Exotic">Sports & Exotic</option>
                <option value="Economy & Midsize">Economy & Midsize</option>
                <option value="Premium Van / Chauffeur">Premium Van / Chauffeur</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Year / Model
              </label>
              <input
                type="number"
                min="2018"
                max="2030"
                value={year}
                onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Seating Capacity
              </label>
              <input
                type="number"
                min="2"
                max="15"
                value={seats}
                onChange={(e) => setSeats(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Transmission
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Free Daily Mileage (KM)
              </label>
              <input
                type="number"
                min="100"
                value={freeMileagePerDay}
                onChange={(e) => setFreeMileagePerDay(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              2. Rental Rates & Security (AED)
            </h2>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isContactForPrice}
                onChange={(e) => {
                  setIsContactForPrice(e.target.checked);
                  if (e.target.checked) setDailyPriceAed(0);
                  else if (dailyPriceAed === 0) setDailyPriceAed(650);
                }}
                className="w-4 h-4 text-[#c5a059] rounded border-zinc-300 focus:ring-[#c5a059]"
              />
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200 rounded">
                Contact For Pricing (Hide Numeric Rates)
              </span>
            </label>
          </div>

          {isContactForPrice ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
              <span className="text-base">📞</span>
              <div>
                <p className="font-bold">Contact for Pricing is ACTIVE</p>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Customers will see <strong>&quot;Contact For Pricing&quot;</strong> and <strong>&quot;WhatsApp Inquiry&quot;</strong> on the website instead of exact AED numbers.
                </p>
              </div>
            </div>
          ) : null}

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${isContactForPrice ? "opacity-50 pointer-events-none" : ""}`}>
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Daily Rate (AED) {!isContactForPrice && "*"}
              </label>
              <input
                type="number"
                required={!isContactForPrice}
                min="0"
                value={dailyPriceAed}
                onChange={(e) => setDailyPriceAed(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Weekly Rate (AED)
              </label>
              <input
                type="number"
                min="0"
                value={weeklyPriceAed}
                onChange={(e) => setWeeklyPriceAed(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Monthly Rate (AED)
              </label>
              <input
                type="number"
                min="0"
                value={monthlyPriceAed}
                onChange={(e) => setMonthlyPriceAed(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Security Deposit (AED)
              </label>
              <input
                type="number"
                min="0"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Vehicle Features (comma separated)
            </label>
            <textarea
              rows={2}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Apple CarPlay, 360 Camera, Panoramic Sunroof, Leather Seats, GPS Navigation"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700">
              <input
                type="checkbox"
                checked={isSelfDrive}
                onChange={(e) => setIsSelfDrive(e.target.checked)}
                className="w-4 h-4 text-[#c5a059] rounded border-zinc-300 focus:ring-0 cursor-pointer"
              />
              <span>Available for Self Drive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700">
              <input
                type="checkbox"
                checked={withDriverOption}
                onChange={(e) => setWithDriverOption(e.target.checked)}
                className="w-4 h-4 text-[#c5a059] rounded border-zinc-300 focus:ring-0 cursor-pointer"
              />
              <span>With Chauffeur Option</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-[#c5a059] rounded border-zinc-300 focus:ring-0 cursor-pointer"
              />
              <span>Active (Visible on Website)</span>
            </label>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3">
            3. Vehicle Photo
          </h2>
          <ImageUploader
            value={image}
            onChange={setImage}
            label="Upload High-Quality Car Photo *"
            folder="nexora/car-rental"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/car-rental"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
            <span>Save Rental Car</span>
          </button>
        </div>
      </form>
    </div>
  );
}
