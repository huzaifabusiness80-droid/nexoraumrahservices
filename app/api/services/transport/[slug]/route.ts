import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get single transport vehicle by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vehicle = await prisma.transportVehicle.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isActive: true,
      },
      include: {
        routes: { orderBy: { priceSar: "asc" } },
      },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
