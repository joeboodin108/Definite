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
    console.log("[slots] Request — hid:", hid, "date:", date);
    const result = await getTimeSlots(hid, date);
    console.log("[slots] Clinica response — ok:", result.ok, "status:", result.status, "data:", JSON.stringify(result.data));

    // The Clinica API returns 500 + HTML error page when a date has no
    // schedule configured (doctor's day off, holiday, etc.).  This is not
    // a real server error — treat it as "no slots available" so the UI
    // shows the friendly "pick another day" message instead of a scary error.
    if (!result.ok) {
      if (result.status === 500) {
        return NextResponse.json([]);
      }
      return NextResponse.json(
        { error: "Failed to fetch time slots" },
        { status: result.status }
      );
    }
    return NextResponse.json(result.data);
  } catch (err) {
    console.error("[slots] Exception:", err);
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }
}
