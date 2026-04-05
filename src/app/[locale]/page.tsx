import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";

const TestimonialsSlider = dynamic(
  () => import("@/components/home/TestimonialsSlider"),
  { loading: () => <div className="py-14 md:py-20 lg:py-28" /> }
);

const LocationMap = dynamic(
  () => import("@/components/home/LocationMap"),
  { loading: () => <div className="py-20" /> }
);

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  return {
    title: isArabic ? "الرئيسية" : "Home",
    description: isArabic
      ? "عيادات ديفنت لطب الأسنان والتجميل في عبدون، عمّان. خدمات أسنان وتجميل الوجه بأحدث التقنيات."
      : "Definite Dental Clinics in Abdoun, Amman. Premium dental and facial aesthetic treatments with advanced technology.",
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CategoryCards />
      <WhyChooseUs />
      <StatsCounter />
      <TestimonialsSlider />
      <LocationMap />
    </>
  );
}
