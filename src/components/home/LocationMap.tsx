import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";

export default function LocationMap() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-16 pt-8">
        <div className="text-center mb-8">
          <h2 className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}>
            {isArabic ? "موقعنا" : "Find Us"}
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2 text-mid">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm">
              {isArabic ? "عبدون، عمّان، الأردن" : "Abdoun, Amman, Jordan"}
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps?q=31.9484122,35.8825359&z=17&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={isArabic ? "موقع العيادة على الخريطة" : "Clinic location on map"}
          />
        </div>
      </div>
    </section>
  );
}
