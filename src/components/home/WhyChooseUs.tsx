import { useTranslations, useLocale } from "next-intl";
import { Users, Cpu, Heart, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";


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
    <section className="py-20 lg:py-28 overflow-hidden relative">
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
                group relative h-full rounded-2xl p-[1px]
                bg-gradient-to-b from-primary/20 via-primary/5 to-primary/20
                transition-all duration-300
                hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1
                hover:from-primary/40 hover:via-primary/10 hover:to-primary/40
              "
            >
              <div className="h-full rounded-2xl bg-white/95 backdrop-blur-sm p-8 text-center transition-colors duration-300 group-hover:bg-white">
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
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
