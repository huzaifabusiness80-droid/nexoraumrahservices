import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isValidHotelDate } from "@/lib/hotelPricing";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: { rooms: true, pricePeriods: { orderBy: { validFrom: "asc" } } },
    });
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, hotel });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
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
      pricePeriods,
    } = body;

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

    if (Array.isArray(rooms)) {
      await prisma.hotelRoom.deleteMany({
        where: { hotelId: id },
      });
    }
    if (Array.isArray(pricePeriods)) {
      await prisma.hotelPricePeriod.deleteMany({ where: { hotelId: id } });
    }

    const updated = await prisma.hotel.update({
      where: { id },
      data: {
        name,
        city,
        stars: stars !== undefined ? Number(stars) : undefined,
        distance,
        address,
        startingPrice: finalStartingPrice,
        isContactPricing: contactPricing,
        priceValidFrom: validFrom,
        priceValidUntil: validUntil,
        image,
        gallery: Array.isArray(gallery) ? gallery.slice(0, 6) : undefined,
        description,
        amenities: Array.isArray(amenities) ? amenities : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        rooms: !contactPricing && Array.isArray(rooms)
          ? {
              create: rooms.map((r: any) => ({
                roomType: r.roomType,
                capacity: Number(r.capacity || 2),
                pricePerNight: Number(r.pricePerNight || finalStartingPrice),
                hasKaabaView: Boolean(r.hasKaabaView),
              })),
            }
          : undefined,
        pricePeriods: !contactPricing && Array.isArray(pricePeriods)
          ? {
              create: pricePeriods
                .filter((period: any) => isValidHotelDate(period.validFrom) && isValidHotelDate(period.validUntil))
                .filter((period: any) => Number(period.pricePerNight) > 0 && period.validUntil >= period.validFrom)
                .map((period: any) => ({
                  validFrom: period.validFrom,
                  validUntil: period.validUntil,
                  pricePerNight: Number(period.pricePerNight),
                })),
            }
          : undefined,
      },
      include: { rooms: true },
    });

    return NextResponse.json({ success: true, hotel: updated });
  } catch (error: any) {
    console.error("Update hotel error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.hotel.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
