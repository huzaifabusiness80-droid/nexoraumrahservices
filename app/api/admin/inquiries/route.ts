import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, subject, message } = body;
    const client = await getCurrentClient();

    const inquiry = await prisma.inquiry.create({
      data: {
        clientId: client?.id || null,
        name,
        email,
        phone,
        service: service || null,
        subject: subject || null,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
