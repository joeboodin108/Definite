import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";

export default function Hero() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />

      {/* Subtle pattern overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Small label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              {isArabic ? "عبدون، عمّان" : "Abdoun, Amman"}
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`
              ${headingFont} text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              font-bold leading-[1.1] text-white
            `}
          >
            {t("heroTitle")}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/70">
            {t("heroSubtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
                border border-white/10
              "
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href="/services"
              className="
                inline-flex items-center gap-2 rounded-full
                border-2 border-white/30 px-8 py-3.5
                text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white
                transition-all duration-300
                hover:bg-white/10 hover:border-white/50 hover:-translate-y-[1px]
                active:translate-y-0
              "
            >
              {t("exploreServices")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
