import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import LocationMap from "@/components/home/LocationMap";

type Props = {
  params: Promise<{ locale: string }>;
};

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
