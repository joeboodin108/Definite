"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface Stat {
  value: number;
  suffix: string;
  labelKey: string;
}

const stats: Stat[] = [
  { value: 1000, suffix: "+", labelKey: "happyPatients" },
  { value: 2, suffix: "", labelKey: "specialties" },
  { value: 1, suffix: "", labelKey: "expertTeamStat" },
  { value: 1, suffix: "", labelKey: "location" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const t = useTranslations("Home");

  return (
    <section className="relative py-16 bg-primary overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ value, suffix, labelKey }) => (
            <div key={labelKey} className="text-center">
              <div className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-cormorant">
                {labelKey === "expertTeamStat" || labelKey === "location" ? (
                  <span className="text-2xl sm:text-3xl lg:text-4xl">✦</span>
                ) : (
                  <AnimatedNumber value={value} suffix={suffix} />
                )}
              </div>
              <p className="mt-2 text-sm text-white/60 tracking-wide">
                {t(labelKey)}
              </p>
              {/* Small accent dot */}
              <div className="mx-auto mt-3 h-1 w-1 rounded-full bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
