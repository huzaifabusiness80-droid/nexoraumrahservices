"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaHotel,
  FaCar,
  FaMosque,
  FaCompass,
  FaCampground,
  FaKey,
  FaPlus,
  FaTrash,
  FaSave,
  FaSpinner,
  FaBed,
  FaArrowLeft,
  FaUser,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";

export type ServiceType =
  | "UMRAH_HOTEL"
  | "UMRAH_TRANSPORT"
  | "UMRAH_ZIYARAT"
  | "UAE_CITY_TOUR"
  | "DESERT_SAFARI"
  | "CAR_RENTAL";

export interface HotelRoomAllocation {
  id?: string;
  roomNumber: number;
  bedType: "Sharing" | "Double" | "Triple" | "Quad" | "Quint";
}

interface BookingFormProps {
  initialData?: any;
  defaultService?: ServiceType;
  isEdit?: boolean;
}

const BED_TYPES: Array<"Sharing" | "Double" | "Triple" | "Quad" | "Quint"> = [
  "Sharing",
  "Double",
  "Triple",
  "Quad",
  "Quint",
];

const SERVICE_CONFIG: Record<
  ServiceType,
  {
    title: string;
    subtitle: string;
    icon: any;
    defaultCurrency: "SAR" | "AED";
    tagline: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  UMRAH_HOTEL: {
    title: "Umrah Hotel Reservation",
    subtitle: "Makkah & Madinah hotel booking with customized room and bed allocations",
    icon: FaHotel,
    defaultCurrency: "SAR",
    tagline: "Dedicated Hotel Reservation",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-800",
  },
  UMRAH_TRANSPORT: {
    title: "Umrah Transport Booking",
    subtitle: "Private airport transfers & intercity chauffeur services across Saudi Arabia",
    icon: FaCar,
    defaultCurrency: "SAR",
    tagline: "Private Chauffeur & Fleet Transfer",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-800",
  },
  UMRAH_ZIYARAT: {
    title: "Umrah Ziyarat Tour Booking",
    subtitle: "Guided holy site ziyarat in Makkah, Madinah, and Badar",
    icon: FaMosque,
    defaultCurrency: "SAR",
    tagline: "Sacred Sites Excursion",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-800",
  },
  UAE_CITY_TOUR: {
    title: "UAE City Tour Booking",
    subtitle: "Sightseeing experiences in Dubai, Abu Dhabi, and Sharjah",
    icon: FaCompass,
    defaultCurrency: "AED",
    tagline: "Emirates Sightseeing Tour",
    badgeBg: "bg-purple-50 border-purple-200",
    badgeText: "text-purple-800",
  },
  DESERT_SAFARI: {
    title: "Desert Safari Adventure Booking",
    subtitle: "Dune bashing, BBQ dinner, and VIP desert camp packages",
    icon: FaCampground,
    defaultCurrency: "AED",
    tagline: "Red Dune Desert Safari",
    badgeBg: "bg-orange-50 border-orange-200",
    badgeText: "text-orange-800",
  },
  CAR_RENTAL: {
    title: "UAE Car Rental Booking",
    subtitle: "Self-drive and luxury chauffeur vehicle rentals across the UAE",
    icon: FaKey,
    defaultCurrency: "AED",
    tagline: "UAE Vehicle Rental",
    badgeBg: "bg-rose-50 border-rose-200",
    badgeText: "text-rose-800",
  },
};

