import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const client = await prisma.clientUser.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const bookings = await prisma.booking.findMany({
      where: { clientId: id },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: {
        id: true,
        bookingNumber: true,
        serviceType: true,
        customerName: true,
        customerPhone: true,
        itemName: true,
        route: true,
        pickupLocation: true,
        totalPrice: true,
        paidAmount: true,
        currency: true,
        paymentStatus: true,
        status: true,
        createdAt: true,
      },
    });

    let balance = 0;
    const entries = bookings.map((booking) => {
      const debit = Number(booking.totalPrice || 0);
      const credit = Number(booking.paidAmount || 0);
      balance += debit - credit;

      const particulars =
        booking.itemName ||
        booking.route ||
        booking.pickupLocation ||
        booking.serviceType.replace(/_/g, " ");

      return {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        date: booking.createdAt.toISOString(),
        type: "Booking",
        particulars,
        debit,
        credit,
        balance,
        currency: booking.currency,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.status,
      };
    });

    const summary = entries.reduce(
      (totals, entry) => ({
        debit: totals.debit + entry.debit,
        credit: totals.credit + entry.credit,
      }),
      { debit: 0, credit: 0 }
    );

    return NextResponse.json({
      success: true,
      client,
      entries,
      summary: {
        totalDebit: summary.debit,
        totalCredit: summary.credit,
        balance: summary.debit - summary.credit,
      },
    });
  } catch (error: any) {
    console.error("Client statement API error:", error);
    return NextResponse.json(
      { error: "Failed to load client statement" },
      { status: 500 }
    );
  }
}
