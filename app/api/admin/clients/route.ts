import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const clients = await prisma.clientUser.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            bookings: true,
            inquiries: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    console.error("Admin clients API error:", error);
    return NextResponse.json(
      { error: "Failed to load registered clients" },
      { status: 500 }
    );
  }
}
