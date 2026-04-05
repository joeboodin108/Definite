import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://definite919.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
