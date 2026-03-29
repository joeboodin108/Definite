import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("title") };
}

const categoryCards = [
  {
    key: "dental" as const,
    href: "/services/dental-treatments" as const,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    key: "facial" as const,
    href: "/services/facial-treatments" as const,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
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

      {/* Category Cards */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {categoryCards.map(({ key, href, image }) => (
              <Link
                key={key}
                href={href}
                className="
                  group relative flex min-h-[380px] flex-col justify-end
                  overflow-hidden rounded-2xl
                  transition-all duration-500
                  hover:shadow-2xl hover:shadow-primary/10
                "
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                <div className="relative z-10 p-8 md:p-10">
                  <h2
                    className={`${headingFont} text-3xl font-bold text-white md:text-4xl`}
                  >
                    {t(`${key}Title`)}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                    {t(`${key}Description`)}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                    <span>{t("allServices")}</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rtl:rotate-180" : ""}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
