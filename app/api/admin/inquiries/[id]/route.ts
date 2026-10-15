import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
