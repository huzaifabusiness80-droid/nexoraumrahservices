import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get single rental car by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const car = await prisma.rentalCar.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isActive: true,
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
