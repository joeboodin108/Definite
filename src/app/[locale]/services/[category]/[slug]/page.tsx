import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from "@/lib/services-data";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/services/ServiceCard";
import { Link } from "@/lib/navigation";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return {
    title: service.title[locale as Locale],
    description: service.shortDescription[locale as Locale],
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({
      locale,
      category: s.category,
      slug: s.slug,
    }))
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service || service.category !== category) {
    notFound();
  }

  const t = await getTranslations("Services");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";
  const relatedServices = getRelatedServices(slug);
  const categoryTitle =
    category === "dental-treatments" ? t("dentalTitle") : t("facialTitle");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src={service.image}
          alt={service.title[locale as Locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        <Container className="relative z-10 py-20 pt-40">
          {/* Breadcrumb */}
          <Link
            href={`/services/${category}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? "rtl:rotate-180" : ""}`} />
            {t("backToCategory", { category: categoryTitle })}
          </Link>
          <h1
            className={`${headingFont} text-4xl font-bold text-white sm:text-5xl lg:text-6xl`}
          >
            {service.title[locale as Locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            {service.shortDescription[locale as Locale]}
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-dark/80">
                {service.fullDescription[locale as Locale]}
              </p>

              {/* Benefits */}
              <div className="mt-12">
                <h2
                  className={`${headingFont} text-2xl font-bold text-primary sm:text-3xl`}
                >
                  {t("whatToExpect")}
                </h2>
                <ul className="mt-6 space-y-4">
                  {service.benefits[locale as Locale].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-dark/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-primary-light p-8">
                <h3
                  className={`${headingFont} text-xl font-bold text-primary`}
                >
                  {t("bookService")}
                </h3>
                <p className="mt-3 text-sm text-mid">
                  {service.shortDescription[locale as Locale]}
                </p>
                <Link
                  href="/book"
                  className="
                    mt-6 block w-full rounded-full bg-primary py-3
                    text-center text-sm font-semibold uppercase tracking-wider text-white
                    transition-all duration-300
                    hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20
                  "
                >
                  {t("bookService")}
                </Link>
                <a
                  href="https://wa.me/962795919919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-3 block w-full rounded-full border-2 border-[#25D366] py-3
                    text-center text-sm font-semibold text-[#25D366]
                    transition-all duration-300
                    hover:bg-[#25D366] hover:text-white
                  "
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="border-t border-primary/5 py-16 lg:py-24 bg-primary-light/30">
          <Container>
            <h2
              className={`${headingFont} text-2xl font-bold text-primary sm:text-3xl`}
            >
              {t("relatedServices")}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((s) => (
                <ServiceCard
                  key={s.slug}
                  service={s}
                  locale={locale as Locale}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
