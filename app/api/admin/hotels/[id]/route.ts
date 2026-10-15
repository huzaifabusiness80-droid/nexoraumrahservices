import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: { rooms: true },
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
      image,
      gallery,
      description,
      amenities,
      rooms,
      isActive,
      featured,
    } = body;

    if (Array.isArray(rooms)) {
      await prisma.hotelRoom.deleteMany({
        where: { hotelId: id },
      });
    }

    const updated = await prisma.hotel.update({
      where: { id },
      data: {
        name,
        city,
        stars: stars !== undefined ? Number(stars) : undefined,
        distance,
        address,
        startingPrice: startingPrice !== undefined ? Number(startingPrice) : undefined,
        image,
        gallery: Array.isArray(gallery) ? gallery : undefined,
        description,
        amenities: Array.isArray(amenities) ? amenities : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        rooms: Array.isArray(rooms)
          ? {
              create: rooms.map((r: any) => ({
                roomType: r.roomType,
                capacity: Number(r.capacity || 2),
                pricePerNight: Number(r.pricePerNight || 0),
                hasKaabaView: Boolean(r.hasKaabaView),
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
