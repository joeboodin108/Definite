import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getServicesByCategory } from "@/lib/services-data";
import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Link } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";
import type { ServiceCategory, Locale } from "@/types";

const validCategories: ServiceCategory[] = [
  "dental-treatments",
  "facial-treatments",
];

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const titleKey = category === "dental-treatments" ? "dental" : "facial";
  const isArabic = locale === "ar";
  const description =
    category === "dental-treatments"
      ? isArabic
        ? "علاجات الأسنان المتقدمة في عيادات ديفنت. تجميل، زراعة، تقويم، تبييض والمزيد."
        : "Advanced dental treatments at Definite Dental Clinics. Veneers, implants, braces, whitening and more."
      : isArabic
        ? "علاجات تجميل الوجه في عيادات ديفنت. بوتوكس، فيلر، بروفايلو، خيوط ذهبية والمزيد."
        : "Facial aesthetic treatments at Definite Dental Clinics. Botox, fillers, Profhilo, golden threads and more.";
  return { title: t(`${titleKey}Title`), description };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    validCategories.map((category) => ({ locale, category }))
  );
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  if (!validCategories.includes(category as ServiceCategory)) {
    notFound();
  }

  const t = await getTranslations("Services");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";
  const services = getServicesByCategory(category as ServiceCategory);
  const titleKey = category === "dental-treatments" ? "dental" : "facial";

  return (
    <>
      <PageHero
        variant="minimal"
        title={t(`${titleKey}Title`)}
        subtitle={t(`${titleKey}Description`)}
        isArabic={isArabic}
        headingFont={headingFont}
      >
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className={`h-4 w-4 ${isArabic ? "rtl:rotate-180" : ""}`} />
          {t("allServices")}
        </Link>
      </PageHero>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} animation="fade-up" delay={index * 80}>
                <ServiceCard
                  service={service}
                  locale={locale as Locale}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
