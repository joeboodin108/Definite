"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import type { Locale } from "@/types";

interface LocaleSwitcherProps {
  scrolled?: boolean;
  className?: string;
}

export default function LocaleSwitcher({
  scrolled = false,
  className = "",
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={`
        group relative inline-flex items-center gap-1.5
        rounded-full px-3.5 py-1.5 text-sm font-medium
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "border border-primary/20 text-primary hover:bg-primary hover:text-white"
            : "border border-white/30 text-white hover:bg-white/15"
        }
        ${className}
      `}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <span className="relative z-10 tracking-wide">
        {locale === "en" ? "عربي" : "EN"}
      </span>
      <svg
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
        <path d="M2 12h20" />
        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10Z" />
      </svg>
    </button>
  );
}
