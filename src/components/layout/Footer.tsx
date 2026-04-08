import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import { Phone, MapPin } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <>
      {/* Pre-footer CTA Banner */}
      <section className="relative z-10 bg-surface py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <h2 className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}>
            {isArabic
              ? "هل أنت مستعد لتحويل ابتسامتك؟"
              : "Ready to Transform Your Smile?"}
          </h2>
          <p className="mt-4 text-mid max-w-lg mx-auto">
            {isArabic
              ? "احجز موعدك اليوم واكتشف الفرق في عيادات ديفنت."
              : "Book your appointment today and experience the Definite difference."}
          </p>
          <Link
            href="/book"
            className="
              mt-8 inline-flex items-center rounded-full bg-accent px-10 py-3.5
              text-sm font-semibold uppercase tracking-wider text-white
              transition-all duration-300
              hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20
            "
          >
            {tCommon("bookNow")}
          </Link>
        </div>
      </section>

      <footer className="bg-gray-700 text-primary/80">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <span className={`text-2xl font-bold text-[#C4B0DB] ${headingFont}`}>
                  Definite
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-[#C4B0DB]/80">
                {t("tagline")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C4B0DB]">
                {t("quickLinks")}
              </h3>
              <nav className="mt-5 flex flex-col gap-3">
                {(["home", "about", "services", "gallery", "book", "contact"] as const).map(
                  (key) => {
                    return (
                      <Link
                        key={key}
                        href={
                          key === "home"
                            ? "/"
                            : `/${key}`
                        }
                        className="text-sm text-[#C4B0DB]/80 transition-colors hover:text-accent"
                      >
                        {tNav(key)}
                      </Link>
                    );
                  }
                )}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C4B0DB]">
                {tNav("services")}
              </h3>
              <nav className="mt-5 flex flex-col gap-3">
                <Link
                  href="/services/dental-treatments"
                  className="text-sm text-[#C4B0DB]/80 transition-colors hover:text-accent"
                >
                  {t("dental")}
                </Link>
                <Link
                  href="/services/facial-treatments"
                  className="text-sm text-[#C4B0DB]/80 transition-colors hover:text-accent"
                >
                  {t("facial")}
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C4B0DB]">
                {t("contactUs")}
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                <a
                  href="tel:+962795919919"
                  className="flex items-center gap-3 text-sm text-[#C4B0DB]/80 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span dir="ltr">{t("phone")}</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-[#C4B0DB]/80">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {t("address")}
                </div>

                {/* Social */}
                <div className="mt-2 flex items-center gap-3">
                  <a
                    href="https://instagram.com/definite_dental_clinics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C4B0DB]/30 text-[#C4B0DB]/80 transition-all hover:border-accent hover:text-accent"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://facebook.com/DefiniteClinics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C4B0DB]/30 text-[#C4B0DB]/80 transition-all hover:border-accent hover:text-accent"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 border-t border-[#C4B0DB]/20 pt-8 text-center">
            <p className="text-xs text-[#C4B0DB]/60 tracking-wide">
              {t("copyright")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
