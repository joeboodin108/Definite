import { useLocale } from "next-intl";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
  light?: boolean;
  accent?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  centered = true,
  light = false,
  accent = false,
  className = "",
}: SectionHeadingProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <div className={`${centered ? "text-center" : "text-start"} ${className}`}>
      {label && (
        <p
          className={`
            mb-3 text-xs font-semibold uppercase tracking-[0.2em]
            ${light ? "text-accent" : "text-accent"}
          `}
        >
          {label}
        </p>
      )}
      <h2
        className={`
          ${headingFont} text-3xl font-bold sm:text-4xl lg:text-[2.75rem]
          ${light ? "text-white" : "text-primary"}
          leading-tight
        `}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`
            mt-4 text-base sm:text-lg leading-relaxed max-w-2xl
            ${centered ? "mx-auto" : ""}
            ${light ? "text-white/70" : "text-mid"}
          `}
        >
          {subtitle}
        </p>
      )}
      {accent && (
        <div
          className={`
            mt-5 h-[2px] w-12 bg-accent
            ${centered ? "mx-auto" : ""}
          `}
        />
      )}
    </div>
  );
}
