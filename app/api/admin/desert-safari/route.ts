import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const safaris = await prisma.desertSafariPackage.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, safaris });
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
      packageType,
      timing,
      priceAed,
      vipPriceAed,
      image,
      description,
      activities,
      includes,
      isActive,
    } = body;

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const safari = await prisma.desertSafariPackage.create({
      data: {
        title,
        slug: generatedSlug,
        packageType: packageType || "Evening Safari",
        timing: timing || "03:00 PM - 09:00 PM",
        priceAed: Number(priceAed || 0),
        vipPriceAed: vipPriceAed !== undefined ? Number(vipPriceAed) : null,
        image,
        description: description || "",
        activities: Array.isArray(activities) ? activities : [],
        includes: Array.isArray(includes) ? includes : [],
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, safari });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
