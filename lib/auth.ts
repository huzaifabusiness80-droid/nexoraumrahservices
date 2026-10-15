import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_secure_portal_jwt_secret_key_8492048";
export const AUTH_COOKIE_NAME = "nexora_admin_token";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Check if hash is plain text (e.g. initial seed) or bcrypt hash
  if (!hash.startsWith("$2a$") && !hash.startsWith("$2b$")) {
    return password === hash;
  }
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { id: string; email: string; name: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string; email: string; name: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    });

    return user;
  } catch {
    return null;
  }
}
