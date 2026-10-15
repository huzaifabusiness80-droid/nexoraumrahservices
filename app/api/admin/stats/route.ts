import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      vehiclesCount,
      routesCount,
      hotelsCount,
      ziyaratCount,
      cityToursCount,
      safariCount,
      rentalCarsCount,
      bookingsCount,
      inquiriesCount,
      recentBookings,
    ] = await Promise.all([
      prisma.transportVehicle.count(),
      prisma.transportRouteRate.count(),
      prisma.hotel.count(),
      prisma.ziyaratTour.count(),
      prisma.uaeCityTour.count(),
      prisma.desertSafariPackage.count(),
      prisma.rentalCar.count(),
      prisma.booking.count(),
      prisma.inquiry.count(),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        vehicles: vehiclesCount,
        routes: routesCount,
        hotels: hotelsCount,
        ziyarat: ziyaratCount,
        cityTours: cityToursCount,
        safari: safariCount,
        rentalCars: rentalCarsCount,
        bookings: bookingsCount,
        inquiries: inquiriesCount,
        totalServices: vehiclesCount + hotelsCount + ziyaratCount + cityToursCount + safariCount + rentalCarsCount,
      },
      recentBookings,
    });
  } catch (error: any) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: error?.message || "Failed to load stats" }, { status: 500 });
  }
}
