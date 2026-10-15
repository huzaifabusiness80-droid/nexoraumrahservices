import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tours = await prisma.ziyaratTour.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, tours });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
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

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const tour = await prisma.ziyaratTour.create({
      data: {
        title,
        slug: generatedSlug,
        city: city || "Makkah",
        duration: duration || "3 - 4 Hours",
        description: description || "",
        image,
        gallery: Array.isArray(gallery) ? gallery : [image],
        placesCovered: Array.isArray(placesCovered) ? placesCovered : [],
        priceSedan: Number(priceSedan || 0),
        priceVan: priceVan !== undefined ? Number(priceVan) : null,
        priceSuv: priceSuv !== undefined ? Number(priceSuv) : null,
        includes: Array.isArray(includes) ? includes : [],
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
