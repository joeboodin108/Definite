import { useTranslations, useLocale } from "next-intl";
import { Users, Cpu, Heart, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GeometricBackground from "@/components/ui/GeometricBackground";

const features = [
  { key: "expertTeam", icon: Users },
  { key: "advancedTech", icon: Cpu },
  { key: "comprehensiveCare", icon: Heart },
  { key: "bilingualSupport", icon: Globe },
] as const;

export default function WhyChooseUs() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-primary-light overflow-hidden relative">
      <GeometricBackground variant="light" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={t("whyChooseUs")} label={isArabic ? "لماذا نحن" : "Why Us"} />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ key, icon: Icon }, index) => (
            <ScrollReveal key={key} animation="fade-up" delay={index * 100}>
            <div
              key={key}
              className="
                group relative rounded-2xl bg-white p-8
                text-center shadow-sm
                transition-all duration-300
                hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1
              "
            >
              {/* Icon */}
              <div
                className="
                  mx-auto flex h-14 w-14 items-center justify-center
                  rounded-xl bg-primary-light text-primary
                  transition-colors duration-300
                  group-hover:bg-primary group-hover:text-white
                "
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                className={`
                  mt-5 text-lg font-bold text-primary
                  ${isArabic ? "font-cairo" : "font-inter"}
                `}
              >
                {t(key)}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-mid">
                {t(`${key}Desc`)}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute inset-x-8 bottom-0 h-[2px] bg-accent scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
