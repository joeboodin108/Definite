import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: isArabic
      ? "استكشف خدمات طب الأسنان وتجميل الوجه في عيادات ديفنت. علاجات متقدمة بأيدي خبراء متخصصين."
      : "Explore dental and facial aesthetic services at Definite Dental Clinics. Advanced treatments by expert specialists.",
  };
}

const categoryCards = [
  {
    key: "dental" as const,
    href: "/services/dental-treatments" as const,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95",
  },
  {
    key: "facial" as const,
    href: "/services/facial-treatments" as const,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");
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

      {/* Category Cards */}
      <section className="py-20 lg:py-28 relative overflow-hidden">

        <Container className="relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            {categoryCards.map(({ key, href, image }, index) => (
              <ScrollReveal key={key} animation="fade-up" delay={index * 150}>
                <Link
                  href={href}
                  className="
                    group relative flex min-h-[380px] flex-col justify-end
                    overflow-hidden rounded-2xl
                    transition-all duration-500
                    hover:shadow-2xl hover:shadow-primary/10
                  "
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10 p-8 md:p-10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                    <h2
                      className={`${headingFont} text-3xl font-bold text-white md:text-4xl`}
                    >
                      {t(`${key}Title`)}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
                      {t(`${key}Description`)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                      <span>{t("allServices")}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rtl:rotate-180" : ""}`} />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
