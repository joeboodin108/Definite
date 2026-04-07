import { NextRequest, NextResponse } from "next/server";
import { checkPatient, createPatient } from "@/lib/clinica";

export async function POST(req: NextRequest) {
  try {
    const { phone, name } = await req.json();
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Normalize phone: add 962 prefix if needed
    const normalizedPhone = normalizeJordanPhone(phone);

    // Check if patient exists
    const existing = await checkPatient(normalizedPhone);
    if (existing.ok && existing.data?.flag === true) {
      // Patient exists — return their info
      return NextResponse.json({
        exists: true,
        patient: existing.data,
      });
    }

    // Patient doesn't exist — create if name provided
    if (!name) {
      return NextResponse.json({ exists: false });
    }

    const created = await createPatient(normalizedPhone, name);
    if (!created.ok) {
      return NextResponse.json(
        { error: "Failed to create patient profile" },
        { status: created.status }
      );
    }

    return NextResponse.json({
      exists: true,
      created: true,
      patient: created.data,
    });
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }
}

function normalizeJordanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("962")) return digits;
  if (digits.startsWith("0")) return "962" + digits.slice(1);
  return "962" + digits;
}
