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

    const normalizedPhone = normalizeJordanPhone(phone);

    // Check if patient already exists
    const existing = await checkPatient(normalizedPhone);
    if (existing.ok && Array.isArray(existing.data) && existing.data.length > 0) {
      const patient = existing.data[0];
      return NextResponse.json({
        exists: true,
        pid: patient.pid,
        pname: patient.pname,
      });
    }

    // Patient doesn't exist — need name to create
    if (!name) {
      return NextResponse.json({ exists: false });
    }

    // Create the profile
    const created = await createPatient(normalizedPhone, name);
    if (!created.ok) {
      return NextResponse.json(
        { error: "Failed to create patient profile" },
        { status: created.status }
      );
    }

    // Clinica doesn't return pid on create — fetch it
    const refetch = await checkPatient(normalizedPhone);
    if (refetch.ok && Array.isArray(refetch.data) && refetch.data.length > 0) {
      const patient = refetch.data[0];
      return NextResponse.json({
        exists: true,
        created: true,
        pid: patient.pid,
        pname: patient.pname,
      });
    }

    // Created but couldn't fetch pid — still proceed
    return NextResponse.json({
      exists: true,
      created: true,
      pid: "",
      pname: name,
    });
  } catch (err) {
    console.error("Clinica patient error:", err);
    return NextResponse.json(
      { error: "Service unavailable", detail: String(err) },
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
