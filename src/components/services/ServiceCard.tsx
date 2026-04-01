import Image from "next/image";
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
        hover:shadow-premium hover:border-primary/10
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-primary/5 transition-colors duration-300 group-hover:bg-primary/15" />
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

      {/* Left accent border on hover */}
      <div className={`absolute inset-y-0 w-[3px] bg-accent transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isArabic ? "end-0" : "start-0"}`} />
    </Link>
  );
}
