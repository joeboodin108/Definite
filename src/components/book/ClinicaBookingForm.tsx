"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Step = "patient" | "doctor" | "datetime" | "confirm" | "success";

interface Doctor {
  hid: string;
  name: string;
}

interface TimeSlot {
  time: string;
}

export default function ClinicaBookingForm() {
  const t = useTranslations("Book");
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  // Step management
  const [step, setStep] = useState<Step>("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Patient info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [patientId, setPatientId] = useState("");

  // Doctor selection
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  // Date & time
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  // ── Step 1: Patient lookup / creation ──
  async function handlePatientSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check if patient exists
      const res = await fetch("/api/clinica/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("errorGeneral"));
        return;
      }

      if (data.exists && data.patient) {
        // Extract pid from response
        const pid =
          data.patient.pid ||
          data.patient.patient_id ||
          (Array.isArray(data.patient) ? data.patient[0]?.pid : null);
        if (pid) {
          setPatientId(String(pid));
        }
      }

      // Move to doctor selection and fetch doctors
      await fetchDoctors();
      setStep("doctor");
    } catch {
      setError(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  }

  async function fetchDoctors() {
    const res = await fetch("/api/clinica/doctors");
    const data = await res.json();

    if (Array.isArray(data)) {
      // Map whatever format Clinica returns
      const mapped = data.map((d: Record<string, unknown>) => ({
        hid: String(d.hid || d.id || d.clinic_id || ""),
        name: String(
          d.name || d.clinic_name || d.doctor_name || d.title || ""
        ),
      }));
      setDoctors(mapped);
    } else if (data.doctors || data.clinics || data.data) {
      const list = data.doctors || data.clinics || data.data;
      if (Array.isArray(list)) {
        const mapped = list.map((d: Record<string, unknown>) => ({
          hid: String(d.hid || d.id || d.clinic_id || ""),
          name: String(
            d.name || d.clinic_name || d.doctor_name || d.title || ""
          ),
        }));
        setDoctors(mapped);
      }
    }
  }

  // ── Step 2: Doctor selection ──
  function handleDoctorSelect(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!selectedDoctor) return;
    setStep("datetime");
  }

  // ── Step 3: Fetch time slots when date changes ──
  useEffect(() => {
    if (step !== "datetime" || !selectedDate || !selectedDoctor) return;

    setLoadingSlots(true);
    setSelectedTime("");
    setTimeSlots([]);

    fetch("/api/clinica/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hid: selectedDoctor, date: selectedDate }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((s: Record<string, unknown>) => ({
            time: String(s.time || s.slot || s.apptime || s),
          }));
          setTimeSlots(mapped);
        } else if (data.slots || data.times || data.data) {
          const list = data.slots || data.times || data.data;
          if (Array.isArray(list)) {
            const mapped = list.map((s: Record<string, unknown>) => ({
              time: String(s.time || s.slot || s.apptime || s),
            }));
            setTimeSlots(mapped);
          }
        }
      })
      .catch(() => setError(t("errorGeneral")))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedDoctor, step, t]);

  function handleDateTimeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setStep("confirm");
  }

  // ── Step 4: Confirm & book ──
  async function handleConfirm() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/clinica/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hid: selectedDoctor,
          date: selectedDate,
          pid: patientId,
          time: selectedTime,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("errorGeneral"));
        return;
      }

      setStep("success");
    } catch {
      setError(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  }

  // ── Reset ──
  function resetForm() {
    setStep("patient");
    setName("");
    setPhone("");
    setPatientId("");
    setDoctors([]);
    setSelectedDoctor("");
    setSelectedDoctorName("");
    setSelectedDate("");
    setTimeSlots([]);
    setSelectedTime("");
    setError("");
  }

  // ── Styling ──
  const inputClass =
    "w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-dark outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10";
  const selectClass =
    "w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-dark outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer";
  const btnPrimary =
    "w-full rounded-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const btnOutline =
    "w-full rounded-full border-2 border-primary py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-white";

  // ── Step indicators ──
  const steps: Step[] = ["patient", "doctor", "datetime", "confirm"];
  const stepIndex = steps.indexOf(step);
  const stepLabels = [t("stepPatient"), t("stepDoctor"), t("stepDateTime"), t("stepConfirm")];

  // ── SUCCESS ──
  if (step === "success") {
    return (
      <div className="text-center py-12 animate-fade-in">
        <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
        <h3
          className={`mt-6 ${headingFont} text-3xl font-bold text-primary`}
        >
          {t("successTitle")}
        </h3>
        <p className="mt-4 text-mid max-w-md mx-auto">
          {t("successMessage")}
        </p>
        <button onClick={resetForm} className={`mt-8 ${btnOutline} max-w-xs mx-auto`}>
          {t("bookAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Step Progress */}
      <div className="mb-10 flex items-center justify-between">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i <= stepIndex
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-mid"
                }`}
              >
                {i < stepIndex ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`mt-1.5 text-[0.65rem] font-medium tracking-wide ${
                  i <= stepIndex ? "text-primary" : "text-mid"
                }`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`h-px flex-1 -mt-4 ${
                  i < stepIndex ? "bg-primary" : "bg-primary/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* STEP 1: Patient Info */}
      {step === "patient" && (
        <form onSubmit={handlePatientSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark">
              {t("fullName")} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isArabic ? "مثال: أحمد محمد" : "e.g. Ahmad Mohammad"}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark">
              {t("phone")} *
            </label>
            <input
              type="tel"
              required
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07X XXXX XXX"
              className={inputClass}
            />
          </div>
          <button type="submit" disabled={loading} className={btnPrimary}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("next")}
          </button>
        </form>
      )}

      {/* STEP 2: Select Doctor */}
      {step === "doctor" && (
        <form onSubmit={handleDoctorSelect} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark">
              {t("selectDoctor")} *
            </label>
            <div className="relative">
              <select
                required
                value={selectedDoctor}
                onChange={(e) => {
                  setSelectedDoctor(e.target.value);
                  const doc = doctors.find((d) => d.hid === e.target.value);
                  setSelectedDoctorName(doc?.name || "");
                }}
                className={selectClass}
              >
                <option value="">
                  {isArabic ? "اختر الطبيب / العيادة" : "Choose doctor / clinic"}
                </option>
                {doctors.map((d) => (
                  <option key={d.hid} value={d.hid}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mid" />
            </div>
            {doctors.length === 0 && (
              <p className="mt-2 text-xs text-mid">{t("noDoctors")}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("patient")}
              className={btnOutline}
            >
              {t("back")}
            </button>
            <button
              type="submit"
              disabled={!selectedDoctor}
              className={btnPrimary}
            >
              {t("next")}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Date & Time */}
      {step === "datetime" && (
        <form onSubmit={handleDateTimeSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark">
              {t("date")} *
            </label>
            <input
              type="date"
              required
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {selectedDate && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark">
                {t("time")} *
              </label>
              {loadingSlots ? (
                <div className="flex items-center gap-2 py-3 text-sm text-mid">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("loadingSlots")}
                </div>
              ) : timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? "border-primary bg-primary text-white"
                          : "border-primary/10 bg-white text-dark hover:border-primary/30"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="py-3 text-sm text-mid">{t("noSlots")}</p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("doctor")}
              className={btnOutline}
            >
              {t("back")}
            </button>
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className={btnPrimary}
            >
              {t("next")}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Confirm */}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/10 bg-primary-light p-6 space-y-4">
            <h3
              className={`${headingFont} text-xl font-bold text-primary`}
            >
              {t("confirmTitle")}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mid">{t("fullName")}</span>
                <span className="font-medium text-dark">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("phone")}</span>
                <span className="font-medium text-dark" dir="ltr">
                  {phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("doctor")}</span>
                <span className="font-medium text-dark">
                  {selectedDoctorName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("date")}</span>
                <span className="font-medium text-dark">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("time")}</span>
                <span className="font-medium text-dark">{selectedTime}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("datetime")}
              className={btnOutline}
            >
              {t("back")}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={btnPrimary}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("submit")}
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp fallback */}
      <div className="mt-10 text-center">
        <p className="text-sm text-mid">{t("whatsappAlt")}</p>
        <a
          href="https://wa.me/962795919919"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1da851] hover:shadow-lg"
        >
          {t("whatsappBtn")}
        </a>
      </div>
    </div>
  );
}
