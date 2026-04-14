const BASE_URL = process.env.CLINICA_BASE_URL || "";
const USERNAME = process.env.CLINICA_USERNAME || "";
const PASSWORD = process.env.CLINICA_PASSWORD || "";
const CALENDAR_ID = process.env.CLINICA_CALENDAR_ID || "";
const ACCOUNT_ID = process.env.CLINICA_ACCOUNT_ID || "";

if (!BASE_URL || !USERNAME || !PASSWORD || !CALENDAR_ID || !ACCOUNT_ID) {
  console.error("Missing Clinica env vars:", {
    BASE_URL: !!BASE_URL,
    USERNAME: !!USERNAME,
    PASSWORD: !!PASSWORD,
    CALENDAR_ID: !!CALENDAR_ID,
    ACCOUNT_ID: !!ACCOUNT_ID,
  });
}

interface ClinicaSession {
  sessid: string;
  session_name: string;
  token: string;
  expiresAt: number;
}

let cachedSession: ClinicaSession | null = null;

async function getSession(): Promise<ClinicaSession> {
  // Reuse session if it's less than 10 minutes old
  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return cachedSession;
  }

  const res = await fetch(`${BASE_URL}/api/calendar/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });

  if (!res.ok) {
    throw new Error("Failed to authenticate with Clinica");
  }

  const data = await res.json();
  cachedSession = {
    sessid: data.sessid,
    session_name: data.session_name,
    token: data.token,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
  };

  return cachedSession;
}

async function clinicaFetch(path: string, body: Record<string, unknown>) {
  const session = await getSession();

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": session.token,
      Cookie: `${session.session_name}=${session.sessid}`,
    },
    body: JSON.stringify({
      calendarid: CALENDAR_ID,
      aid: ACCOUNT_ID,
      ...body,
    }),
  });

  const text = await res.text();

  // The Clinica API sometimes returns HTML error pages instead of JSON.
  // Detect this and return a structured error instead of crashing.
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    console.error(
      `[clinica] Non-JSON response from ${path} (status ${res.status}):`,
      text.slice(0, 200)
    );
    // Only invalidate the session for auth-related failures (401/403),
    // not for 500s which the Clinica API returns when a date has no schedule.
    if (res.status === 401 || res.status === 403) {
      cachedSession = null;
    }
    return { ok: false, status: res.status || 502, data: { error: "Invalid response from clinic system" } };
  }

  return { ok: res.ok, status: res.status, data };
}

/** Get available doctors/clinics */
export async function getDoctors() {
  return clinicaFetch("/api/calendar/calendar_clinica/calendar", {});
}

/** Get available time slots for a doctor on a date */
export async function getTimeSlots(hid: string, date: string) {
  return clinicaFetch("/api/calendar/calendar_clinica/time", {
    hid,
    calendardate: date,
  });
}

/** Check if patient exists by phone number */
export async function checkPatient(phone: string) {
  return clinicaFetch("/api/calendar/calendar_clinica/existing_profile", {
    pmobile: phone,
  });
}

/** Create a new patient profile */
export async function createPatient(phone: string, name: string) {
  const encodedName = Buffer.from(name).toString("base64");
  return clinicaFetch("/api/calendar/calendar_clinica/create_profile", {
    pmobile: phone,
    pname: encodedName,
  });
}

/** Submit an appointment */
export async function createAppointment(
  hid: string,
  date: string,
  pid: string,
  time: string
) {
  return clinicaFetch("/api/calendar/calendar_clinica/create_appointment", {
    hid,
    appdate: date,
    pid,
    apptime: time,
  });
}
