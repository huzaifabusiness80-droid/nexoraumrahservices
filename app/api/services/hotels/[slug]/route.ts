import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isHotelPriceAvailable } from "@/lib/hotelPricing";

// Public API: Get single hotel by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const hotel = await prisma.hotel.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isActive: true,
      },
      include: { rooms: true },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    const hasPrice = isHotelPriceAvailable(hotel);
    return NextResponse.json({
      success: true,
      hotel: {
        ...hotel,
        isContactPricing: !hasPrice,
        startingPrice: hasPrice ? hotel.startingPrice : 0,
        rooms: hasPrice ? hotel.rooms : [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
