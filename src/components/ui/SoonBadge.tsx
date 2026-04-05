"use client";

import { useTranslations } from "next-intl";

interface SoonBadgeProps {
  size?: "sm" | "default";
  className?: string;
}

export default function SoonBadge({ size = "default", className = "" }: SoonBadgeProps) {
  const t = useTranslations("Common");

  return (
    <span
      className={`
        inline-flex items-center rounded-full bg-accent/15 text-accent
        font-semibold uppercase tracking-wider border border-accent/25
        ${size === "sm" ? "px-1.5 py-0.5 text-[0.55rem] ms-1.5" : "px-2 py-0.5 text-[0.6rem] ms-2"}
        ${className}
      `}
    >
      {t("soon")}
    </span>
  );
}
