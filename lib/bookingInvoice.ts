import type { Booking, BookingHotelRoom } from "@prisma/client";
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";

const COMPANY_NAME = "NEXORA JOURNEYS";
const COMPANY_PHONE = "+44 7882 749006";
const COMPANY_ADDRESS = "Ibrahim Al Khalil Road, Makkah, Saudi Arabia";
const COMPANY_WEBSITE = "nexorajourneys.com";

function formatDate(value: Date | string | null | undefined, fallback = "Not provided") {
  if (!value) return fallback;
  const d = new Date(value);
  if (isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function display(value: string | number | null | undefined, fallback = "Not provided") {
  return value === null || value === undefined || String(value).trim() === "" ? fallback : String(value);
}

function calculateNights(start?: Date | null, end?: Date | null): string {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = e.getTime() - s.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} Night${diffDays > 1 ? "s" : ""}` : "";
}

type BookingWithRooms = Booking & {
  hotelRooms?: BookingHotelRoom[];
};

export interface InvoicePdfOptions {
  includePayment?: boolean;
}

export function createBookingInvoicePdf(
  booking: BookingWithRooms,
  options?: InvoicePdfOptions
): Promise<Buffer> {
  const includePayment = options?.includePayment !== false;
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: `Invoice ${booking.bookingNumber}`,
        Author: COMPANY_NAME,
      },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const left = 50;
    const contentWidth = 495;
    const labelWidth = 145;
    let y = 44;
    let rowNumber = 0;

    const logoPath = path.join(process.cwd(), "public", "images", "nexora-journeys-logo-transparent.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, left, y, { width: 150, height: 48, fit: [150, 48] });
    } else {
      doc.font("Helvetica-Bold").fontSize(18).fillColor("#18181b").text(COMPANY_NAME, left, y + 4);
    }

    // Service-specific invoice title badge
    let invoiceTitle = "INVOICE";
    let serviceBadge = "OFFICIAL BOOKING VOUCHER";
    switch (booking.serviceType) {
      case "UMRAH_HOTEL":
        invoiceTitle = "HOTEL VOUCHER & INVOICE";
        serviceBadge = "UMRAH HOTEL RESERVATION";
        break;
      case "UMRAH_TRANSPORT":
        invoiceTitle = "CHAUFFEUR & TRANSPORT INVOICE";
        serviceBadge = "UMRAH PRIVATE TRANSPORT";
        break;
      case "UMRAH_ZIYARAT":
        invoiceTitle = "ZIYARAT TOUR INVOICE";
        serviceBadge = "HOLY SITES GUIDED TOUR";
        break;
      case "UAE_CITY_TOUR":
        invoiceTitle = "CITY TOUR INVOICE";
        serviceBadge = "UAE SIGHTSEEING EXPERIENCE";
        break;
      case "DESERT_SAFARI":
        invoiceTitle = "DESERT SAFARI INVOICE";
        serviceBadge = "ARABIAN SAFARI ADVENTURE";
        break;
      case "CAR_RENTAL":
        invoiceTitle = "CAR RENTAL INVOICE";
        serviceBadge = "UAE VEHICLE RENTAL";
        break;
    }

    if (!includePayment) {
      invoiceTitle = invoiceTitle.replace(" & INVOICE", "").replace("INVOICE", "BOOKING VOUCHER");
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#18181b")
      .text(invoiceTitle, 260, y + 2, { width: 285, align: "right" });
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor("#c5a059")
      .text(serviceBadge, 260, y + 22, { width: 285, align: "right" });
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#71717a")
      .text(COMPANY_PHONE, 260, y + 34, { width: 285, align: "right" })
      .text(COMPANY_WEBSITE, 260, y + 45, { width: 285, align: "right" });
    y += 62;

    doc.font("Helvetica").fontSize(8).fillColor("#71717a");
    doc.text(COMPANY_NAME, left, y);
    doc.text(COMPANY_ADDRESS, left, y + 12);
    doc.text(`Invoice date: ${formatDate(new Date())}`, left, y + 24);
    doc.text(`Booking Reference: ${booking.bookingNumber}`, left, y + 36);
    if (booking.voucherNumber) {
      doc.text(`Voucher Number: ${booking.voucherNumber}`, left, y + 48);
    }
    y += booking.voucherNumber ? 62 : 54;

    const section = (title: string) => {
      if (y > 720) {
        doc.addPage();
        y = 48;
      }
      doc.font("Helvetica-Bold").fontSize(10).fillColor("#18181b").text(title.toUpperCase(), left, y);
      y += 16;
    };

    const row = (label: string, value: string) => {
      doc.font("Helvetica").fontSize(9);
      const valueHeight = doc.heightOfString(value, {
        width: contentWidth - labelWidth - 14,
        lineGap: 2,
      });
      const height = Math.max(24, valueHeight + 12);
      if (y + height > 765) {
        doc.addPage();
        y = 48;
      }
      doc.rect(left, y, contentWidth, height).fill(rowNumber++ % 2 === 0 ? "#fafafa" : "#ffffff");
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#71717a")
        .text(label.toUpperCase(), left + 10, y + 8, { width: labelWidth - 12 });
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#18181b")
        .text(value, left + labelWidth, y + 7, {
          width: contentWidth - labelWidth - 14,
          lineGap: 2,
        });
      y += height;
    };

    // 1. Customer Information
    section("Client & Guest Details");
    row("Client name", display(booking.customerName));
    row("Email address", display(booking.customerEmail));
    row("Phone / WhatsApp", display(booking.customerPhone));
    row("Nationality", display(booking.nationality || booking.customerCountry));
    row("Passport number", display(booking.passportNumber));

    // 2. Service-Specific Booking & Reservation Details
    switch (booking.serviceType) {
      case "UMRAH_HOTEL": {
        section("Hotel Reservation Details");
        row("Hotel name", display(booking.itemName));
        if (booking.pickupLocation || booking.itemCategory) {
          row("City / Location", display(booking.pickupLocation || booking.itemCategory));
        }
        row("Check-in date", formatDate(booking.pickupDate));
        row("Check-out date", formatDate(booking.returnDate));
        const nights = calculateNights(booking.pickupDate, booking.returnDate);
        if (nights) row("Total duration", nights);
        row("Total guests", display(booking.passengers));

        // Hotel room allocation
        const rooms = booking.hotelRooms || [];
        if (rooms.length > 0) {
          row("Total rooms", `${rooms.length} Room${rooms.length > 1 ? "s" : ""}`);
          rooms.forEach((r, idx) => {
            row(`Room ${r.roomNumber || idx + 1} Bed Type`, `${r.bedType} Bed`);
          });
        } else if (booking.bedsRequired) {
          row("Beds required", display(booking.bedsRequired));
        }
        if (booking.customerNotes) row("Special requirements", booking.customerNotes);
        break;
      }

      case "UMRAH_TRANSPORT": {
        section("Transport & Transfer Details");
        row("Vehicle reserved", display(booking.itemName));
        row("Route", display(booking.route));
        row("Travel date", formatDate(booking.pickupDate));
        if (booking.preferredTime) row("Pickup time", display(booking.preferredTime));
        row("Pickup location", display(booking.pickupLocation));
        row("Drop-off location", display(booking.dropoffLocation));
        row("Passengers", display(booking.passengers));
        if (booking.luggageCount !== null && booking.luggageCount !== undefined) {
          row("Luggage items", display(booking.luggageCount));
        }
        if (booking.assignedDriver) row("Assigned chauffeur", display(booking.assignedDriver));
        if (booking.customerNotes) row("Special requests", booking.customerNotes);
        break;
      }

      case "UMRAH_ZIYARAT": {
        section("Ziyarat Tour Details");
        row("Tour package", display(booking.itemName));
        if (booking.itemCategory) row("City / Holy sites", display(booking.itemCategory));
        if (booking.route) row("Vehicle type", display(booking.route));
        row("Tour date", formatDate(booking.pickupDate));
        if (booking.preferredTime) row("Preferred start time", display(booking.preferredTime));
        row("Pickup location", display(booking.pickupLocation));
        if (booking.dropoffLocation) row("Drop-off location", display(booking.dropoffLocation));
        row("Number of pilgrims", display(booking.passengers));
        if (booking.assignedDriver) row("Guide / Chauffeur", display(booking.assignedDriver));
        if (booking.customerNotes) row("Special requests", booking.customerNotes);
        break;
      }

      case "UAE_CITY_TOUR": {
        section("City Tour & Sightseeing Details");
        row("Tour name", display(booking.itemName));
        if (booking.itemCategory) row("Emirate / City", display(booking.itemCategory));
        row("Tour date", formatDate(booking.pickupDate));
        if (booking.preferredTime) row("Pickup time", display(booking.preferredTime));
        row("Pickup location", display(booking.pickupLocation));
        if (booking.dropoffLocation) row("Drop-off location", display(booking.dropoffLocation));
        row("Guests / Participants", display(booking.passengers));
        if (booking.assignedDriver) row("Assigned guide / vehicle", display(booking.assignedDriver));
        if (booking.customerNotes) row("Special requests", booking.customerNotes);
        break;
      }

      case "DESERT_SAFARI": {
        section("Desert Safari Package Details");
        row("Safari package", display(booking.itemName));
        if (booking.itemCategory) row("Package type", display(booking.itemCategory));
        row("Safari date", formatDate(booking.pickupDate));
        if (booking.preferredTime) row("Pickup timing", display(booking.preferredTime));
        row("Pickup location", display(booking.pickupLocation));
        if (booking.dropoffLocation) row("Drop-off location", display(booking.dropoffLocation));
        row("Total guests", display(booking.passengers));
        if (booking.assignedDriver) row("4x4 Marshall / Chauffeur", display(booking.assignedDriver));
        if (booking.customerNotes) row("Special requests", booking.customerNotes);
        break;
      }

      case "CAR_RENTAL": {
        section("Rental Vehicle Details");
        row("Rental vehicle", display(booking.itemName));
        if (booking.itemCategory) row("Vehicle category", display(booking.itemCategory));
        row("Rental start date", formatDate(booking.pickupDate));
        row("Rental end date", formatDate(booking.returnDate));
        const duration = calculateNights(booking.pickupDate, booking.returnDate);
        if (duration) row("Rental duration", duration.replace("Night", "Day"));
        row("Authorized passengers", display(booking.passengers));
        if (booking.pickupLocation) row("Delivery location", display(booking.pickupLocation));
        if (booking.dropoffLocation) row("Return location", display(booking.dropoffLocation));
        if (booking.assignedDriver) row("Assigned car / Plate", display(booking.assignedDriver));
        if (booking.customerNotes) row("Special requirements", booking.customerNotes);
        break;
      }

      default: {
        section("Service Details");
        row("Service requested", String(booking.serviceType || "Service").replaceAll("_", " "));
        row("Package / Item", display(booking.itemName));
        row("Service date", formatDate(booking.pickupDate));
        if (booking.returnDate) row("End date", formatDate(booking.returnDate));
        row("Guests / Passengers", display(booking.passengers));
        if (booking.pickupLocation) row("Pickup location", display(booking.pickupLocation));
        if (booking.dropoffLocation) row("Drop-off location", display(booking.dropoffLocation));
        if (booking.customerNotes) row("Special instructions", booking.customerNotes);
        break;
      }
    }

    // 3. Status & Payment Summary
    if (includePayment) {
      section("Payment & Billing Summary");
      row("Booking status", booking.status.replaceAll("_", " "));
      row("Payment status", booking.paymentStatus.replaceAll("_", " "));

      const total = booking.totalPrice || 0;
      const paid = booking.paidAmount || 0;
      const balance = Math.max(total - paid, 0);
      const amount = (value: number) =>
        `${booking.currency || "SAR"} ${value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      row("Total amount", amount(total));
      row("Amount paid", amount(paid));
      row("Remaining balance", amount(balance));
    } else {
      section("Booking Status");
      row("Reservation status", booking.status.replaceAll("_", " "));
    }

    if (y > 715) {
      doc.addPage();
      y = 48;
    }
    y += 14;
    doc.moveTo(left, y).lineTo(left + contentWidth, y).strokeColor("#c5a059").lineWidth(1.5).stroke();
    y += 12;
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor("#18181b")
      .text(COMPANY_NAME, left, y);
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#71717a")
      .text(`${COMPANY_PHONE}  |  ${COMPANY_WEBSITE}`, left, y + 12);
    doc.text("Thank you for choosing Nexora Journeys. Your comfort & satisfaction is our priority.", left, y + 24);

    doc.end();
  });
}
