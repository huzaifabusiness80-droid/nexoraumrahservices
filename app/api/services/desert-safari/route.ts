import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get all active desert safari packages
// Supports: ?type=...&sort=...&search=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";

    const where: any = { isActive: true };

    if (type) {
      where.packageType = { in: type.split(","), mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { packageType: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { order: "asc" };
    if (sort === "price-asc") orderBy = { priceAed: "asc" };
    else if (sort === "price-desc") orderBy = { priceAed: "desc" };

    const safaris = await prisma.desertSafariPackage.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, safaris });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") throw error;
    console.error("Public desert safari API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
