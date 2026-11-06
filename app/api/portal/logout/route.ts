import { NextResponse } from "next/server";
import { CLIENT_AUTH_COOKIE_NAME } from "@/lib/clientAuth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CLIENT_AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
