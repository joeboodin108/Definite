"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { TestimonialData } from "@/types";

const testimonials: TestimonialData[] = [
  {
    name: { en: "Noor Alkhateb", ar: "نور الخطيب" },
    quote: {
      en: "The service is excellent, also the doctor is professional and all the staff is full of kindness. The whole experience was excellent.",
      ar: "الخدمة ممتازة، والطبيب محترف وجميع الموظفين مليئون بالطيبة. التجربة بأكملها كانت ممتازة.",
    },
    rating: 5,
  },
  {
    name: { en: "Sara Saleh", ar: "سارة صالح" },
    quote: {
      en: "From the first visit I felt comfortable and confident. Highly recommend this clinic to everyone.",
      ar: "من أول زيارة شعرت بالراحة والثقة. أنصح الجميع بزيارة هذه العيادة.",
    },
    rating: 5,
  },
  {
    name: { en: "Michel Van Hecke", ar: "ميشيل فان هيكي" },
    quote: {
      en: "Simply the best dentist in town: reliable, efficient, available... communication via SMS and WhatsApp. From just filling to implant and crowns, he took care of me for 4 years and also of my wife and everything went perfectly well. Highly recommended 👌",
      ar: "ببساطة أفضل طبيب أسنان في المدينة: موثوق، فعّال، ومتاح... التواصل عبر الرسائل والواتساب. من الحشوات إلى الزراعة والتيجان، اعتنى بي لمدة ٤ سنوات وكذلك بزوجتي وكل شيء سار بشكل مثالي. أنصح به بشدة 👌",
    },
    rating: 5,
  },
  {
    name: { en: "Samar Abooweida", ar: "سمر أبو عويضة" },
    quote: {
      en: "The dentist showed real passion for the work, which made the entire experience feel more personal and trustworthy.",
      ar: "أظهر الطبيب شغفاً حقيقياً بعمله، مما جعل التجربة بأكملها تبدو شخصية وجديرة بالثقة.",
    },
    rating: 5,
  },
  {
    name: { en: "Imran Bani Khaled", ar: "عمران بني خالد" },
    quote: {
      en: "Modern equipment and a very organized clinic. Highly recommended.",
      ar: "أجهزة حديثة وعيادة منظمة جداً. أنصح بها بشدة.",
    },
    rating: 5,
  },
  {
    name: { en: "Kamel Desh", ar: "كامل دش" },
    quote: {
      en: "Their Botox and filler services are safe and give natural-looking results.",
      ar: "خدمات البوتوكس والفيلر لديهم آمنة وتعطي نتائج طبيعية.",
    },
    rating: 5,
  },
  {
    name: { en: "Moner Zboon", ar: "منير زبون" },
    quote: {
      en: "I had a great experience! Very experienced and professional staff in an atmosphere full of peace.",
      ar: "تجربة رائعة! طاقم ذو خبرة عالية واحترافية في أجواء مليئة بالراحة.",
    },
    rating: 5,
  },
  {
    name: { en: "Aws Shqerat", ar: "أوس شقيرات" },
    quote: {
      en: "Great experience from start to finish, with beautiful final results.",
      ar: "تجربة رائعة من البداية إلى النهاية، مع نتائج نهائية جميلة.",
    },
    rating: 5,
  },
  {
    name: { en: "Taima Omari", ar: "تيماء العمري" },
    quote: {
      en: "I appreciated how clearly the doctor explained each step of the treatment.",
      ar: "أقدّر كيف شرح الطبيب كل خطوة من العلاج بوضوح تام.",
    },
    rating: 5,
  },
  {
    name: { en: "Suzan Matar", ar: "سوزان مطر" },
    quote: {
      en: "Skilled cosmetic dentist creating perfect veneers and smile design.",
      ar: "طبيب تجميل أسنان ماهر يصنع قشوراً وتصميم ابتسامة مثالية.",
    },
    rating: 5,
  },
];

// Split into two rows
const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

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
  reverse = false,
  speed = 30,
  locale,
}: {
  data: TestimonialData[];
  reverse?: boolean;
  speed?: number;
  locale: "en" | "ar";
}) {
  const tripled = React.useMemo(() => [...data, ...data, ...data], [data]);

  return (
    <div dir="ltr" className="relative w-full mx-auto overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />

      <div
        className={`flex transform-gpu w-max ${
          reverse ? "pt-2 pb-4 md:pt-3 md:pb-6" : "pt-4 pb-2 md:pt-6 md:pb-3"
        }`}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
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
          <MarqueeRow data={row1} reverse={false} speed={35} locale={locale} />
          <MarqueeRow data={row2} reverse={true} speed={30} locale={locale} />
        </div>
      </div>
    </section>
  );
}
