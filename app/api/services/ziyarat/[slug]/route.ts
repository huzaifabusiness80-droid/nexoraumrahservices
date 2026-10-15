import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public API: Get single ziyarat tour by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const tour = await prisma.ziyaratTour.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        isActive: true,
      },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, tour });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
