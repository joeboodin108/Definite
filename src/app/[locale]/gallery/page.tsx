"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80", category: "dental" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", category: "facial" },
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80", category: "clinic" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80", category: "dental" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80", category: "facial" },
  { src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&q=80", category: "clinic" },
  { src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80", category: "dental" },
  { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80", category: "facial" },
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
      {/* Hero Banner */}
      <section className="relative bg-primary py-32 pt-40">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative z-10 text-center">
          <h1
            className={`${headingFont} text-4xl font-bold text-white sm:text-5xl`}
          >
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-white/70">{t("subtitle")}</p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-accent" />
        </Container>
      </section>

      {/* Gallery Content */}
      <section className="py-20 lg:py-28">
        <Container>
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  rounded-full px-6 py-2 text-sm font-medium
                  transition-all duration-300
                  ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "border border-primary/20 text-mid hover:border-primary hover:text-primary"
                  }
                `}
              >
                {t(filter)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((img, index) => (
              <div
                key={index}
                className="group relative h-72 overflow-hidden rounded-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img.src}')` }}
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
