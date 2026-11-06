import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/clientAuth";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ user: client });
}
