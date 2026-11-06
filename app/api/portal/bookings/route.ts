import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/clientAuth";
import { linkAndGetClientBookings } from "@/lib/clientBookings";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = await linkAndGetClientBookings(client);
  return NextResponse.json({ bookings });
}
