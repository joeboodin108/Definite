"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Phone, X } from "lucide-react";

const PHONE_URL = "tel:+962795919919";
const PHONE_DISPLAY = "079 5 919 919";
const WHATSAPP_URL = "https://wa.me/962795919919";

export default function FloatingEmergency() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("Emergency");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const isMobile = useCallback(() => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile()) return; // let the tel: link work natively
      e.preventDefault();
      setExpanded((prev) => !prev);
    },
    [isMobile]
  );

  return (
    <>
      {/* Main button */}
      <a
        href={PHONE_URL}
        onClick={handleClick}
        aria-label={t("ariaLabel")}
        className={`
          fixed bottom-6 start-6 z-50
          flex items-center gap-2.5
          rounded-full bg-primary text-white
          px-3 py-3 sm:px-5 sm:py-3
          shadow-lg shadow-primary/20
          transition-all duration-500
          hover:scale-105 hover:shadow-xl hover:shadow-primary/30
          active:scale-95
          ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
      >
        {/* Heartbeat green dot */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inset-0 rounded-full bg-green-500 motion-safe:animate-heartbeat" />
          <span className="relative h-3 w-3 rounded-full bg-green-500" />
        </span>

        {/* Label text — hidden on mobile */}
        <span className="hidden sm:inline text-sm font-semibold tracking-wide whitespace-nowrap">
          {t("label")}
        </span>

        {/* Phone icon */}
        <Phone className="h-4 w-4 shrink-0" />
      </a>

      {/* Expanded card — desktop only */}
      {expanded && (
        <div
          className="
            fixed bottom-[5.5rem] start-6 z-50
            rounded-2xl bg-white border border-gray-100
            px-5 py-4 shadow-xl
            animate-slide-up
            w-64
          "
        >
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-3 end-3 text-mid hover:text-dark transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("label")}
          </p>
          <p dir="ltr" className="mt-2 text-lg font-bold text-dark tracking-wide">
            {PHONE_DISPLAY}
          </p>
          <div className="mt-3 flex gap-2">
            <a
              href={PHONE_URL}
              className="flex-1 rounded-full bg-primary py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t("call")}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[#25D366] py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-[#1da851]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
