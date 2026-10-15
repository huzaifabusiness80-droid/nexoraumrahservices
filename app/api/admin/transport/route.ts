import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all transport vehicles with their routes
export async function GET() {
  try {
    const vehicles = await prisma.transportVehicle.findMany({
      include: {
        routes: {
          orderBy: { priceSar: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, vehicles });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

// POST create a new transport vehicle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      category,
      seats,
      luggage,
      image,
      posterImage,
      startingPriceSar,
      description,
      features,
      routes,
      isActive,
    } = body;

    if (!name || !category || !image || startingPriceSar === undefined) {
      return NextResponse.json({ error: "Name, category, image, and starting price are required" }, { status: 400 });
    }

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const vehicle = await prisma.transportVehicle.create({
      data: {
        name,
        slug: generatedSlug,
        category,
        seats: seats || "4 Seater",
        luggage: luggage || "2 Luggage",
        image,
        posterImage: posterImage || null,
        startingPriceSar: Number(startingPriceSar),
        description: description || "",
        features: Array.isArray(features) ? features : [],
        isActive: isActive !== undefined ? isActive : true,
        routes: {
          create: Array.isArray(routes)
            ? routes.map((r: any) => ({
                route: r.route,
                fromCity: r.fromCity || "Jeddah",
                toCity: r.toCity || "Makkah",
                priceSar: Number(r.priceSar || 0),
              }))
            : [],
        },
      },
      include: { routes: true },
    });

    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    console.error("Create vehicle error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
