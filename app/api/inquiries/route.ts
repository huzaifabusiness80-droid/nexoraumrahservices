import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required" },
        { status: 400 }
      );
    }

    let client = await getCurrentClient();
    if (!client && email) {
      client = await prisma.clientUser.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true, email: true, name: true, phone: true, country: true, avatar: true },
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        clientId: client?.id || null,
        name,
        email: email || "No email provided",
        phone,
        service: body.service ? String(body.service) : null,
        subject: body.subject ? String(body.subject) : null,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Website inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to submit your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
