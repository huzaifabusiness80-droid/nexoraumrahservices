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

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const tour = await prisma.uaeCityTour.create({
      data: {
        title,
        slug: generatedSlug,
        city: city || "Dubai",
        duration: duration || "4 Hours",
        description: description || "",
        image,
        highlights: Array.isArray(highlights) ? highlights : [],
        priceAed: Number(priceAed || 0),
        pricePerPerson: pricePerPerson !== undefined ? Number(pricePerPerson) : null,
        privateCarPrice: privateCarPrice !== undefined ? Number(privateCarPrice) : null,
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
