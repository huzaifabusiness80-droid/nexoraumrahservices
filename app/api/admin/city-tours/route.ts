import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tours = await prisma.uaeCityTour.findMany({ orderBy: { order: "asc" } });
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
      category,
      duration,
      description,
      image,
      gallery,
      highlights,
      priceAed,
      inclusions,
      isActive,
    } = body;

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const tour = await prisma.uaeCityTour.create({
      data: {
        title,
        slug: generatedSlug,
        city: city || "Dubai",
        category: category || "City Sightseeing",
        duration: duration || "4 Hours",
        description: description || "",
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : [],
        highlights: Array.isArray(highlights) ? highlights : [],
        priceAed: Number(priceAed || 0),
        pricePerPerson: null,
        privateCarPrice: Number(priceAed || 0),
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
