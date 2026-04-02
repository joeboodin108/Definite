import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";

export default function Hero() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Vertical accent line — left edge (LTR) or right edge (RTL) */}
      <div
        className={`absolute top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-25 z-[1] ${
          isArabic ? "end-8 lg:end-16" : "start-8 lg:start-16"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 w-full">
        <div className={isArabic ? "max-w-4xl" : "max-w-3xl"}>
          {/* Small label */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 backdrop-blur-sm animate-fade-in"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary/70">
              {isArabic ? "عبدون، عمّان" : "Abdoun, Amman"}
            </span>
          </div>

          {/* Main Heading — staggered entrance */}
          <h1
            className={`
              ${headingFont} text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              font-bold ${isArabic ? "leading-[1.55]" : "leading-[1.1]"} text-primary
              animate-slide-up
            `}
          >
            <span className="block">{t("heroTitleLine1")}</span>
            <span className={`block ${isArabic ? "mt-4" : ""}`}>{t("heroTitleLine2")}</span>
          </h1>

          {/* Subtitle — delayed entrance */}
          <p
            className={`${isArabic ? "mt-8" : "mt-6"} max-w-xl text-base sm:text-lg ${isArabic ? "leading-loose" : "leading-relaxed"} text-dark/70 opacity-0 animate-slide-up`}
            style={{ animationDelay: "200ms" }}
          >
            {t("heroSubtitle")}
          </p>

          {/* CTAs — delayed entrance */}
          <div
            className={`${isArabic ? "mt-12" : "mt-10"} flex flex-wrap items-center gap-4 opacity-0 animate-slide-up`}
            style={{ animationDelay: "400ms" }}
          >
            <Link
              href="/book"
              className="
                inline-flex items-center gap-2 rounded-full
                bg-primary px-8 py-3.5
                text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white
                shadow-lg shadow-primary/30
                transition-all duration-300
                hover:bg-primary-dark hover:shadow-xl hover:-translate-y-[1px]
                active:translate-y-0
              "
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href="/services"
              className="
                inline-flex items-center gap-2 rounded-full
                border-2 border-primary/25 px-8 py-3.5
                text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-primary
                transition-all duration-300
                hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-[1px]
                active:translate-y-0
              "
            >
              {t("exploreServices")}
            </Link>
          </div>

          {/* Trust signals */}
          <div
            className={`${isArabic ? "mt-12" : "mt-10"} flex flex-wrap items-center ${isArabic ? "gap-8" : "gap-6"} opacity-0 animate-fade-in`}
            style={{ animationDelay: "700ms" }}
          >
            <div className="flex items-center gap-2 text-mid">
              <span className="text-sm font-semibold text-primary">1000+</span>
              <span className="text-xs uppercase tracking-wider">
                {isArabic ? "مريض سعيد" : "Happy Patients"}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-primary/15" />
            <div className="flex items-center gap-2 text-mid">
              <span className="text-sm font-semibold text-primary">2</span>
              <span className="text-xs uppercase tracking-wider">
                {isArabic ? "تخصصات" : "Specialties"}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-primary/15" />
            <div className="flex items-center gap-2 text-mid">
              <span className="text-xs uppercase tracking-wider">
                {isArabic ? "عبدون، عمّان" : "Abdoun, Amman"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

    </section>
  );
}
