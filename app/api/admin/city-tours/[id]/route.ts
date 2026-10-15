import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tour = await prisma.uaeCityTour.findUnique({ where: { id } });
    if (!tour) return NextResponse.json({ error: "City tour not found" }, { status: 404 });
    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      city,
      duration,
      description,
      image,
      highlights,
      priceAed,
      pricePerPerson,
      privateCarPrice,
      inclusions,
      isActive,
    } = body;

    const updated = await prisma.uaeCityTour.update({
      where: { id },
      data: {
        title,
        city,
        duration,
        description,
        image,
        highlights: Array.isArray(highlights) ? highlights : undefined,
        priceAed: priceAed !== undefined ? Number(priceAed) : undefined,
        pricePerPerson: pricePerPerson !== undefined ? Number(pricePerPerson) : null,
        privateCarPrice: privateCarPrice !== undefined ? Number(privateCarPrice) : null,
        inclusions: Array.isArray(inclusions) ? inclusions : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json({ success: true, tour: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.uaeCityTour.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "City tour deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