export default function BookingForm({
  initialData,
  defaultService = "UMRAH_HOTEL",
  isEdit = false,
}: BookingFormProps) {
  const router = useRouter();

  const serviceType: ServiceType =
    (initialData?.serviceType as ServiceType) || defaultService;

  // Customer fields
  const [customerName, setCustomerName] = useState(initialData?.customerName || "");
  const [customerPhone, setCustomerPhone] = useState(initialData?.customerPhone || "");
  const [customerEmail, setCustomerEmail] = useState(initialData?.customerEmail || "");
  const [passportNumber, setPassportNumber] = useState(initialData?.passportNumber || "");
  const [nationality, setNationality] = useState(
    initialData?.nationality || initialData?.customerCountry || ""
  );
  const [voucherNumber, setVoucherNumber] = useState(initialData?.voucherNumber || "");

  // Common service fields
  const [itemName, setItemName] = useState(initialData?.itemName || "");
  const [itemCategory, setItemCategory] = useState(initialData?.itemCategory || "");
  const [route, setRoute] = useState(initialData?.route || "");
  const [pickupLocation, setPickupLocation] = useState(initialData?.pickupLocation || "");
  const [dropoffLocation, setDropoffLocation] = useState(initialData?.dropoffLocation || "");
  const [passengers, setPassengers] = useState<number>(initialData?.passengers || 1);
  const [luggageCount, setLuggageCount] = useState<number | "">(
    initialData?.luggageCount !== null && initialData?.luggageCount !== undefined
      ? initialData.luggageCount
      : 0
  );
  const [preferredTime, setPreferredTime] = useState(initialData?.preferredTime || "");

  // Dates
  const formatDateForInput = (d?: string | Date | null) => {
    if (!d) return "";
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return "";
    return parsed.toISOString().split("T")[0];
  };

  const [pickupDate, setPickupDate] = useState(formatDateForInput(initialData?.pickupDate));
  const [returnDate, setReturnDate] = useState(formatDateForInput(initialData?.returnDate));

  // Hotel rooms state (Number of rooms & Bed type for each room)
  const [hotelRooms, setHotelRooms] = useState<HotelRoomAllocation[]>(() => {
    if (initialData?.hotelRooms && Array.isArray(initialData.hotelRooms) && initialData.hotelRooms.length > 0) {
      return initialData.hotelRooms.map((r: any, idx: number) => ({
        id: r.id,
        roomNumber: r.roomNumber || idx + 1,
        bedType: (r.bedType || "Double") as any,
      }));
    }
    return [{ roomNumber: 1, bedType: "Double" }];
  });

  // Financial & Status
  const [currency, setCurrency] = useState(
    initialData?.currency || SERVICE_CONFIG[serviceType].defaultCurrency
  );
  const [totalPrice, setTotalPrice] = useState<number | "">(
    initialData?.totalPrice !== null && initialData?.totalPrice !== undefined
      ? initialData.totalPrice
      : ""
  );
  const [paidAmount, setPaidAmount] = useState<number | "">(
    initialData?.paidAmount !== null && initialData?.paidAmount !== undefined
      ? initialData.paidAmount
      : 0
  );
  const [status, setStatus] = useState(initialData?.status || "PENDING");
  const [paymentStatus, setPaymentStatus] = useState(initialData?.paymentStatus || "UNPAID");
  const [assignedDriver, setAssignedDriver] = useState(initialData?.assignedDriver || "");
  const [adminNotes, setAdminNotes] = useState(initialData?.adminNotes || "");
  const [customerNotes, setCustomerNotes] = useState(initialData?.customerNotes || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Hotel room helpers
  const addRoom = () => {
    setHotelRooms((prev) => [
      ...prev,
      {
        roomNumber: prev.length + 1,
        bedType: "Double",
      },
    ]);
  };

  const removeRoom = (index: number) => {
    if (hotelRooms.length <= 1) return;
    const updated = hotelRooms
      .filter((_, idx) => idx !== index)
      .map((r, idx) => ({ ...r, roomNumber: idx + 1 }));
    setHotelRooms(updated);
  };

  const updateRoomBedType = (index: number, bedType: HotelRoomAllocation["bedType"]) => {
    setHotelRooms((prev) =>
      prev.map((r, idx) => (idx === index ? { ...r, bedType } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Customer name and phone number are required.");
      setSaving(false);
      return;
    }

    const payload: any = {
      serviceType,
      voucherNumber: voucherNumber.trim() || null,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || null,
      passportNumber: passportNumber.trim() || null,
      nationality: nationality.trim() || null,
      customerCountry: nationality.trim() || null,
      pickupDate: pickupDate ? new Date(pickupDate).toISOString() : null,
      returnDate: returnDate ? new Date(returnDate).toISOString() : null,
      passengers: Number(passengers || 1),
      currency,
      totalPrice: totalPrice !== "" ? Number(totalPrice) : null,
      paidAmount: paidAmount !== "" ? Number(paidAmount) : 0,
      status,
      paymentStatus,
      adminNotes: adminNotes.trim() || null,
      customerNotes: customerNotes.trim() || null,
      assignedDriver: assignedDriver.trim() || null,
    };

    if (serviceType === "UMRAH_HOTEL") {
      payload.itemName = itemName.trim() || "Makkah / Madinah Hotel";
      payload.itemCategory = itemCategory.trim() || "Hotel";
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = null;
      payload.route = null;
      payload.bedsRequired = hotelRooms.length;
      payload.hotelRooms = hotelRooms.map((r, idx) => ({
        roomNumber: idx + 1,
        bedType: r.bedType,
      }));
    } else if (serviceType === "UMRAH_TRANSPORT") {
      payload.itemName = itemName.trim() || "Private Vehicle";
      payload.route = route.trim() || null;
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = dropoffLocation.trim() || null;
      payload.luggageCount = luggageCount !== "" ? Number(luggageCount) : 0;
      payload.preferredTime = preferredTime.trim() || null;
    } else if (serviceType === "UMRAH_ZIYARAT") {
      payload.itemName = itemName.trim() || "Holy Sites Ziyarat";
      payload.itemCategory = itemCategory.trim() || "Ziyarat";
      payload.route = route.trim() || null;
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = dropoffLocation.trim() || null;
      payload.preferredTime = preferredTime.trim() || null;
    } else if (serviceType === "UAE_CITY_TOUR") {
      payload.itemName = itemName.trim() || "UAE Sightseeing Tour";
      payload.itemCategory = itemCategory.trim() || "Dubai";
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = dropoffLocation.trim() || null;
      payload.preferredTime = preferredTime.trim() || null;
    } else if (serviceType === "DESERT_SAFARI") {
      payload.itemName = itemName.trim() || "Desert Safari Experience";
      payload.itemCategory = itemCategory.trim() || "Evening Safari";
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = dropoffLocation.trim() || null;
      payload.preferredTime = preferredTime.trim() || null;
    } else if (serviceType === "CAR_RENTAL") {
      payload.itemName = itemName.trim() || "Rental Vehicle";
      payload.itemCategory = itemCategory.trim() || "Rental";
      payload.pickupLocation = pickupLocation.trim() || null;
      payload.dropoffLocation = dropoffLocation.trim() || null;
    }

    try {
      const url = isEdit
        ? `/api/admin/bookings/${initialData.id}`
        : "/api/admin/bookings";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save booking");
      }

      setSuccess(
        isEdit
          ? "Booking updated successfully!"
          : "New booking created successfully!"
      );

      const targetId = data.booking?.id || initialData?.id;
      setTimeout(() => {
        router.push(`/admin/bookings/${targetId}`);
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
      setSaving(false);
    }
  };

  const currentCfg = SERVICE_CONFIG[serviceType];
  const Icon = currentCfg.icon;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header - Pure, Clean & Service Dedicated */}
      <div className="pb-5 border-b border-zinc-200">
        <Link
          href={isEdit ? `/admin/bookings/${initialData?.id}` : "/admin/bookings"}
          className="text-xs text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1.5 mb-2.5 transition-colors font-medium"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{isEdit ? "Cancel & Return" : "Back to Bookings"}</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${currentCfg.badgeBg} ${currentCfg.badgeText}`}
              >
                <Icon className="text-xs" />
                <span>{currentCfg.tagline}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-wide mt-1.5">
              {isEdit ? `Edit ${currentCfg.title}` : `New ${currentCfg.title}`}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">{currentCfg.subtitle}</p>
          </div>
          {isEdit && initialData?.bookingNumber && (
            <div className="px-3 py-1.5 bg-zinc-100 rounded-lg text-xs font-mono font-bold text-zinc-700 self-start sm:self-auto">
              Ref: {initialData.bookingNumber}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. CUSTOMER INFORMATION CARD */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
            <FaUser className="text-[#c5a059] text-xs" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Customer Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Muhammad Farooq"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Mobile / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+966 50 123 4567"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Passport Number
              </label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                placeholder="A12345678"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Nationality / Country
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="e.g. Pakistani, British"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Voucher Number (Optional)
              </label>
              <input
                type="text"
                value={voucherNumber}
                onChange={(e) => setVoucherNumber(e.target.value)}
                placeholder="e.g. VCH-10928 or Hotel Voucher #"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>
        </div>

        {/* 2. DEDICATED SERVICE-SPECIFIC CARD (ONLY THIS SERVICE'S INPUTS) */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
            <Icon className="text-[#c5a059] text-xs" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              {currentCfg.title} Inputs
            </h2>
          </div>

          {/* ===================== A. UMRAH HOTELS ===================== */}
          {serviceType === "UMRAH_HOTEL" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Hotel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. Swissotel Al Maqam Makkah"
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  >
                    <option value="">Select City</option>
                    <option value="Makkah">Makkah</option>
                    <option value="Madinah">Madinah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Check-in Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Check-out Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={passengers}
                    onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* ROOM ALLOCATION BUILDER */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-[#c5a059] text-sm" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                        Room Allocation & Bed Types ({hotelRooms.length} {hotelRooms.length === 1 ? "Room" : "Rooms"})
                      </h3>
                      <p className="text-[11px] text-amber-800/80">
                        Assign bed types for each room (Sharing, Double, Triple, Quad, Quint)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addRoom}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] hover:bg-[#b59049] text-white text-[11px] font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                  >
                    <FaPlus className="text-[9px]" />
                    <span>Add Room</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {hotelRooms.map((room, index) => (
                    <div
                      key={index}
                      className="bg-white border border-amber-200 rounded-lg p-3 shadow-2xs space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-black">
                            {room.roomNumber}
                          </span>
                          Room {room.roomNumber}
                        </span>

                        {hotelRooms.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRoom(index)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Remove Room"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">
                          Bed Type
                        </label>
                        <select
                          value={room.bedType}
                          onChange={(e) =>
                            updateRoomBedType(
                              index,
                              e.target.value as HotelRoomAllocation["bedType"]
                            )
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                        >
                          {BED_TYPES.map((bt) => (
                            <option key={bt} value={bt}>
                              {bt} Bed
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== B. UMRAH TRANSPORT ===================== */}
          {serviceType === "UMRAH_TRANSPORT" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Vehicle Type / Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. GMC Yukon, Toyota Camry, HiAce Van"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Route
                </label>
                <input
                  type="text"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="e.g. Jeddah Airport -> Makkah Hotel"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Jeddah Airport Terminal 1"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Drop-off Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="e.g. Swissotel Makkah Hotel"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Travel Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Passengers <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Luggage Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                  placeholder="e.g. 3"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Assigned Chauffeur / Vehicle Plate
                </label>
                <input
                  type="text"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  placeholder="e.g. Chauffeur Tariq (+966 50 123 4567) • GMC Plate 8492"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* ===================== C. UMRAH ZIYARAT ===================== */}
          {serviceType === "UMRAH_ZIYARAT" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Ziyarat Package <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Makkah Sacred Ziyarat (Cave Hira, Thowr, Mina)"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Holy City <span className="text-red-500">*</span>
                </label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="">Select City</option>
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                  <option value="Badar">Badar</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Vehicle Type
                </label>
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="Sedan">Sedan (Camry)</option>
                  <option value="SUV">SUV (GMC Yukon)</option>
                  <option value="Staria">Hyundai Staria</option>
                  <option value="Van">HiAce Van (10 Pax)</option>
                  <option value="Bus">Luxury Bus / Coaster</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Tour Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Starting Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Hotel Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Swissotel Makkah Lobby"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pilgrims Count
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Assigned Guide / Driver
                </label>
                <input
                  type="text"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  placeholder="e.g. Ustadh Bilal (+966 50 999 1111)"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* ===================== D. UAE CITY TOURS ===================== */}
          {serviceType === "UAE_CITY_TOUR" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Tour Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Dubai Full Day Sightseeing Tour"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Emirate / City <span className="text-red-500">*</span>
                </label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Tour Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Address Downtown Lobby"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Participants <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Assigned Guide / Driver
                </label>
                <input
                  type="text"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  placeholder="e.g. Captain Rashid (+971 50 123 4567)"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* ===================== E. DESERT SAFARI ===================== */}
          {serviceType === "DESERT_SAFARI" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Safari Package <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Evening Red Dune Safari with BBQ Dinner"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Package Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="Evening Safari">Evening Safari</option>
                  <option value="VIP Safari">VIP Safari (Quad & Table)</option>
                  <option value="Morning Safari">Morning Dune Bashing</option>
                  <option value="Overnight Camp">Overnight Desert Camp</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Safari Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Hotel / Residence Address"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Total Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Assigned 4x4 Driver / Marshall
                </label>
                <input
                  type="text"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  placeholder="e.g. Marshall Hamza (+971 55 888 2222)"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* ===================== F. UAE CAR RENTAL ===================== */}
          {serviceType === "CAR_RENTAL" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Rental Car Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Nissan Patrol Titanium, Range Rover Sport"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="Luxury SUV">Luxury SUV</option>
                  <option value="Sports Exotic">Sports Exotic</option>
                  <option value="Business Sedan">Business Sedan</option>
                  <option value="Economy">Economy</option>
                  <option value="7-Seater Van">7-Seater Van</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Rental Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Rental End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Delivery Location
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Dubai DXB Terminal 3"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Drop-off Location
                </label>
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="e.g. Dubai Airport"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Vehicle Plate / Color
                </label>
                <input
                  type="text"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  placeholder="e.g. White (DXB Plate A 4829)"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. PRICING & BILLING */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
            <FaMoneyBillWave className="text-[#c5a059] text-xs" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Pricing & Booking Status
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="SAR">SAR (Saudi Riyal)</option>
                <option value="AED">AED (Emirati Dirham)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="PKR">PKR (Pakistani Rupee)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Total Price ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={totalPrice}
                onChange={(e) =>
                  setTotalPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="1500"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Paid Amount ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={paidAmount}
                onChange={(e) =>
                  setPaidAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="0"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Booking Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="UNPAID">UNPAID</option>
                <option value="PARTIAL">PARTIAL</option>
                <option value="PAID">PAID</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. NOTES */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
            <FaClipboardList className="text-[#c5a059] text-xs" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Notes & Special Instructions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Customer Notes (Appears on Invoice)
              </label>
              <textarea
                rows={2}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Special requests, flight details, or preferences..."
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Internal Admin Notes (Private)
              </label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Internal dispatch notes..."
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] resize-none"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON STRIP */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <Link
            href={isEdit ? `/admin/bookings/${initialData?.id}` : "/admin/bookings"}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {saving ? (
              <FaSpinner className="animate-spin text-xs" />
            ) : (
              <FaSave className="text-xs" />
            )}
            <span>{isEdit ? "Save Changes" : `Create ${currentCfg.tagline}`}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
