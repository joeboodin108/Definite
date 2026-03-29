import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
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

      {/* Booking Form */}
      <section className="py-20 lg:py-28">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
