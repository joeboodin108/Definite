import { NextResponse } from "next/server";
import { getDoctors } from "@/lib/clinica";

export async function GET() {
  try {
    const result = await getDoctors();
    if (!result.ok) {
      return NextResponse.json(
        { error: "Failed to fetch doctors" },
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
