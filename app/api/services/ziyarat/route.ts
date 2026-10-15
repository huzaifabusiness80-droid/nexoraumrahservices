import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get all active ziyarat tours
// Supports: ?city=...&sort=...&search=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";

    const where: any = { isActive: true };

    if (city) {
      where.city = { in: city.split(","), mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { order: "asc" };
    if (sort === "price-asc") orderBy = { priceSedan: "asc" };
    else if (sort === "price-desc") orderBy = { priceSedan: "desc" };
    else if (sort === "duration") orderBy = { duration: "asc" };

    const tours = await prisma.ziyaratTour.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, tours });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") throw error;
    console.error("Public ziyarat API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
