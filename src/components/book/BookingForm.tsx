"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { services } from "@/lib/services-data";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { ServiceCategory } from "@/types";

export default function BookingForm() {
  const t = useTranslations("Book");
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<ServiceCategory | "">("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const filteredServices = category
    ? services.filter((s) => s.category === category)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", { ...formData, category });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
        <h3 className={`mt-6 ${headingFont} text-3xl font-bold text-primary`}>
          {t("successTitle")}
        </h3>
        <p className="mt-4 text-mid max-w-md mx-auto">{t("successMessage")}</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              service: "",
              date: "",
              time: "",
              notes: "",
            });
            setCategory("");
          }}
          className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t("bookAnother")}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10";
  const labelClass = "mb-1.5 block text-sm font-medium text-dark";

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("fullName")} *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("phone")} *</label>
            <input
              type="tel"
              required
              dir="ltr"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t("email")}</label>
          <input
            type="email"
            dir="ltr"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("category")} *</label>
            <select
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as ServiceCategory);
                setFormData({ ...formData, service: "" });
              }}
              className={inputClass}
            >
              <option value="">{t("selectCategory")}</option>
              <option value="dental-treatments">{t("dental")}</option>
              <option value="facial-treatments">{t("facial")}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("service")} *</label>
            <select
              required
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className={inputClass}
              disabled={!category}
            >
              <option value="">{t("selectService")}</option>
              {filteredServices.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title[locale]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("date")} *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("time")} *</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t("notes")}</label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="
            w-full rounded-full bg-primary py-3.5
            text-sm font-semibold uppercase tracking-wider text-white
            transition-all duration-300
            hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20
          "
        >
          {t("submit")}
        </button>
      </form>

      {/* WhatsApp Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 rounded-2xl bg-primary-light p-8 text-center">
          <MessageCircle className="mx-auto h-10 w-10 text-[#25D366]" />
          <p className="mt-4 text-sm text-mid">{t("whatsappAlt")}</p>
          <a
            href="https://wa.me/962795919919"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5 block w-full rounded-full bg-[#25D366] py-3
              text-center text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-[#22c55e] hover:shadow-lg
            "
          >
            {t("whatsappBtn")}
          </a>
        </div>
      </div>
    </div>
  );
}
