import { NextRequest, NextResponse } from "next/server";
import { createAppointment } from "@/lib/clinica";

export async function POST(req: NextRequest) {
  try {
    const { hid, date, pid, time } = await req.json();
    if (!hid || !date || !pid || !time) {
      return NextResponse.json(
        { error: "hid, date, pid, and time are required" },
        { status: 400 }
      );
    }

    const result = await createAppointment(hid, date, pid, time);
    if (!result.ok) {
      return NextResponse.json(
        { error: "Failed to create appointment" },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }
}
