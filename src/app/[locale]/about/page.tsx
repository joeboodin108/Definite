import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Heart, Eye } from "lucide-react";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: isArabic
      ? "تعرف على عيادات ديفنت لطب الأسنان. فريق طبي متخصص وتقنيات حديثة في عبدون، عمّان."
      : "Learn about Definite Dental Clinics. Expert medical team and advanced technology in Abdoun, Amman.",
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <>
      <PageHero
        variant="split"
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/about/outdoor.webp"
        isArabic={isArabic}
        headingFont={headingFont}
      />

      {/* Clinic Story */}
      <section className="py-20 lg:py-28 relative overflow-hidden">

        <Container className="relative z-10">
          <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {isArabic ? "رحلتنا" : "Our Journey"}
            </p>
            <h2 className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}>
              {t("storyTitle")}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-dark/80">
              {t("storyText")}
            </p>
          </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-surface relative overflow-hidden">

        <Container className="relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl bg-white p-10 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Heart className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className={`mt-5 ${headingFont} text-2xl font-bold text-primary`}>
                {t("missionTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mid">
                {t("missionText")}
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl bg-white p-10 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Eye className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className={`mt-5 ${headingFont} text-2xl font-bold text-primary`}>
                {t("visionTitle")}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-mid">
                {t("visionText")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Focus */}
      <section className="py-20 lg:py-28 relative overflow-hidden">

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}>
              {t("focusTitle")}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-dark/80">
              {t("focusText")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
                {isArabic ? "علاجات الأسنان" : "Dental Treatments"}
              </div>
              <div className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
                {isArabic ? "علاجات التجميل" : "Facial Treatments"}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Facility Photos */}
      <section className="py-20 lg:py-28 bg-surface relative overflow-hidden">

        <Container className="relative z-10">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {isArabic ? "داخل العيادة" : "Inside the Clinic"}
            </p>
            <h2 className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}>
              {t("facilityTitle")}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Row 1: Lounge (wide) + Treatment Room 1 */}
            <div className="group relative h-72 overflow-hidden rounded-xl sm:col-span-2">
              <Image
                src="/images/about/comfort.webp"
                alt={isArabic ? "صالة الانتظار الفاخرة" : "Luxury waiting lounge"}
                fill
                sizes="(max-width: 640px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/20" />
            </div>
            <div className="group relative h-72 overflow-hidden rounded-xl">
              <Image
                src="/images/about/clinic.webp"
                alt={isArabic ? "غرفة العلاج" : "Treatment room"}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/20" />
            </div>

            {/* Row 2: Treatment Room 2 + Outdoor Garden (wide) */}
            <div className="group relative h-72 overflow-hidden rounded-xl">
              <Image
                src="/images/about/clinic2.webp"
                alt={isArabic ? "غرفة العلاج الثانية" : "Second treatment room"}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/20" />
            </div>
            <div className="group relative h-72 overflow-hidden rounded-xl sm:col-span-2">
              <Image
                src="/images/about/comfort2.webp"
                alt={isArabic ? "الحديقة الخارجية" : "Outdoor garden"}
                fill
                sizes="(max-width: 640px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/20" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
