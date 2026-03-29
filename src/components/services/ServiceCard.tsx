import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import type { ServiceData, Locale } from "@/types";

interface ServiceCardProps {
  service: ServiceData;
  locale: Locale;
}

export default function ServiceCard({ service, locale }: ServiceCardProps) {
  const isArabic = locale === "ar";

  return (
    <Link
      href={`/services/${service.category}/${service.slug}`}
      className="
        group relative flex flex-col overflow-hidden rounded-xl
        bg-white border border-primary/5
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1
      "
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={`text-lg font-bold text-primary ${isArabic ? "font-cairo" : "font-inter"}`}
        >
          {service.title[locale]}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mid">
          {service.shortDescription[locale]}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          <ArrowRight
            className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rtl:rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
          />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
