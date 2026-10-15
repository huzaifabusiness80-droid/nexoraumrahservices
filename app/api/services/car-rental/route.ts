import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get all active rental cars
// Supports: ?category=...&brand=...&sort=...&search=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";

    const where: any = { isActive: true };

    if (category) {
      where.category = { in: category.split(","), mode: "insensitive" };
    }

    if (brand) {
      where.brand = { in: brand.split(","), mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { order: "asc" };
    if (sort === "price-asc") orderBy = { dailyPriceAed: "asc" };
    else if (sort === "price-desc") orderBy = { dailyPriceAed: "desc" };

    const cars = await prisma.rentalCar.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, cars });
  } catch (error: any) {
    console.error("Public car rental API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
