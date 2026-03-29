"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <p className="mt-4 text-mid">{t("successMessage")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10";
  const labelClass = "mb-1.5 block text-sm font-medium text-dark";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>{t("name")} *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t("phoneField")} *</label>
        <input
          type="tel"
          required
          dir="ltr"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t("message")} *</label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
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
  );
}
