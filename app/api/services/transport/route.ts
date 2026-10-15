import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get all active transport vehicles with routes
// Supports: ?search=...&category=...&route=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const route = searchParams.get("route") || "";

    const where: any = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (route) {
      where.routes = {
        some: {
          route: { contains: route, mode: "insensitive" },
        },
      };
    }

    const vehicles = await prisma.transportVehicle.findMany({
      where,
      include: {
        routes: {
          orderBy: { priceSar: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, vehicles });
  } catch (error: any) {
    console.error("Public transport API error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
