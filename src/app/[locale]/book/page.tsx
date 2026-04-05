import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: isArabic
      ? "احجز موعدك في عيادات ديفنت لطب الأسنان والتجميل في عبدون، عمّان."
      : "Book your appointment at Definite Dental Clinics in Abdoun, Amman.",
  };
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Book");
  const tCommon = await getTranslations("Common");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <>
      <PageHero
        variant="minimal"
        title={t("title")}
        subtitle={t("subtitle")}
        isArabic={isArabic}
        headingFont={headingFont}
      />

      {/* Coming Soon */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <Container className="relative z-10">
          <div className="mx-auto max-w-lg text-center">
            <span className="inline-flex items-center rounded-full bg-accent/15 text-accent font-semibold uppercase tracking-wider border border-accent/25 px-4 py-1.5 text-sm mb-6">
              {tCommon("bookingComingSoonTitle")}
            </span>

            <p className="text-mid text-base leading-relaxed">
              {tCommon("bookingComingSoon")}
            </p>

            <a
              href="https://wa.me/962795919919"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8 inline-flex items-center gap-2 rounded-full
                bg-[#25D366] px-8 py-3.5
                text-sm font-semibold uppercase tracking-wider text-white
                transition-all duration-300
                hover:bg-[#1da851] hover:shadow-lg hover:-translate-y-[1px]
              "
            >
              {t("whatsappBtn")}
            </a>

            <p className="mt-4 text-sm text-mid">
              {isArabic ? "أو اتصل بنا:" : "Or call us:"}{" "}
              <a
                href="tel:+962795919919"
                className="text-primary font-semibold hover:text-accent transition-colors"
                dir="ltr"
              >
                079 5 919 919
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
