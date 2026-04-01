import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import BookingForm from "@/components/book/BookingForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book" });
  return { title: t("title") };
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

      {/* Booking Form */}
      <section className="py-20 lg:py-28">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
