import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get active tours with optional city/category filters and price sorting.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "";

    const where: {
      isActive: boolean;
      city?: { in: string[]; mode: "insensitive" };
      category?: { in: string[]; mode: "insensitive" };
    } = { isActive: true };

    if (city) {
      where.city = { in: city.split(","), mode: "insensitive" };
    }

    if (category) {
      where.category = { in: category.split(","), mode: "insensitive" };
    }

    let orderBy: { order?: "asc"; priceAed?: "asc" | "desc" } = { order: "asc" };
    if (sort === "price-asc") orderBy = { priceAed: "asc" };
    else if (sort === "price-desc") orderBy = { priceAed: "desc" };

    const tours = await prisma.uaeCityTour.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, tours });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") throw error;
    console.error("Public city tours API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
