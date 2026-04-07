import { NextRequest, NextResponse } from "next/server";
import { getTimeSlots } from "@/lib/clinica";

export async function POST(req: NextRequest) {
  try {
    const { hid, date } = await req.json();
    if (!hid || !date) {
      return NextResponse.json(
        { error: "hid and date are required" },
        { status: 400 }
      );
    }
    const result = await getTimeSlots(hid, date);
    if (!result.ok) {
      return NextResponse.json(
        { error: "Failed to fetch time slots" },
        { status: result.status }
      );
    }
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }
}
