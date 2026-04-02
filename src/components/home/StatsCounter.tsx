"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Award, MapPin, CircleParking } from "lucide-react";

import ScrollReveal from "@/components/ui/ScrollReveal";

interface Stat {
  value: number;
  suffix: string;
  labelKey: string;
  icon?: "award" | "mappin" | "parking";
  format?: boolean;
}

const stats: Stat[] = [
  { value: 13519, suffix: "+", labelKey: "patientsServed", format: true },
  { value: 26, suffix: "", labelKey: "services" },
  { value: 1, suffix: "", labelKey: "expertTeamStat", icon: "award" },
  { value: 1, suffix: "", labelKey: "location", icon: "mappin" },
  { value: 1, suffix: "", labelKey: "freeParking", icon: "parking" },
];

function AnimatedNumber({ value, suffix, format }: { value: number; suffix: string; format?: boolean }) {
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
      {format ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
}

const iconMap = {
  award: Award,
  mappin: MapPin,
  parking: CircleParking,
};

export default function StatsCounter() {
  const t = useTranslations("Home");

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Soft lavender center glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at center, #c4b5fd, transparent)`,
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {stats.map(({ value, suffix, labelKey, icon, format }, index) => {
              const IconComponent = icon ? iconMap[icon] : null;
              return (
                <div
                  key={labelKey}
                  className={`text-center relative ${
                    index < stats.length - 1
                      ? "lg:border-e lg:border-primary/10"
                      : ""
                  }`}
                >
                  <div className={`font-bold text-primary font-inter ${format ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"}`}>
                    {IconComponent ? (
                      <IconComponent className="mx-auto h-10 w-10 text-accent" strokeWidth={1.5} />
                    ) : (
                      <AnimatedNumber value={value} suffix={suffix} format={format} />
                    )}
                  </div>
                  <p className="mt-3 text-sm text-mid tracking-wide">
                    {t(labelKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
