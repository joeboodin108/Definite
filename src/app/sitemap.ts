import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://definite919.com";
  const locales = ["en", "ar"];
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/book",
    "/gallery",
  ];

  const staticEntries = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );

  const categoryEntries = ["dental-treatments", "facial-treatments"].flatMap(
    (category) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/services/${category}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  );

  const serviceEntries = services.flatMap((service) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${service.category}/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...categoryEntries, ...serviceEntries];
}
