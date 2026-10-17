import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isValidHotelDate } from "@/lib/hotelPricing";

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
      isContactPricing,
      priceValidFrom,
      priceValidUntil,
      image,
      gallery,
      description,
      amenities,
      rooms,
      isActive,
      featured,
    } = body;

    if (!name || !city || !image) {
      return NextResponse.json({ error: "Name, city, and image are required" }, { status: 400 });
    }

    const contactPricing = Boolean(isContactPricing);
    if (!contactPricing && (!Number.isFinite(Number(startingPrice)) || Number(startingPrice) <= 0)) {
      return NextResponse.json({ error: "Enter a valid starting price or choose contact for pricing" }, { status: 400 });
    }
    if (!contactPricing && (!isValidHotelDate(priceValidFrom) || !isValidHotelDate(priceValidUntil) || priceValidUntil < priceValidFrom)) {
      return NextResponse.json({ error: "Enter a valid pricing start date and end date" }, { status: 400 });
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
        startingPrice: contactPricing ? 0 : Number(startingPrice),
        isContactPricing: contactPricing,
        priceValidFrom: contactPricing ? null : priceValidFrom,
        priceValidUntil: contactPricing ? null : priceValidUntil,
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : [],
        description: description || "",
        amenities: Array.isArray(amenities) ? amenities : [],
        isActive: isActive !== undefined ? isActive : true,
        featured: Boolean(featured),
        rooms: {
          create: !contactPricing && Array.isArray(rooms)
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
