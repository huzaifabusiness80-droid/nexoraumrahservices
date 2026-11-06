import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  CLIENT_AUTH_COOKIE_NAME,
  signClientToken,
  verifyClientPassword,
} from "@/lib/clientAuth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!cleanEmail || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const client = await prisma.clientUser.findUnique({ where: { email: cleanEmail } });
  if (!client || !(await verifyClientPassword(String(password), client.password))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await prisma.booking.updateMany({
    where: {
      clientId: null,
      customerEmail: { equals: cleanEmail, mode: "insensitive" },
    },
    data: { clientId: client.id },
  });
  await prisma.inquiry.updateMany({
    where: {
      clientId: null,
      email: { equals: cleanEmail, mode: "insensitive" },
    },
    data: { clientId: client.id },
  });

  const token = signClientToken({ id: client.id, email: client.email, name: client.name });
  const response = NextResponse.json({
    success: true,
    user: {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      country: client.country,
    },
  });
  response.cookies.set({
    name: CLIENT_AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
