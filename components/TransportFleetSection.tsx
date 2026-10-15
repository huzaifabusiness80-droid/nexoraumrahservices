"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSuitcase, FaUserFriends, FaArrowRight, FaSearch, FaFilter, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface RouteRate {
  id: string;
  route: string;
  fromCity: string;
  toCity: string;
  priceSar: number;
}

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: string;
  seats: string;
  luggage: string;
  image: string;
  posterImage: string | null;
  startingPriceSar: number;
  description: string;
  features: string[];
  routes: RouteRate[];
}

// Extract all unique routes from all vehicles
function getAllRoutes(vehicles: Vehicle[]) {
  const routeSet = new Set<string>();
  vehicles.forEach((v) => v.routes.forEach((r) => routeSet.add(r.route)));
  return Array.from(routeSet).sort();
}

// Extract unique categories
function getAllCategories(vehicles: Vehicle[]) {
  const catSet = new Set<string>();
  vehicles.forEach((v) => catSet.add(v.category));
  return Array.from(catSet);
}

export default function TransportFleetSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch vehicles from backend API
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const res = await fetch("/api/services/transport");
        const data = await res.json();
        if (data.success) {
          setVehicles(data.vehicles);
        } else {
          setError("Failed to load vehicles");
        }
      } catch (err) {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const allRoutes = useMemo(() => getAllRoutes(vehicles), [vehicles]);
  const allCategories = useMemo(() => getAllCategories(vehicles), [vehicles]);

  // Vehicles available for the selected route (for vehicle dropdown)
  const availableVehicles = useMemo(() => {
    if (!selectedRoute) return vehicles;
    return vehicles.filter((v) =>
      v.routes.some((r) => r.route === selectedRoute)
    );
  }, [selectedRoute, vehicles]);

  // Filter vehicles based on all selections
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((v) => v.category === selectedCategory);
    }

    // Filter by route — only show vehicles that serve this route
    if (selectedRoute) {
      result = result.filter((v) =>
        v.routes.some((r) => r.route === selectedRoute)
      );
    }

    // Filter by specific vehicle
    if (selectedVehicle) {
      result = result.filter((v) => v.id === selectedVehicle);
    }

    // Filter by search query (vehicle name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, selectedRoute, selectedVehicle, searchQuery, vehicles]);

  // Get price for a specific vehicle on the selected route
  const getPriceForRoute = (vehicleId: string) => {
    if (!selectedRoute) return null;
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return null;
    const rate = vehicle.routes.find((r) => r.route === selectedRoute);
    return rate ? rate.priceSar : null;
  };

  const clearFilters = () => {
    setSelectedRoute("");
    setSelectedCategory("");
    setSelectedVehicle("");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedRoute || selectedCategory || selectedVehicle || searchQuery;

  if (loading) {
    return (
      <section className="w-full py-20 text-center">
        <FaSpinner className="animate-spin text-[#c5a059] text-3xl mx-auto mb-4" />
        <p className="text-zinc-500 text-sm uppercase tracking-widest">Loading Fleet...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 text-center">
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Filter Bar */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col gap-4">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-800">
                <FaFilter className="text-[#c5a059] text-sm" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
                  Find Your Vehicle
                </span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-semibold text-[#c5a059] hover:text-[#b08c47] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search by Name */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vehicle name..."
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>

              {/* Filter by Category */}
              <div className="relative">
                <FaUserFriends className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Vehicle Types</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Route */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedRoute}
                  onChange={(e) => {
                    setSelectedRoute(e.target.value);
                    setSelectedVehicle(""); // reset vehicle when route changes
                  }}
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Route</option>
                  {allRoutes.map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Vehicle */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Vehicles</option>
                  {availableVehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {v.seats}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Results count */}
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-6">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </p>

        <AnimatePresence mode="wait">
          {filteredVehicles.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredVehicles.map((car, idx) => {
                const detailUrl = `/transport/${car.slug}`;
                const routePrice = getPriceForRoute(car.id);

                return (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="bg-white border border-zinc-200 hover:border-[#c5a059]/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Vehicle Image */}
                    <Link href={detailUrl} className="block relative overflow-hidden bg-zinc-950">
                      <div className="relative w-full h-52 sm:h-56">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                      {/* Name & Category overlay */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-[#e4be72]">
                          {car.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-white">
                          {car.name}
                        </h3>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Specs: Seats & Luggage */}
                      <div className="grid grid-cols-2 border border-[#c5a059]/30 divide-x divide-[#c5a059]/20 text-center mb-5">
                        <div className="py-2.5 px-3 bg-[#fdfbf6]">
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                            Seats
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-0.5">
                            <FaUserFriends className="text-[#c5a059] text-sm" />
                            {car.seats}
                          </span>
                        </div>
                        <div className="py-2.5 px-3 bg-[#fdfbf6]">
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                            Luggage
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center justify-center gap-1.5 mt-0.5">
                            <FaSuitcase className="text-[#c5a059] text-sm" />
                            {car.luggage}
                          </span>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="flex-1 flex flex-col justify-end">
                        {selectedRoute && routePrice ? (
                          /* Show specific route price when filter is active */
                          <div className="bg-[#faf6ed] border border-[#c5a059]/30 p-4 mb-4">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                              Route Price
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                              {routePrice}{" "}
                              <span className="text-sm text-[#9b762c] font-bold">SAR</span>
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-1 leading-snug truncate" title={selectedRoute}>
                              {selectedRoute}
                            </p>
                          </div>
                        ) : (
                          /* Show starting price when no route filter */
                          <div className="mb-4">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                              Starting From
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                              {car.startingPriceSar}{" "}
                              <span className="text-sm text-[#9b762c] font-bold">SAR</span>
                            </p>
                          </div>
                        )}

                        {/* CTA Button */}
                        <Link
                          href={detailUrl}
                          className="w-full py-3 bg-[#c5a059] hover:bg-[#b08c47] text-white text-center font-bold tracking-[0.14em] uppercase text-xs transition-all flex items-center justify-center gap-2"
                        >
                          <span>View Full Rates & Book</span>
                          <FaArrowRight className="text-[10px]" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-zinc-400 text-sm mb-4">
                No vehicles found for the selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08c47] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
