import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceType = searchParams.get("serviceType");
    const status = searchParams.get("status");

    const where: any = {};
    if (serviceType) where.serviceType = serviceType;
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceType,
      customerName,
      customerPhone,
      customerEmail,
      customerCountry,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      returnDate,
      passengers,
      itemName,
      route,
      totalPrice,
      currency,
      status,
      paymentStatus,
      adminNotes,
    } = body;

    const booking = await prisma.booking.create({
      data: {
        serviceType: serviceType || "UMRAH_TRANSPORT",
        customerName,
        customerPhone,
        customerEmail,
        customerCountry,
        pickupLocation,
        dropoffLocation,
        pickupDate: pickupDate ? new Date(pickupDate) : null,
        returnDate: returnDate ? new Date(returnDate) : null,
        passengers: Number(passengers || 1),
        itemName,
        route,
        totalPrice: totalPrice !== undefined ? Number(totalPrice) : null,
        currency: currency || "SAR",
        status: status || "PENDING",
        paymentStatus: paymentStatus || "UNPAID",
        adminNotes,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
