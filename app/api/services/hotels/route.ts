import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isHotelPriceAvailable } from "@/lib/hotelPricing";

// Public API: Get all active hotels with rooms
// Supports: ?city=...&stars=...&sort=...&search=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "";
    const stars = searchParams.get("stars") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const validCheckIn = /^\d{4}-\d{2}-\d{2}$/.test(checkIn) ? checkIn : "";

    const where: any = { isActive: true };

    if (city) {
      where.city = { in: city.split(","), mode: "insensitive" };
    }

    if (stars) {
      const starValues = stars
        .split(",")
        .map(Number)
        .filter((value) => Number.isInteger(value) && value > 0 && value <= 5);
      if (starValues.length > 0) {
        where.stars = { in: [...new Set(starValues)] };
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { distance: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    let orderBy: any = { order: "asc" };
    if (sort === "price-asc") orderBy = { startingPrice: "asc" };
    else if (sort === "price-desc") orderBy = { startingPrice: "desc" };
    else if (sort === "stars-desc") orderBy = { stars: "desc" };
    else if (sort === "distance") orderBy = { distance: "asc" };

    const hotels = await prisma.hotel.findMany({
      where,
      include: { rooms: true, pricePeriods: true },
      orderBy,
    });

    const customerHotels = hotels.map((hotel) => {
      const hasPrice = isHotelPriceAvailable(hotel);
      const datePrice = validCheckIn
        ? hotel.pricePeriods.find((period) =>
            validCheckIn >= period.validFrom && validCheckIn <= period.validUntil
          )
        : null;
      const effectiveStartingPrice = datePrice
        ? Number(datePrice.pricePerNight)
        : Number(hotel.startingPrice || 0);
      const effectiveRooms = datePrice
        ? hotel.rooms.map((room) => ({
            ...room,
            pricePerNight: Number(datePrice.pricePerNight),
          }))
        : hotel.rooms;
      return {
        ...hotel,
        isContactPricing: !hasPrice,
        startingPrice: hasPrice ? effectiveStartingPrice : 0,
        rooms: hasPrice ? effectiveRooms : [],
        appliedPricePeriod: datePrice
          ? { validFrom: datePrice.validFrom, validUntil: datePrice.validUntil }
          : null,
      };
    });

    return NextResponse.json({ success: true, hotels: customerHotels });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") throw error;
    console.error("Public hotels API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
