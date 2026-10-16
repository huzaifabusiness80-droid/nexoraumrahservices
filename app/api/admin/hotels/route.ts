import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      include: { rooms: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, hotels });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      city,
      stars,
      distance,
      address,
      startingPrice,
      image,
      gallery,
      description,
      amenities,
      rooms,
      isActive,
      featured,
    } = body;

    if (!name || !city || !image || startingPrice === undefined) {
      return NextResponse.json({ error: "Name, city, image, and starting price are required" }, { status: 400 });
    }

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const hotel = await prisma.hotel.create({
      data: {
        name,
        slug: generatedSlug,
        city,
        stars: Number(stars || 5),
        distance: distance || "Near Haram",
        address: address || "",
        startingPrice: Number(startingPrice),
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : [],
        description: description || "",
        amenities: Array.isArray(amenities) ? amenities : [],
        isActive: isActive !== undefined ? isActive : true,
        featured: Boolean(featured),
        rooms: {
          create: Array.isArray(rooms)
            ? rooms.map((r: any) => ({
                roomType: r.roomType,
                capacity: Number(r.capacity || 2),
                pricePerNight: Number(r.pricePerNight || startingPrice),
                hasKaabaView: Boolean(r.hasKaabaView),
              }))
            : [],
        },
      },
      include: { rooms: true },
    });

    return NextResponse.json({ success: true, hotel });
  } catch (error: any) {
    console.error("Create hotel error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
