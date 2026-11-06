import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await getCurrentClient();
  if (!client) return new NextResponse("Unauthorized", { status: 401 });

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      OR: [
        { clientId: client.id },
        { clientId: null, customerEmail: { equals: client.email, mode: "insensitive" } },
      ],
    },
  });
  if (!booking) return new NextResponse("Document not found", { status: 404 });

  const isInvoice = req.nextUrl.searchParams.get("type") === "invoice";
  const type = isInvoice ? "INVOICE" : "BOOKING CONFIRMATION";
  const total = booking.totalPrice || 0;
  const paid = booking.paidAmount || 0;
  const balance = Math.max(total - paid, 0);
  const travelDate = booking.pickupDate
    ? new Date(booking.pickupDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : "To be confirmed";
  const issuedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const serviceName = booking.serviceType.replaceAll("_", " ");
  const itemName = booking.itemName || booking.route || "-";
  const amount = (value: number) => `${booking.currency} ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50, info: { Title: `${type} ${booking.bookingNumber}`, Author: "Nexora Journeys" } });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const logoPath = path.join(process.cwd(), "public", "images", "nexora-journeys-logo-transparent.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 42, { width: 180 });
    } else {
      doc.font("Helvetica-Bold").fontSize(18).fillColor("#18181b").text("NEXORA JOURNEYS", 50, 48);
    }

    doc.font("Helvetica-Bold").fontSize(22).fillColor("#18181b").text(type, 360, 48, { width: 185, align: "right" });
    doc.font("Helvetica").fontSize(9).fillColor("#71717a").text(`Issued: ${issuedDate}`, 360, 76, { width: 185, align: "right" });
    doc.moveTo(50, 112).lineTo(545, 112).strokeColor("#c5a059").lineWidth(2).stroke();

    doc.roundedRect(50, 132, 495, 82, 5).fill("#f8f8f5");
    doc.fillColor("#18181b").font("Helvetica-Bold").fontSize(10).text("BOOKING REFERENCE", 68, 148);
    doc.fontSize(16).text(booking.bookingNumber, 68, 166);
    doc.font("Helvetica-Bold").fontSize(10).text("CUSTOMER", 330, 148);
    doc.font("Helvetica").fontSize(11).text(booking.customerName, 330, 166, { width: 195 });
    doc.fontSize(9).fillColor("#71717a").text(booking.customerEmail || booking.customerPhone || "", 330, 184, { width: 195 });

    let y = 238;
    doc.fillColor("#18181b").font("Helvetica-Bold").fontSize(12).text("TRAVEL DETAILS", 50, y);
    y += 20;
    const details = [
      ["Service", serviceName],
      ["Hotel / Vehicle / Package", itemName],
      ["Travel Date", travelDate],
      ["Pickup Location", booking.pickupLocation || "To be confirmed"],
      ["Passengers", String(booking.passengers || 1)],
    ];
    details.forEach(([label, value], index) => {
      const rowY = y + index * 30;
      doc.rect(50, rowY, 495, 30).fill(index % 2 === 0 ? "#ffffff" : "#fafafa");
      doc.fillColor("#71717a").font("Helvetica").fontSize(9).text(label.toUpperCase(), 62, rowY + 10, { width: 155 });
      doc.fillColor("#18181b").font("Helvetica-Bold").fontSize(10).text(value || "-", 225, rowY + 9, { width: 305, lineBreak: false });
    });

    if (isInvoice) {
      y += 170;
      doc.fillColor("#18181b").font("Helvetica-Bold").fontSize(12).text("PAYMENT SUMMARY", 50, y);
      y += 20;
      const summary = [
        ["Total Amount", amount(total)],
        ["Amount Paid", amount(paid)],
        ["Remaining Balance", amount(balance)],
      ];
      summary.forEach(([label, value], index) => {
        const rowY = y + index * 34;
        const highlight = index === 2;
        doc.rect(50, rowY, 495, 34).fill(highlight ? "#18181b" : index === 1 ? "#f1f5f9" : "#fafafa");
        doc.fillColor(highlight ? "#ffffff" : "#71717a").font("Helvetica-Bold").fontSize(10).text(label.toUpperCase(), 62, rowY + 11, { width: 220 });
        doc.fillColor(highlight ? "#d7bd86" : "#18181b").font("Helvetica-Bold").fontSize(12).text(value, 330, rowY + 10, { width: 200, align: "right" });
      });
    }

    doc.moveTo(50, 748).lineTo(545, 748).strokeColor("#e4e4e7").lineWidth(1).stroke();
    doc.font("Helvetica-Bold").fontSize(9).fillColor("#18181b").text("NEXORA JOURNEYS", 50, 760);
    doc.font("Helvetica").fontSize(8).fillColor("#71717a").text(
      "Professional travel, transport and hospitality services across Saudi Arabia and the UAE.",
      50,
      774,
      { width: 495 }
    );
    doc.text("This document is computer-generated and may be verified using the booking reference above.", 50, 789, { width: 495 });

    doc.end();
  });

  const filename = `${booking.bookingNumber}-${isInvoice ? "invoice" : "confirmation"}.pdf`;
  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
