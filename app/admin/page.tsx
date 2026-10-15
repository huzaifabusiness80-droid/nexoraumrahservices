"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCar,
  FaHotel,
  FaMosque,
  FaCompass,
  FaCampground,
  FaKey,
  FaCalendarCheck,
  FaPlus,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setStats(data.stats);
          setRecentBookings(data.recentBookings || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Transport Fleet", count: stats?.vehicles || 0, sub: `${stats?.routes || 0} Routes`, href: "/admin/transport", icon: FaCar, addHref: "/admin/transport/new" },
    { label: "Umrah Hotels", count: stats?.hotels || 0, sub: "Makkah & Madinah", href: "/admin/hotels", icon: FaHotel, addHref: "/admin/hotels/new" },
    { label: "Umrah Ziyarat", count: stats?.ziyarat || 0, sub: "Holy Tours", href: "/admin/ziyarat", icon: FaMosque, addHref: "/admin/ziyarat/new" },
    { label: "UAE City Tours", count: stats?.cityTours || 0, sub: "Dubai & Abu Dhabi", href: "/admin/city-tours", icon: FaCompass, addHref: "/admin/city-tours/new" },
    { label: "Desert Safari", count: stats?.safari || 0, sub: "Evening & VIP", href: "/admin/desert-safari", icon: FaCampground, addHref: "/admin/desert-safari/new" },
    { label: "UAE Rental Cars", count: stats?.rentalCars || 0, sub: "Luxury & Economy", href: "/admin/car-rental", icon: FaKey, addHref: "/admin/car-rental/new" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-wider">
            Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Real-time control center for Nexora Journeys pilgrimage and luxury fleet operations
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/transport/new"
            className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <FaPlus className="text-[10px]" />
            <span>Add Vehicle</span>
          </Link>

          <Link
            href="/admin/hotels/new"
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <FaPlus className="text-[10px]" />
            <span>Add Hotel</span>
          </Link>
        </div>
      </div>

      {/* 6 Services Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-[#c5a059]/60 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    {card.label}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                      {loading ? "..." : card.count}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">{card.sub}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#c5a059]">
                  <Icon className="text-base" />
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <Link
                  href={card.href}
                  className="font-bold text-[#c5a059] hover:text-[#b08c47] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Manage All</span>
                  <FaArrowRight className="text-[9px]" />
                </Link>

                <Link
                  href={card.addHref}
                  className="text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1 transition-colors"
                >
                  <FaPlus className="text-[9px]" />
                  <span>Add New</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookings & Recent Activity Section */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7">
        <div className="flex items-center justify-between pb-5 border-b border-zinc-200">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-zinc-900 uppercase tracking-wider">
              Recent Reservation Requests
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Latest customer bookings across all transport, hotel, and tour services
            </p>
          </div>

          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-[#c5a059] hover:text-[#b08c47] uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
          >
            <span>View All Bookings ({stats?.bookings || 0})</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {/* Table or Empty State */}
        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Booking #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Pickup / Details</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-zinc-800">
                      {b.bookingNumber?.slice(-6) || b.id.slice(-6)}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-zinc-900">{b.customerName}</p>
                      <p className="text-[11px] text-zinc-400">{b.customerPhone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded text-[10px] font-semibold uppercase">
                        {b.serviceType?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-600">
                      {b.route || b.itemName || b.pickupLocation || "—"}
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900">
                      {b.totalPrice ? `${b.totalPrice} ${b.currency}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "CONFIRMED"
                            ? "bg-green-50 text-green-700"
                            : b.status === "COMPLETED"
                            ? "bg-blue-50 text-blue-700"
                            : b.status === "CANCELLED"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="text-[#c5a059] hover:underline font-bold"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-400">
            <FaCalendarCheck className="text-3xl mx-auto mb-2 text-zinc-300" />
            <p className="text-xs font-medium">No bookings recorded yet.</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Customer reservations submitted on the website will appear here in real time.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
