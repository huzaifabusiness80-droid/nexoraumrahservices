import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tour = await prisma.ziyaratTour.findUnique({ where: { id } });
    if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
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
      gallery,
      placesCovered,
      priceSedan,
      priceVan,
      priceSuv,
      includes,
      isActive,
    } = body;

    const updated = await prisma.ziyaratTour.update({
      where: { id },
      data: {
        title,
        city,
        duration,
        description,
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : undefined,
        placesCovered: Array.isArray(placesCovered) ? placesCovered : undefined,
        priceSedan: priceSedan !== undefined ? Number(priceSedan) : undefined,
        priceVan: priceVan !== undefined ? Number(priceVan) : null,
        priceSuv: priceSuv !== undefined ? Number(priceSuv) : null,
        includes: Array.isArray(includes) ? includes : undefined,
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
    await prisma.ziyaratTour.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Tour deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
