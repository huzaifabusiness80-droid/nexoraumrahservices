import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, email: true } },
        hotelRooms: { orderBy: { roomNumber: "asc" } },
      },
    });
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
      serviceType,
      customerName,
      customerPhone,
      customerCountry,
      status,
      paymentStatus,
      totalPrice,
      paidAmount,
      currency,
      adminNotes,
      assignedDriver,
      pickupDate,
      returnDate,
      pickupLocation,
      dropoffLocation,
      passengers,
      passportNumber,
      nationality,
      preferredTime,
      luggageCount,
      bedsRequired,
      itemName,
      itemCategory,
      route,
      customerNotes,
      hotelRooms,
    } = body;

    const normalizedEmail =
      typeof body.customerEmail === "string" && body.customerEmail.trim()
        ? body.customerEmail.trim().toLowerCase()
        : body.customerEmail === null
        ? null
        : undefined;

    const linkedClient =
      normalizedEmail !== undefined
        ? normalizedEmail
          ? await prisma.clientUser.findUnique({ where: { email: normalizedEmail } })
          : null
        : undefined;

    // Handle hotel rooms synchronization if provided
    if (Array.isArray(hotelRooms)) {
      await prisma.bookingHotelRoom.deleteMany({ where: { bookingId: id } });
      const validRooms = hotelRooms
        .filter((r: any) => r && r.bedType)
        .map((r: any, idx: number) => ({
          bookingId: id,
          roomNumber: Number(r.roomNumber || idx + 1),
          bedType: String(r.bedType).trim(),
        }));
      if (validRooms.length > 0) {
        await prisma.bookingHotelRoom.createMany({
          data: validRooms,
        });
      }
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(serviceType !== undefined ? { serviceType } : {}),
        ...(customerName !== undefined ? { customerName: String(customerName).trim() } : {}),
        ...(customerPhone !== undefined ? { customerPhone: String(customerPhone).trim() } : {}),
        ...(normalizedEmail !== undefined
          ? {
              customerEmail: normalizedEmail,
              clientId: linkedClient?.id || null,
            }
          : {}),
        ...(customerCountry !== undefined ? { customerCountry: customerCountry ? String(customerCountry).trim() : null } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(paymentStatus !== undefined ? { paymentStatus } : {}),
        ...(totalPrice !== undefined ? { totalPrice: totalPrice !== "" && totalPrice !== null ? Number(totalPrice) : null } : {}),
        ...(paidAmount !== undefined ? { paidAmount: paidAmount !== "" && paidAmount !== null ? Math.max(Number(paidAmount || 0), 0) : 0 } : {}),
        ...(currency !== undefined ? { currency: String(currency).trim() } : {}),
        ...(adminNotes !== undefined ? { adminNotes: adminNotes ? String(adminNotes).trim() : null } : {}),
        ...(assignedDriver !== undefined ? { assignedDriver: assignedDriver ? String(assignedDriver).trim() : null } : {}),
        ...(pickupDate !== undefined ? { pickupDate: pickupDate ? new Date(pickupDate) : null } : {}),
        ...(returnDate !== undefined ? { returnDate: returnDate ? new Date(returnDate) : null } : {}),
        ...(pickupLocation !== undefined ? { pickupLocation: pickupLocation ? String(pickupLocation).trim() : null } : {}),
        ...(dropoffLocation !== undefined ? { dropoffLocation: dropoffLocation ? String(dropoffLocation).trim() : null } : {}),
        ...(passengers !== undefined ? { passengers: Number(passengers || 1) } : {}),
        ...(passportNumber !== undefined ? { passportNumber: passportNumber ? String(passportNumber).trim() : null } : {}),
        ...(nationality !== undefined ? { nationality: nationality ? String(nationality).trim() : null } : {}),
        ...(preferredTime !== undefined ? { preferredTime: preferredTime ? String(preferredTime).trim() : null } : {}),
        ...(luggageCount !== undefined ? { luggageCount: luggageCount !== "" && luggageCount !== null ? Math.max(Number(luggageCount || 0), 0) : null } : {}),
        ...(bedsRequired !== undefined ? { bedsRequired: bedsRequired !== "" && bedsRequired !== null ? Math.max(Number(bedsRequired || 0), 0) : null } : {}),
        ...(itemName !== undefined ? { itemName: itemName ? String(itemName).trim() : null } : {}),
        ...(itemCategory !== undefined ? { itemCategory: itemCategory ? String(itemCategory).trim() : null } : {}),
        ...(route !== undefined ? { route: route ? String(route).trim() : null } : {}),
        ...(customerNotes !== undefined ? { customerNotes: customerNotes ? String(customerNotes).trim() : null } : {}),
      },
      include: {
        client: { select: { id: true, name: true, email: true } },
        hotelRooms: { orderBy: { roomNumber: "asc" } },
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
