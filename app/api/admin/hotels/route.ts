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
    let finalStartingPrice = contactPricing ? 0 : Number(startingPrice || 0);

    if (!contactPricing && finalStartingPrice <= 0 && Array.isArray(rooms) && rooms.length > 0) {
      const roomPrices = rooms.map((r: any) => Number(r.pricePerNight)).filter((p: number) => p > 0);
      if (roomPrices.length > 0) {
        finalStartingPrice = Math.min(...roomPrices);
      }
    }

    if (!contactPricing && finalStartingPrice <= 0) {
      return NextResponse.json({ error: "Enter a valid starting price or room tariffs, or choose contact for pricing" }, { status: 400 });
    }

    const validFrom = !contactPricing && isValidHotelDate(priceValidFrom) ? priceValidFrom : null;
    const validUntil = !contactPricing && isValidHotelDate(priceValidUntil) ? priceValidUntil : null;
    if (validFrom && validUntil && validUntil < validFrom) {
      return NextResponse.json({ error: "Price Valid Until date cannot be earlier than Price Valid From date" }, { status: 400 });
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
        startingPrice: finalStartingPrice,
        isContactPricing: contactPricing,
        priceValidFrom: validFrom,
        priceValidUntil: validUntil,
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
