import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    const where: any = { isActive: true };

    if (city) {
      where.city = { in: city.split(","), mode: "insensitive" };
    }

    if (stars) {
      where.stars = { in: stars.split(",").map(Number) };
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
      include: { rooms: true },
      orderBy,
    });

    return NextResponse.json({ success: true, hotels });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") throw error;
    console.error("Public hotels API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
