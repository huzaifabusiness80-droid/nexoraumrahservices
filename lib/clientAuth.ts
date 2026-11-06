import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./prisma";

const JWT_SECRET =
  process.env.CLIENT_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "nexora_client_portal_secret_key_8492048";

export const CLIENT_AUTH_COOKIE_NAME = "nexora_client_token";

export async function hashClientPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyClientPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signClientToken(payload: {
  id: string;
  email: string;
  name: string;
}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyClientToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
    };
  } catch {
    return null;
  }
}

export async function getCurrentClient() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(CLIENT_AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = verifyClientToken(token);
    if (!decoded) return null;

    return prisma.clientUser.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        country: true,
        avatar: true,
      },
    });
  } catch {
    return null;
  }
}
