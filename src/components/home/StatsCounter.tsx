"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

function AnimatedNumber({ value, suffix, format, shouldAnimate }: { value: number; suffix: string; format?: boolean; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    }

    requestAnimationFrame(step);
  }, [shouldAnimate, value]);

  return (
    <span>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Soft center glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at center, #d4d4d8, transparent)`,
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal>
          <div ref={containerRef} className="grid grid-cols-2 gap-8 lg:grid-cols-5">
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
                      <AnimatedNumber value={value} suffix={suffix} format={format} shouldAnimate={isVisible} />
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
