import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceType = searchParams.get("serviceType");
    const status = searchParams.get("status");

    const where: any = {};
    if (serviceType && serviceType !== "ALL") where.serviceType = serviceType;
    if (status && status !== "ALL") where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        hotelRooms: {
          orderBy: { roomNumber: "asc" },
        },
      },
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
      voucherNumber,
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
      itemCategory,
      route,
      totalPrice,
      currency,
      status,
      paymentStatus,
      paidAmount,
      adminNotes,
      assignedDriver,
      passportNumber,
      nationality,
      preferredTime,
      luggageCount,
      bedsRequired,
      customerNotes,
      hotelRooms,
    } = body;

    const normalizedEmail =
      typeof customerEmail === "string" && customerEmail.trim()
        ? customerEmail.trim().toLowerCase()
        : null;
    const linkedClient = normalizedEmail
      ? await prisma.clientUser.findUnique({ where: { email: normalizedEmail } })
      : null;

    const parsedRooms = Array.isArray(hotelRooms)
      ? hotelRooms
          .filter((r: any) => r && r.bedType)
          .map((r: any, idx: number) => ({
            roomNumber: Number(r.roomNumber || idx + 1),
            bedType: String(r.bedType).trim(),
          }))
      : [];

    const booking = await prisma.booking.create({
      data: {
        clientId: linkedClient?.id || null,
        serviceType: serviceType || "UMRAH_TRANSPORT",
        voucherNumber: voucherNumber ? String(voucherNumber).trim() : null,
        customerName: customerName ? String(customerName).trim() : "Guest Client",
        customerPhone: customerPhone ? String(customerPhone).trim() : "",
        customerEmail: normalizedEmail,
        customerCountry: customerCountry ? String(customerCountry).trim() : null,
        passportNumber: passportNumber ? String(passportNumber).trim() : null,
        nationality: nationality ? String(nationality).trim() : null,
        pickupLocation: pickupLocation ? String(pickupLocation).trim() : null,
        dropoffLocation: dropoffLocation ? String(dropoffLocation).trim() : null,
        pickupDate: pickupDate ? new Date(pickupDate) : null,
        returnDate: returnDate ? new Date(returnDate) : null,
        passengers: Number(passengers || 1),
        itemName: itemName ? String(itemName).trim() : null,
        itemCategory: itemCategory ? String(itemCategory).trim() : null,
        route: route ? String(route).trim() : null,
        totalPrice: totalPrice !== undefined && totalPrice !== "" && totalPrice !== null ? Number(totalPrice) : null,
        currency: currency || "SAR",
        status: status || "PENDING",
        paymentStatus: paymentStatus || "UNPAID",
        paidAmount: paidAmount !== undefined && paidAmount !== "" ? Math.max(Number(paidAmount || 0), 0) : 0,
        adminNotes: adminNotes ? String(adminNotes).trim() : null,
        assignedDriver: assignedDriver ? String(assignedDriver).trim() : null,
        preferredTime: preferredTime ? String(preferredTime).trim() : null,
        luggageCount: luggageCount !== undefined && luggageCount !== "" ? Math.max(Number(luggageCount || 0), 0) : null,
        bedsRequired: bedsRequired !== undefined && bedsRequired !== "" ? Math.max(Number(bedsRequired || 0), 0) : (parsedRooms.length > 0 ? parsedRooms.length : null),
        customerNotes: customerNotes ? String(customerNotes).trim() : null,
        ...(parsedRooms.length > 0
          ? {
              hotelRooms: {
                create: parsedRooms,
              },
            }
          : {}),
      },
      include: {
        hotelRooms: {
          orderBy: { roomNumber: "asc" },
        },
        client: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
