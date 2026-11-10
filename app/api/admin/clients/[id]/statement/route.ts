import { NextRequest, NextResponse } from "next/server";
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

    // 1. Fetch all bookings for this client
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

      // 2. Fetch all ClientPayment records for this client
      const payments = await prisma.clientPayment.findMany({
        where: { clientId: id },
        orderBy: [{ date: "asc" }, { createdAt: "asc" }],
        include: {
          booking: {
            select: {
              id: true,
              bookingNumber: true,
              itemName: true,
              serviceType: true,
            },
          },
        },
      });

      // Track which bookings have payments recorded in ClientPayment
      const paymentsByBooking: Record<string, number> = {};
      payments.forEach((p) => {
        if (p.bookingId) {
          paymentsByBooking[p.bookingId] = (paymentsByBooking[p.bookingId] || 0) + p.amount;
        }
      });

      // Build ledger entries
      interface RawEntry {
        id: string;
        rawDate: Date;
        bookingNumber?: string;
        type: string;
        particulars: string;
        debit: number;
        credit: number;
        currency: string;
        paymentStatus?: string;
        bookingStatus?: string;
        isPayment?: boolean;
        paymentMethod?: string;
        reference?: string | null;
        notes?: string | null;
      }

      const rawEntries: RawEntry[] = [];

      // Add bookings (Debits)
      bookings.forEach((booking) => {
        const debit = Number(booking.totalPrice || 0);
        const bookedPaid = Number(booking.paidAmount || 0);
        const paymentsRecorded = paymentsByBooking[booking.id] || 0;
        // If legacy paidAmount exists without explicit ClientPayment rows, record the legacy credit
        const legacyCredit = Math.max(0, bookedPaid - paymentsRecorded);

        const particulars =
          booking.itemName ||
          booking.route ||
          booking.pickupLocation ||
          booking.serviceType.replace(/_/g, " ");

          rawEntries.push({
            id: booking.id,
            rawDate: booking.createdAt,
            bookingNumber: booking.bookingNumber,
            type: "Booking",
            particulars: `${booking.bookingNumber.slice(-8)} — ${particulars}`,
            debit,
            credit: legacyCredit,
            currency: booking.currency || "SAR",
            paymentStatus: booking.paymentStatus,
            bookingStatus: booking.status,
            isPayment: false,
          });
        });

      // Add ClientPayments (Credits)
      payments.forEach((payment) => {
        const bRef = payment.booking
          ? ` · For #${payment.booking.bookingNumber.slice(-8)} (${payment.booking.itemName || payment.booking.serviceType.replace(/_/g, " ")})`
          : " · General Account Payment";

        const refText = payment.reference ? ` · Ref: ${payment.reference}` : "";
        const noteText = payment.notes ? ` · Note: ${payment.notes}` : "";

        rawEntries.push({
          id: payment.id,
          rawDate: payment.date || payment.createdAt,
          bookingNumber: payment.booking?.bookingNumber,
          type: "Receipt",
          particulars: `Payment Received (${payment.paymentMethod})${refText}${bRef}${noteText}`,
          debit: 0,
          credit: Number(payment.amount || 0),
          currency: payment.currency || "SAR",
          paymentStatus: "PAID",
          bookingStatus: "CONFIRMED",
          isPayment: true,
          paymentMethod: payment.paymentMethod,
          reference: payment.reference,
          notes: payment.notes,
        });
      });

      // Sort chronologically
      rawEntries.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

      // Calculate running balance
      let runningBalance = 0;
      const entries = rawEntries.map((e) => {
        runningBalance += e.debit - e.credit;
        return {
          id: e.id,
          bookingNumber: e.bookingNumber || "—",
          date: e.rawDate.toISOString(),
          type: e.type,
          particulars: e.particulars,
          debit: e.debit,
          credit: e.credit,
          balance: runningBalance,
          currency: e.currency,
          paymentStatus: e.paymentStatus || "",
          bookingStatus: e.bookingStatus || "",
          isPayment: e.isPayment,
          paymentMethod: e.paymentMethod,
          reference: e.reference,
          notes: e.notes,
        };
      });

      const summary = entries.reduce(
        (totals, entry) => ({
          totalDebit: totals.totalDebit + entry.debit,
          totalCredit: totals.totalCredit + entry.credit,
        }),
      { totalDebit: 0, totalCredit: 0 }
      );

      return NextResponse.json({
        success: true,
        client,
        entries,
        bookings: bookings.map((b) => ({
          id: b.id,
          bookingNumber: b.bookingNumber,
          itemName: b.itemName,
          serviceType: b.serviceType,
          totalPrice: b.totalPrice,
          paidAmount: b.paidAmount,
          currency: b.currency,
          remainingBalance: Math.max(0, (b.totalPrice || 0) - (b.paidAmount || 0)),
        })),
        summary: {
          totalDebit: summary.totalDebit,
          totalCredit: summary.totalCredit,
          balance: summary.totalDebit - summary.totalCredit,
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

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { id } = await params;
      const body = await req.json();
      const {
        amount,
        currency,
        paymentMethod,
        reference,
        notes,
        date,
        bookingId,
      } = body;

      const numAmount = Number(amount);
      if (!numAmount || numAmount <= 0) {
        return NextResponse.json(
          { error: "A valid payment amount greater than zero is required." },
          { status: 400 }
        );
      }

      const client = await prisma.clientUser.findUnique({ where: { id } });
      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 });
      }

      // 1. Create the ClientPayment entry (Credit)
      const payment = await prisma.clientPayment.create({
        data: {
          clientId: id,
          bookingId: bookingId && bookingId !== "GENERAL" ? bookingId : null,
          amount: numAmount,
          currency: currency || "SAR",
          paymentMethod: paymentMethod || "Cash",
          reference: reference ? String(reference).trim() : null,
          notes: notes ? String(notes).trim() : null,
          date: date ? new Date(date) : new Date(),
        },
      });

      // 2. If applied to a specific booking, update that booking's paidAmount and paymentStatus
      if (bookingId && bookingId !== "GENERAL") {
        const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
        if (booking) {
          const currentPaid = booking.paidAmount || 0;
          const newPaid = currentPaid + numAmount;
          const total = booking.totalPrice || 0;

          let newStatus: any = booking.paymentStatus;
          if (total > 0) {
            if (newPaid >= total) {
              newStatus = "PAID";
            } else if (newPaid > 0) {
              newStatus = "PARTIAL";
            }
          } else if (newPaid > 0) {
            newStatus = "PAID";
          }

          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paidAmount: newPaid,
              paymentStatus: newStatus,
            },
          });
        }
      }

      return NextResponse.json({ success: true, payment });
    } catch (error: any) {
      console.error("Client payment error:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to record payment" },
        { status: 500 }
      );
    }
  }

  export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { id } = await params;
      const { searchParams } = new URL(req.url);
      const paymentId = searchParams.get("paymentId");

      if (!paymentId) {
        return NextResponse.json({ error: "Payment ID is required" }, { status: 400 });
      }

      const payment = await prisma.clientPayment.findUnique({
        where: { id: paymentId },
      });

      if (!payment || payment.clientId !== id) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }

      // If payment was linked to a booking, adjust the booking's paidAmount
      if (payment.bookingId) {
        const booking = await prisma.booking.findUnique({
          where: { id: payment.bookingId },
        });
        if (booking) {
          const adjustedPaid = Math.max(0, (booking.paidAmount || 0) - payment.amount);
          const total = booking.totalPrice || 0;
          let newStatus: any = booking.paymentStatus;
          if (adjustedPaid === 0) {
            newStatus = "UNPAID";
          } else if (total > 0 && adjustedPaid < total) {
            newStatus = "PARTIAL";
          }
          await prisma.booking.update({
            where: { id: payment.bookingId },
            data: {
              paidAmount: adjustedPaid,
              paymentStatus: newStatus,
            },
          });
        }
      }

      await prisma.clientPayment.delete({ where: { id: paymentId } });

      return NextResponse.json({ success: true, message: "Payment removed" });
    } catch (error: any) {
      console.error("Delete payment error:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to delete payment" },
        { status: 500 }
      );
    }
  }
