import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getServicesByCategory } from "@/lib/services-data";
import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
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
  return { title: t(`${titleKey}Title`) };
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
            {t(`${titleKey}Title`)}
          </h1>
          <p className="mt-4 text-lg text-white/70">
            {t(`${titleKey}Description`)}
          </p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-accent" />
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          {/* Back link */}
          <Link
            href="/services"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-mid transition-colors hover:text-primary"
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? "rtl:rotate-180" : ""}`} />
            {t("allServices")}
          </Link>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                locale={locale as Locale}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
