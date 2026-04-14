"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Loader2, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import InlineCalendar from "./InlineCalendar";
import { ONLINE_BOOKING_HID, getBookableServices, isBookableOnline } from "@/lib/booking-config";

/**
 * Normalizes user input to a 9-digit local number (7XXXXXXXX).
 * Handles: "07XXXXXXXX" → "7XXXXXXXX", "7XXXXXXXX" → "7XXXXXXXX"
 */
function normalizeLocalNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** Validates that the normalized local number is a valid Jordanian mobile (9 digits, starts with 7[789]) */
function isValidJordanLocal(localDigits: string): boolean {
  return /^7[789]\d{7}$/.test(localDigits);
}

type Step = "service" | "patient" | "datetime" | "confirm" | "success";

interface TimeSlot {
  time: string;
}

interface ClinicaBookingFormProps {
  preSelectedService?: string;
}

export default function ClinicaBookingForm({ preSelectedService }: ClinicaBookingFormProps) {
  const t = useTranslations("Book");
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  const bookableServices = getBookableServices();

  // Step management
  const [step, setStep] = useState<Step>("service");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Service selection
  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("");

  // Patient info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [patientId, setPatientId] = useState("");

  // Date & time
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);

  // Pre-select service from URL query param
  useEffect(() => {
    if (preSelectedService && isBookableOnline(preSelectedService)) {
      const svc = bookableServices.find((s) => s.slug === preSelectedService);
      if (svc) {
        setSelectedServiceSlug(svc.slug);
        setSelectedServiceName(svc.title[locale]);
        setStep("patient");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Step 1: Service selection ──
  function handleServiceSelect(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!selectedServiceSlug) return;
    setStep("patient");
  }

  // ── Step 2: Patient lookup / creation ──
  async function handlePatientSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const localDigits = normalizeLocalNumber(phone);
    if (!isValidJordanLocal(localDigits)) {
      setError(t("invalidPhone"));
      return;
    }

    const fullPhone = "962" + localDigits;
    setLoading(true);

    try {
      const res = await fetch("/api/clinica/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("errorGeneral"));
        return;
      }

      if (data.exists && data.pid) {
        setPatientId(String(data.pid));
      }

      setStep("datetime");
    } catch {
      setError(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  }

  // ── Step 3: Fetch time slots when date changes ──
  useEffect(() => {
    if (step !== "datetime" || !selectedDate) return;

    setLoadingSlots(true);
    setSelectedTime("");
    setTimeSlots([]);
    setSlotsError(false);

    fetch("/api/clinica/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hid: ONLINE_BOOKING_HID, date: selectedDate }),
    })
      .then((r) => {
        if (!r.ok) {
          setSlotsError(true);
          return [];
        }
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.slots || data.times || data.data || []);
        if (Array.isArray(list)) {
          const mapped = list.map((s: Record<string, unknown>) => ({
            time: String(s.Time || s.time || s.slot || s),
          }));
          setTimeSlots(mapped);
        }
      })
      .catch(() => setSlotsError(true))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, step]);

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
          hid: ONLINE_BOOKING_HID,
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
    setStep("service");
    setSelectedServiceSlug("");
    setSelectedServiceName("");
    setName("");
    setPhone("");
    setPatientId("");
    setSelectedDate("");
    setTimeSlots([]);
    setSelectedTime("");
    setSlotsError(false);
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
  const steps: Step[] = ["service", "patient", "datetime", "confirm"];
  const stepIndex = steps.indexOf(step);
  const stepLabels = [t("stepService"), t("stepPatient"), t("stepDateTime"), t("stepConfirm")];

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

      {/* STEP 1: Service Selection */}
      {step === "service" && (
        <form onSubmit={handleServiceSelect} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark">
              {t("serviceLabel")} *
            </label>
            <div className="relative">
              <select
                required
                value={selectedServiceSlug}
                onChange={(e) => {
                  setSelectedServiceSlug(e.target.value);
                  const svc = bookableServices.find((s) => s.slug === e.target.value);
                  setSelectedServiceName(svc?.title[locale] || "");
                }}
                className={selectClass}
              >
                <option value="">
                  {t("selectService")}
                </option>
                {bookableServices.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {svc.title[locale]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mid" />
            </div>
          </div>
          <button
            type="submit"
            disabled={!selectedServiceSlug}
            className={btnPrimary}
          >
            {t("next")}
          </button>

          {/* Manual booking fallback */}
          <div className="rounded-xl border border-primary/10 bg-primary-light/50 p-4 text-center">
            <p className="text-sm text-mid">{t("manualOnlyMessage")}</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <a
                href="tel:+962795919919"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                {t("callUs")}
              </a>
              <a
                href="https://wa.me/962795919919"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 px-4 py-2 text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
              >
                {t("orWhatsApp")}
              </a>
            </div>
          </div>
        </form>
      )}

      {/* STEP 2: Patient Info */}
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
            <div className="flex" dir="ltr">
              <span className="inline-flex items-center rounded-s-xl border border-e-0 border-primary/10 bg-primary-light px-3.5 text-sm font-medium text-primary select-none">
                +962
              </span>
              <input
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="7X XXXX XXX"
                className={`${inputClass} rounded-s-none`}
              />
            </div>
            <p className="mt-1.5 text-xs text-mid">
              {isArabic ? "أدخل رقمك بدون رمز الدولة (مثال: 79 5 919 919)" : "Enter your number without country code (e.g. 79 5 919 919)"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("service")}
              className={btnOutline}
            >
              {t("back")}
            </button>
            <button type="submit" disabled={loading} className={btnPrimary}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
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
            <InlineCalendar
              selectedDate={selectedDate}
              onDateSelect={(d) => setSelectedDate(d)}
              locale={locale}
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
              ) : slotsError ? (
                <p className="py-3 text-sm text-red-600">{t("slotsError")}</p>
              ) : (
                <p className="py-3 text-sm text-mid">{t("noSlots")}</p>
              )}
            </div>
          )}

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
                <span className="text-mid">{t("selectedService")}</span>
                <span className="font-medium text-dark">{selectedServiceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("fullName")}</span>
                <span className="font-medium text-dark">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid">{t("phone")}</span>
                <span className="font-medium text-dark" dir="ltr">
                  +962 {normalizeLocalNumber(phone)}
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
