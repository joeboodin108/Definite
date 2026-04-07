import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ClinicaBookingForm from "@/components/book/ClinicaBookingForm";

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

      <section className="py-16 lg:py-24">
        <Container>
          <ClinicaBookingForm />
        </Container>
      </section>
    </>
  );
}
