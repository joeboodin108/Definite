import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SoonBadge from "@/components/ui/SoonBadge";
import { Phone, MapPin, Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: isArabic
      ? "احجز موعدك في عيادات ديفنت لطب الأسنان والتجميل في عبدون، عمّان."
      : "Book your appointment at Definite Dental Clinics in Abdoun, Amman.",
  };
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Book");
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  const directTitle = isArabic ? "احجز معنا الآن" : "Book With Us Today";
  const directSubtitle = isArabic
    ? "تواصل مع عيادتنا مباشرة — فريقنا متاح لترتيب موعدك في الوقت الذي يناسبك."
    : "Reach our clinic directly — our team is standing by to schedule a time that works for you.";
  const callTitle = isArabic ? "اتصل بنا" : "Call Us";
  const callDesc = isArabic
    ? "تحدث مع موظف الاستقبال لدينا واحجز موعدك فوراً."
    : "Speak to our receptionist and confirm your appointment instantly.";
  const whatsappTitle = isArabic ? "واتساب" : "WhatsApp";
  const whatsappDesc = isArabic
    ? "راسلنا على واتساب — رد سريع خلال ساعات العمل."
    : "Message us on WhatsApp — quick replies during clinic hours.";
  const hoursLabel = isArabic ? "ساعات العمل" : "Clinic Hours";
  const hoursValue = isArabic
    ? "السبت – الخميس: ١٠ص – ٨م"
    : "Saturday – Thursday: 10am – 8pm";
  const addressLabel = isArabic ? "العنوان" : "Location";
  const addressValue = isArabic
    ? "عبدون، عمّان، الأردن"
    : "Abdoun, Amman, Jordan";
  const liveNow = isArabic ? "متاح الآن" : "Live Now";

  const onlineTitle = isArabic ? "الحجز الإلكتروني" : "Online Booking";
  const onlineDesc = isArabic
    ? "قريباً، ستتمكن من اختيار الخدمة والطبيب والوقت المناسب مباشرة من هنا."
    : "Soon you'll be able to pick your service, doctor, and time slot right from this page.";

  return (
    <>
      <PageHero
        variant="minimal"
        title={t("title")}
        subtitle={t("subtitle")}
        isArabic={isArabic}
        headingFont={headingFont}
      />

      {/* Primary, live booking channels */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {liveNow}
              </span>
              <h2 className={`${headingFont} mt-4 text-3xl font-bold text-primary sm:text-4xl`}>
                {directTitle}
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-mid leading-relaxed">
                {directSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {/* Call card */}
              <a
                href="tel:+962795919919"
                className="
                  group relative flex flex-col rounded-2xl bg-primary p-8
                  text-white shadow-lg shadow-primary/15
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25
                "
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <Phone className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className={`${headingFont} mt-5 text-2xl font-bold`}>
                  {callTitle}
                </h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {callDesc}
                </p>
                <span
                  dir="ltr"
                  className="mt-6 text-xl font-semibold tracking-wide"
                >
                  079 5 919 919
                </span>
              </a>

              {/* WhatsApp card */}
              <a
                href="https://wa.me/962795919919"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex flex-col rounded-2xl bg-[#25D366] p-8
                  text-white shadow-lg shadow-[#25D366]/20
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30
                "
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>
                <h3 className={`${headingFont} mt-5 text-2xl font-bold`}>
                  {whatsappTitle}
                </h3>
                <p className="mt-2 text-sm text-white/90 leading-relaxed">
                  {whatsappDesc}
                </p>
                <span className="mt-6 text-sm font-semibold uppercase tracking-wider">
                  {t("whatsappBtn")} →
                </span>
              </a>
            </div>

            {/* Supporting info */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl bg-surface p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Clock className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mid">
                    {hoursLabel}
                  </p>
                  <p className="mt-1 text-sm text-dark">{hoursValue}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-surface p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mid">
                    {addressLabel}
                  </p>
                  <p className="mt-1 text-sm text-dark">{addressValue}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Online booking — disabled, coming soon */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div
            aria-disabled="true"
            className="
              mx-auto max-w-4xl rounded-2xl border border-dashed border-primary/20
              bg-primary-light/40 p-10 text-center select-none pointer-events-none
              opacity-80
            "
          >
            <div className="inline-flex items-center">
              <h3 className={`${headingFont} text-2xl font-bold text-primary/60 sm:text-3xl`}>
                {onlineTitle}
              </h3>
              <SoonBadge />
            </div>
            <p className="mt-4 max-w-xl mx-auto text-mid/70 leading-relaxed">
              {onlineDesc}
            </p>

            {/* Disabled form preview */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-xl mx-auto">
              <div className="h-11 rounded-lg bg-white/60 border border-primary/10" />
              <div className="h-11 rounded-lg bg-white/60 border border-primary/10" />
              <div className="h-11 rounded-lg bg-white/60 border border-primary/10 sm:col-span-2" />
              <div className="h-11 rounded-lg bg-white/60 border border-primary/10 sm:col-span-2" />
            </div>
            <div className="mt-5">
              <span className="inline-flex items-center rounded-full bg-primary/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                {t("submit")}
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
