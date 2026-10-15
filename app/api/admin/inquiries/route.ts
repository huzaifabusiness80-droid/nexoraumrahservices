import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
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

    const inquiry = await prisma.inquiry.create({
      data: {
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
