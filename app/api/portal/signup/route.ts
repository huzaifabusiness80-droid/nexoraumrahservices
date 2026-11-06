import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  CLIENT_AUTH_COOKIE_NAME,
  hashClientPassword,
  signClientToken,
} from "@/lib/clientAuth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, country, password } = await req.json();
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanName = typeof name === "string" ? name.trim() : "";

    if (!cleanName || !cleanEmail || !password || String(password).length < 8) {
      return NextResponse.json(
        { error: "Name, email, and an 8-character password are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.clientUser.findUnique({
      where: { email: cleanEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const client = await prisma.clientUser.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: typeof phone === "string" ? phone.trim() || null : null,
        country: typeof country === "string" ? country.trim() || null : null,
        password: await hashClientPassword(String(password)),
      },
    });

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

    const token = signClientToken({
      id: client.id,
      email: client.email,
      name: client.name,
    });
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
  } catch (error: any) {
    console.error("Client signup error:", error);
    return NextResponse.json(
      { error: "Unable to create your account. Please try again." },
      { status: 500 }
    );
  }
}
