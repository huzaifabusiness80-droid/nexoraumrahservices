import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const safari = await prisma.desertSafariPackage.findUnique({ where: { id } });
    if (!safari) return NextResponse.json({ error: "Safari not found" }, { status: 404 });
    return NextResponse.json({ success: true, safari });
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
      packageType,
      timing,
      priceAed,
      image,
      gallery,
      description,
      activities,
      includes,
      isActive,
    } = body;

    const updated = await prisma.desertSafariPackage.update({
      where: { id },
      data: {
        title,
        packageType,
        timing,
        priceAed: priceAed !== undefined ? Number(priceAed) : undefined,
        vipPriceAed: null,
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : undefined,
        description,
        activities: Array.isArray(activities) ? activities : undefined,
        includes: Array.isArray(includes) ? includes : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json({ success: true, safari: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.desertSafariPackage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Safari deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
