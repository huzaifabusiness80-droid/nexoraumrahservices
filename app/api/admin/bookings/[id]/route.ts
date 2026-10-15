import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      status,
      paymentStatus,
      totalPrice,
      adminNotes,
      assignedDriver,
      pickupDate,
    } = body;

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        paymentStatus,
        totalPrice: totalPrice !== undefined ? Number(totalPrice) : undefined,
        adminNotes,
        assignedDriver,
        pickupDate: pickupDate ? new Date(pickupDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
