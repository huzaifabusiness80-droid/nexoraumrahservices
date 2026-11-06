import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/clientAuth";
import { linkAndGetClientBookings } from "@/lib/clientBookings";
import prisma from "@/lib/prisma";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = await linkAndGetClientBookings(client);
  const now = new Date();
  const upcoming = bookings
    .filter((booking) => booking.pickupDate && new Date(booking.pickupDate) >= now)
    .sort((a, b) => new Date(a.pickupDate!).getTime() - new Date(b.pickupDate!).getTime())[0] || null;

  const total = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const paid = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
  const inquiryCount = await prisma.inquiry.count({
    where: {
      OR: [
        { clientId: client.id },
        { clientId: null, email: { equals: client.email, mode: "insensitive" } },
      ],
    },
  });
  return NextResponse.json({
    user: client,
    upcoming,
    summary: {
      totalBookings: bookings.length,
      confirmedBookings: bookings.filter((b) => b.status === "CONFIRMED").length,
      totalAmount: total,
      paidAmount: paid,
      balance: Math.max(total - paid, 0),
      inquiryCount,
      activeTrips: bookings.filter((b) =>
        ["CONFIRMED", "IN_PROGRESS"].includes(b.status)
      ).length,
    },
  });
}
