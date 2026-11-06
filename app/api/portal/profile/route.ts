import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";

export async function PATCH(req: NextRequest) {
  const current = await getCurrentClient();
  if (!current) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, phone, country } = await req.json();
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const client = await prisma.clientUser.update({
    where: { id: current.id },
    data: {
      name: name.trim(),
      phone: typeof phone === "string" ? phone.trim() || null : null,
      country: typeof country === "string" ? country.trim() || null : null,
    },
    select: { id: true, name: true, email: true, phone: true, country: true },
  });
  return NextResponse.json({ user: client });
}
