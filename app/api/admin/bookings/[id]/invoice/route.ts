import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { createBookingInvoicePdf } from "@/lib/bookingInvoice";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getCurrentAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        hotelRooms: { orderBy: { roomNumber: "asc" } },
      },
    });
    if (!booking) return new NextResponse("Booking not found", { status: 404 });

    const pdf = await createBookingInvoicePdf(booking as any);
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${booking.bookingNumber}-invoice.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Admin booking invoice error:", error);
    return NextResponse.json({ error: "Unable to generate booking invoice" }, { status: 500 });
  }
}
