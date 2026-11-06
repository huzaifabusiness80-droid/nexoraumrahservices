import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentClient } from "@/lib/clientAuth";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.inquiry.updateMany({
    where: {
      clientId: null,
      email: { equals: client.email, mode: "insensitive" },
    },
    data: { clientId: client.id },
  });

  const inquiries = await prisma.inquiry.findMany({
    where: {
      OR: [
        { clientId: client.id },
        { clientId: null, email: { equals: client.email, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ inquiries });
}
