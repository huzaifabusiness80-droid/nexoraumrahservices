import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { allHotels } from "@/lib/data/hotelData";
import { transportVehicles } from "@/lib/data/transportData";
import { ziyaratTours } from "@/lib/data/ziyaratData";
import { uaeTours } from "@/lib/data/tourData";
import { carRentalVehicles } from "@/lib/data/carRentalData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nexorajourneys.com";
  const now = new Date();

  // 1. Core static marketing and service pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services/umrah-transport`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/umrah-hotels`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/umrah-ziyarat`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/uae-city-tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/uae-desert-safari`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/uae-car-rental`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. Dynamic item pages - combine static library data + dynamic DB entries
  const hotelSlugs = new Set<string>(allHotels.map((h) => h.id));
  const transportSlugs = new Set<string>(transportVehicles.map((v) => v.id));
  const ziyaratSlugs = new Set<string>(ziyaratTours.map((z) => z.id));
  const tourSlugs = new Set<string>(uaeTours.map((t) => t.id));
  const carSlugs = new Set<string>(carRentalVehicles.map((c) => c.id));

  try {
    const [dbHotels, dbVehicles, dbZiyarat, dbCityTours, dbSafari, dbCars] =
      await Promise.allSettled([
        prisma.hotel.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
        prisma.transportVehicle.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
        prisma.ziyaratTour.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
        prisma.uaeCityTour.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
        prisma.desertSafariPackage.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
        prisma.rentalCar.findMany({ where: { isActive: true }, select: { slug: true, id: true } }),
      ]);

    if (dbHotels.status === "fulfilled") {
      dbHotels.value.forEach((h) => hotelSlugs.add(h.slug || h.id));
    }
    if (dbVehicles.status === "fulfilled") {
      dbVehicles.value.forEach((v) => transportSlugs.add(v.slug || v.id));
    }
    if (dbZiyarat.status === "fulfilled") {
      dbZiyarat.value.forEach((z) => ziyaratSlugs.add(z.slug || z.id));
    }
    if (dbCityTours.status === "fulfilled") {
      dbCityTours.value.forEach((t) => tourSlugs.add(t.slug || t.id));
    }
    if (dbSafari.status === "fulfilled") {
      dbSafari.value.forEach((s) => tourSlugs.add(s.slug || s.id));
    }
    if (dbCars.status === "fulfilled") {
      dbCars.value.forEach((c) => carSlugs.add(c.slug || c.id));
    }
  } catch (error) {
    console.warn("Sitemap: Database fetch skipped, using static fallback entries:", error);
  }

  const hotelRoutes: MetadataRoute.Sitemap = Array.from(hotelSlugs).map((id) => ({
    url: `${baseUrl}/hotels/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const transportRoutes: MetadataRoute.Sitemap = Array.from(transportSlugs).map((id) => ({
    url: `${baseUrl}/transport/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const ziyaratRoutes: MetadataRoute.Sitemap = Array.from(ziyaratSlugs).map((id) => ({
    url: `${baseUrl}/ziyarat/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tourRoutes: MetadataRoute.Sitemap = Array.from(tourSlugs).map((id) => ({
    url: `${baseUrl}/tours/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const carRoutes: MetadataRoute.Sitemap = Array.from(carSlugs).map((id) => ({
    url: `${baseUrl}/car-rental/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...hotelRoutes,
    ...transportRoutes,
    ...ziyaratRoutes,
    ...tourRoutes,
    ...carRoutes,
  ];
}
