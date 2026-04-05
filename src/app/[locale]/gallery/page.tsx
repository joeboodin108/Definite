"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95", category: "dental" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881", category: "facial" },
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09", category: "clinic" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5", category: "dental" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c", category: "facial" },
  { src: "https://images.unsplash.com/photo-1629909615184-74f495363b67", category: "clinic" },
  { src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926", category: "dental" },
  { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", category: "facial" },
];

const filters = ["all", "dental", "facial", "clinic"] as const;

export default function GalleryPage() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <>
      <PageHero
        variant="immersive"
        title={t("title")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
        isArabic={isArabic}
        headingFont={headingFont}
      >
        {/* Filter Tabs inside hero */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                rounded-full px-6 py-2 text-sm font-medium
                transition-all duration-300
                ${
                  activeFilter === filter
                    ? "bg-white text-primary"
                    : "border border-white/30 text-white/70 hover:border-white hover:text-white"
                }
              `}
            >
              {t(filter)}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Gallery Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((img, index) => (
              <ScrollReveal key={`${img.src}-${index}`} animation="scale-in" delay={index * 60}>
                <div className="group relative h-72 overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
