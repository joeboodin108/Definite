import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title") };
}

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

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <>
      <PageHero
        variant="split"
        title={t("title")}
        subtitle={t("subtitle")}
        isArabic={isArabic}
        headingFont={headingFont}
      />

      {/* Contact Content */}
      <section className="py-20 lg:py-28 relative overflow-hidden">

        <Container className="relative z-10">
          {/* Contact Info */}
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t("phone")}</h3>
                  <a
                    href="tel:+962795919919"
                    className="mt-1 block text-mid hover:text-primary transition-colors"
                    dir="ltr"
                  >
                    079 5 919 919
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t("whatsapp")}</h3>
                  <a
                    href="https://wa.me/962795919919"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-mid hover:text-[#25D366] transition-colors"
                    dir="ltr"
                  >
                    079 5 919 919
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t("location")}</h3>
                  <p className="mt-1 text-mid">
                    {isArabic ? "عبدون، عمّان، الأردن" : "Abdoun, Amman, Jordan"}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t("workingHours")}</h3>
                  <p className="mt-1 text-mid">{t("workingHoursValue")}</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 text-center">
              <h3 className="font-semibold text-primary mb-3">{t("socialMedia")}</h3>
              <div className="flex justify-center gap-3">
                <a
                  href="https://instagram.com/definite_dental_clinics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-all hover:bg-primary hover:text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/DefiniteClinics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-all hover:bg-primary hover:text-white"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-12 overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps?q=31.9484122,35.8825359&z=17&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isArabic ? "موقع العيادة على الخريطة" : "Clinic location on map"}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
