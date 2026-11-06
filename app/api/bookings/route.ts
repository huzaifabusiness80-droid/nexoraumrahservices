import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = String(body.customerName || "").trim();
    const customerPhone = String(body.customerPhone || "").trim();
    const customerEmail = String(body.customerEmail || "").trim().toLowerCase();
    const serviceType = String(body.serviceType || "");

    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const allowedServices = [
      "UMRAH_TRANSPORT",
      "UMRAH_HOTEL",
      "UMRAH_ZIYARAT",
      "UAE_CITY_TOUR",
      "DESERT_SAFARI",
      "CAR_RENTAL",
    ];
    if (!allowedServices.includes(serviceType)) {
      return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
    }

    const currentClient = await getCurrentClient();
    const linkedClient = currentClient?.id
      ? currentClient
      : customerEmail
        ? await prisma.clientUser.findUnique({
            where: { email: customerEmail },
            select: { id: true },
          })
        : null;

    const totalPrice =
      body.totalPrice !== undefined && body.totalPrice !== ""
        ? Math.max(Number(body.totalPrice || 0), 0)
        : null;

    const booking = await prisma.booking.create({
      data: {
        clientId: linkedClient?.id || null,
        serviceType: serviceType as any,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        pickupLocation: body.pickupLocation ? String(body.pickupLocation) : null,
        dropoffLocation: body.dropoffLocation ? String(body.dropoffLocation) : null,
        pickupDate: body.pickupDate ? new Date(String(body.pickupDate)) : null,
        returnDate: body.returnDate ? new Date(String(body.returnDate)) : null,
        passengers: Math.max(Number(body.passengers || 1), 1),
        luggageCount: body.luggageCount ? Math.max(Number(body.luggageCount), 0) : null,
        itemName: body.itemName ? String(body.itemName) : null,
        itemCategory: body.itemCategory ? String(body.itemCategory) : null,
        route: body.route ? String(body.route) : null,
        totalPrice,
        paidAmount: 0,
        currency: String(body.currency || "SAR"),
        status: "PENDING",
        paymentStatus: "UNPAID",
        customerNotes: body.customerNotes ? String(body.customerNotes) : null,
      },
    });

    return NextResponse.json(
      { success: true, booking, linkedToPortal: Boolean(linkedClient?.id) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Public booking error:", error);
    return NextResponse.json(
      { error: "Unable to create your booking. Please try again." },
      { status: 500 }
    );
  }
}
