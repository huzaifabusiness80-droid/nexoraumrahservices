import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const vehicle = await prisma.transportVehicle.findUnique({
      where: { id },
      include: { routes: true },
    });
    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      category,
      seats,
      luggage,
      image,
      gallery,
      posterImage,
      startingPriceSar,
      description,
      features,
      routes,
      isActive,
    } = body;

    // Delete existing routes and re-create to keep routes synchronized
    if (Array.isArray(routes)) {
      await prisma.transportRouteRate.deleteMany({
        where: { vehicleId: id },
      });
    }

    const updated = await prisma.transportVehicle.update({
      where: { id },
      data: {
        name,
        category,
        seats,
        luggage,
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : undefined,
        posterImage,
        startingPriceSar: startingPriceSar !== undefined ? Number(startingPriceSar) : undefined,
        description,
        features: Array.isArray(features) ? features : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        routes: Array.isArray(routes)
          ? {
              create: routes.map((r: any) => ({
                route: r.route,
                fromCity: r.fromCity || "Jeddah",
                toCity: r.toCity || "Makkah",
                priceSar: Number(r.priceSar || 0),
              })),
            }
          : undefined,
      },
      include: { routes: true },
    });

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (error: any) {
    console.error("Update vehicle error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.transportVehicle.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
