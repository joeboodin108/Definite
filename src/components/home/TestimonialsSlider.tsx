"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TestimonialData } from "@/types";

const testimonials: TestimonialData[] = [
  {
    name: { en: "Sarah M.", ar: "سارة م." },
    quote: {
      en: "The team at Definite Dental was incredible. My veneers look absolutely natural and I couldn't be happier with the results.",
      ar: "فريق عيادات ديفنت كان رائعاً. القشور الخزفية تبدو طبيعية تماماً وأنا سعيدة جداً بالنتائج.",
    },
    service: "Veneers",
    rating: 5,
  },
  {
    name: { en: "Ahmad K.", ar: "أحمد ك." },
    quote: {
      en: "Professional, modern clinic with state-of-the-art equipment. The facial treatments here are outstanding. Highly recommended!",
      ar: "عيادة احترافية وحديثة بأجهزة متطورة. علاجات التجميل هنا ممتازة. أنصح بها بشدة!",
    },
    service: "Facial Fillers",
    rating: 5,
  },
  {
    name: { en: "Lina R.", ar: "لينا ر." },
    quote: {
      en: "I was nervous about getting implants, but the doctors made me feel completely at ease. The results exceeded my expectations.",
      ar: "كنت متوترة من زراعة الأسنان، لكن الأطباء جعلوني أشعر بالراحة التامة. النتائج فاقت توقعاتي.",
    },
    service: "Implants",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const t = useTranslations("Home");
  const locale = useLocale() as "en" | "ar";
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading title={t("testimonials")} />

        <div className="mt-16">
          {/* Cards grid on desktop, single card on mobile */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} item={item} locale={locale} />
            ))}
          </div>

          {/* Mobile single card with arrows */}
          <div className="md:hidden">
            <TestimonialCard
              item={testimonials[active]}
              locale={locale}
            />
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-primary" : "w-2 bg-primary/20"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  locale,
}: {
  item: TestimonialData;
  locale: "en" | "ar";
}) {
  return (
    <div
      className="
        rounded-2xl border border-primary/5 bg-primary-light/30 p-8
        transition-all duration-300 hover:shadow-md hover:shadow-primary/5
      "
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-accent text-accent"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-5 text-sm leading-relaxed text-dark/80 italic">
        &ldquo;{item.quote[locale]}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
          {item.name[locale].charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">
            {item.name[locale]}
          </p>
          <p className="text-xs text-mid">{item.service}</p>
        </div>
      </div>
    </div>
  );
}
