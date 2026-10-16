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

function getRoutesForVehicles(vehicles: Vehicle[]) {
  const routes = new Map<string, RouteRate>();
  vehicles.forEach((vehicle) => {
    vehicle.routes.forEach((route) => routes.set(route.route, route));
  });
  return Array.from(routes.values()).sort((a, b) => a.route.localeCompare(b.route));
}

export default function TransportFleetSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/services/transport");
        const data: { success?: boolean; vehicles?: Vehicle[]; error?: string } = await res.json();
        if (!res.ok || !data.success || !Array.isArray(data.vehicles)) {
          throw new Error(data.error || "Unable to load transport vehicles from the database.");
        }
        setVehicles(data.vehicles);
      } catch (err) {
        console.error("Failed to load transport vehicles:", err);
        setError(err instanceof Error ? err.message : "Unable to load transport vehicles.");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, [retryCount]);

  const allCategories = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.category))).sort(),
    [vehicles]
  );

  const categoryVehicles = useMemo(
    () => vehicles.filter((vehicle) => !selectedCategory || vehicle.category === selectedCategory),
    [selectedCategory, vehicles]
  );

  const selectedVehicleRecord = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicle),
    [selectedVehicle, vehicles]
  );

  const availableRoutes = useMemo(
    () => getRoutesForVehicles(selectedVehicleRecord ? [selectedVehicleRecord] : categoryVehicles),
    [categoryVehicles, selectedVehicleRecord]
  );

  const availableVehicles = useMemo(() => {
    const routeVehicles = selectedRoute
      ? categoryVehicles.filter((vehicle) => vehicle.routes.some((route) => route.route === selectedRoute))
      : categoryVehicles;
    return routeVehicles;
  }, [categoryVehicles, selectedRoute]);

  // Filter vehicles based on all selections
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (selectedCategory && vehicle.category !== selectedCategory) return false;
      if (selectedRoute && !vehicle.routes.some((route) => route.route === selectedRoute)) return false;
      if (selectedVehicle && vehicle.id !== selectedVehicle) return false;
      return true;
    });
  }, [selectedCategory, selectedRoute, selectedVehicle, vehicles]);

  // Get price for a specific vehicle on the selected route
  const getPriceForRoute = (vehicle: Vehicle) => {
    if (!selectedRoute) return null;
    const rate = vehicle.routes.find((route) => route.route === selectedRoute);
    return rate ? rate.priceSar : null;
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedVehicle("");
    setSelectedRoute("");
  };

  const hasActiveFilters = selectedRoute || selectedCategory || selectedVehicle;

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
          onClick={() => setRetryCount((count) => count + 1)}
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
      <div className="bg-white  border-b border-zinc-200 sticky top-0 z-20 shadow-sm">
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
              {/* Filter by Category */}
              <div className="relative">
                <FaUserFriends className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedVehicle("");
                    setSelectedRoute("");
                  }}
                  aria-label="Filter by vehicle category"
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Vehicle */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedVehicle}
                  onChange={(e) => {
                    const vehicleId = e.target.value;
                    setSelectedVehicle(vehicleId);
                    const vehicle = vehicles.find((item) => item.id === vehicleId);
                    if (selectedRoute && !vehicle?.routes.some((route) => route.route === selectedRoute)) {
                      setSelectedRoute("");
                    }
                  }}
                  aria-label="Filter by vehicle"
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Vehicles</option>
                  {availableVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} — {vehicle.seats}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Route */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  disabled={availableRoutes.length === 0}
                  aria-label="Filter by route"
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:border-[#c5a059] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Available Routes</option>
                  {availableRoutes.map((route) => (
                    <option key={route.id} value={route.route}>
                      {route.route}
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
                const routePrice = getPriceForRoute(car);

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
                        {selectedRoute && routePrice !== null ? (
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
