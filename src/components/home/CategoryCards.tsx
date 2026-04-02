import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  {
    key: "dental" as const,
    href: "/services/dental-treatments",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    key: "facial" as const,
    href: "/services/facial-treatments",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
];

export default function CategoryCards() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Asymmetric layout: first card larger */}
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map(({ key, href, image }, index) => (
            <ScrollReveal
              key={key}
              animation="fade-up"
              delay={index * 150}
            >
              <Link
                href={href}
                className={`
                  group relative flex flex-col justify-end
                  overflow-hidden rounded-2xl
                  transition-all duration-500
                  hover:shadow-2xl hover:shadow-primary/10
                  ${index === 0 ? "min-h-[460px]" : "min-h-[460px] md:min-h-[460px]"}
                `}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${image}')` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {index === 0
                      ? isArabic ? "٠١" : "01"
                      : isArabic ? "٠٢" : "02"}
                  </p>
                  <h3
                    className={`
                      ${headingFont} text-3xl md:text-4xl font-bold text-white
                      leading-tight
                    `}
                  >
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                    {t(`${key}Description`)}
                  </p>

                  {/* CTA indicator */}
                  <div className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                    <span>{t("viewServices")}</span>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rtl:rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                    />
                  </div>
                </div>

                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
