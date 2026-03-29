import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
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
      {/* Hero Banner */}
      <section className="relative bg-primary py-32 pt-40">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative z-10 text-center">
          <h1
            className={`${headingFont} text-4xl font-bold text-white sm:text-5xl`}
          >
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-white/70">{t("subtitle")}</p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-accent" />
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info Column */}
            <div className="space-y-8">
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

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-primary mb-3">{t("socialMedia")}</h3>
                <div className="flex gap-3">
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

              {/* Google Maps Placeholder */}
              <div className="mt-6 h-64 w-full overflow-hidden rounded-xl bg-primary-light flex items-center justify-center text-mid text-sm">
                {/* Replace this div with an iframe when Google Maps embed URL is available */}
                <p>{isArabic ? "خريطة جوجل - قريباً" : "Google Maps — Coming Soon"}</p>
              </div>
            </div>

            {/* Form Column */}
            <div>
              <h2 className={`${headingFont} text-2xl font-bold text-primary sm:text-3xl`}>
                {t("sendMessage")}
              </h2>
              <div className="mt-3 h-[2px] w-10 bg-accent" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
