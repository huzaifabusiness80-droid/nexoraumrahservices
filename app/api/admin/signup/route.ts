import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existing = await prisma.adminUser.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({ error: "An admin with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = await prisma.adminUser.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: role || "ADMIN",
      },
    });

    const token = signToken({
      id: newAdmin.id,
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup API error:", error);
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
  }
}
