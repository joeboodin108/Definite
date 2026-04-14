"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InlineCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: "en" | "ar";
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export default function InlineCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: InlineCalendarProps) {
  const today = new Date();
  const todayStr = toDateStr(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const isRtl = locale === "ar";

  // Month/year header label
  const monthLabel = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      month: "long",
      year: "numeric",
    }).format(d);
  }, [viewYear, viewMonth, locale]);

  // Weekday short names (Su, Mo, ... or ح, ن, ...)
  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      weekday: "short",
    });
    return Array.from({ length: 7 }, (_, i) => {
      // Jan 7 2024 is Sunday — offset by i for each weekday
      return fmt.format(new Date(2024, 0, 7 + i));
    });
  }, [locale]);

  // Build day cells
  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewYear, viewMonth]);

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function goPrev() {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNext() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function isPast(day: number) {
    const dateStr = toDateStr(viewYear, viewMonth, day);
    return dateStr < todayStr;
  }

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="rounded-xl border border-primary/10 bg-white p-4">
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label={locale === "ar" ? "الشهر السابق" : "Previous month"}
          className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <PrevIcon className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-dark">{monthLabel}</span>
        <button
          type="button"
          onClick={goNext}
          aria-label={locale === "ar" ? "الشهر التالي" : "Next month"}
          className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary-light"
        >
          <NextIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7">
        {weekdays.map((wd, i) => (
          <div
            key={i}
            className="py-1 text-center text-xs font-medium text-mid"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const past = isPast(day);

          return (
            <button
              type="button"
              key={dateStr}
              disabled={past}
              onClick={() => onDateSelect(dateStr)}
              aria-label={new Intl.DateTimeFormat(
                locale === "ar" ? "ar" : "en-US",
                { dateStyle: "long" }
              ).format(new Date(viewYear, viewMonth, day))}
              aria-pressed={isSelected}
              className={`flex aspect-square items-center justify-center rounded-lg text-sm transition-all ${
                past
                  ? "cursor-not-allowed text-mid/40"
                  : isSelected
                    ? "bg-primary font-semibold text-white"
                    : isToday
                      ? "font-semibold text-dark ring-1 ring-primary/30 hover:bg-primary-light"
                      : "cursor-pointer text-dark hover:bg-primary-light"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
