"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { testimonials } from "@/data/testimonials";
import type { TestimonialData } from "@/types";


function TestimonialCard({
  item,
  locale,
}: {
  item: TestimonialData;
  locale: "en" | "ar";
}) {
  return (
    <div className="p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-200 w-64 md:w-80 shrink-0 bg-white border border-primary/5 text-start">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-white text-xs md:text-sm font-bold shrink-0">
          {item.name[locale].charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="text-xs md:text-sm font-semibold text-primary">
            {item.name[locale]}
          </p>
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-accent text-accent" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs md:text-sm pt-3 md:pt-4 leading-relaxed text-dark/80 line-clamp-4">
        &ldquo;{item.quote[locale]}&rdquo;
      </p>
    </div>
  );
}

function MarqueeRow({
  data,
  speed = 30,
  locale,
}: {
  data: TestimonialData[];
  speed?: number;
  locale: "en" | "ar";
}) {
  const tripled = React.useMemo(() => [...data, ...data, ...data], [data]);

  return (
    <div dir="ltr" className="relative w-full mx-auto overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />

      <div
        className="flex transform-gpu w-max py-4 md:py-6"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: "normal",
        }}
      >
        {tripled.map((item, i) => (
          <div key={i} className="pr-4 md:pr-6" dir={locale === "ar" ? "rtl" : "ltr"}>
            <TestimonialCard item={item} locale={locale} />
          </div>
        ))}
      </div>

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export default function TestimonialsSlider() {
  const t = useTranslations("Home");
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";

  return (
    <section className="py-14 md:py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative quote mark */}
      <div
        className="absolute top-8 start-1/2 -translate-x-1/2 select-none pointer-events-none font-cormorant text-[12rem] leading-none text-primary/[0.03]"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title={t("testimonials")}
              label={isRTL ? "آراء المرضى" : "Patient Stories"}
            />
          </ScrollReveal>
        </div>

        {/* Marquee rows — full width, no container constraint */}
        <div className="mt-10 md:mt-16 flex flex-col">
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-100% / 3)); }
            }
          `}</style>
          <MarqueeRow data={testimonials} speed={55} locale={locale} />
        </div>
      </div>
    </section>
  );
}
