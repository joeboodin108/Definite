import { client } from "./sanity.client";

export async function getServices(locale: string) {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      "title": title.${locale},
      "slug": slug.current,
      "shortDescription": shortDescription.${locale},
      "fullDescription": fullDescription.${locale},
      "category": category->slug.current,
      "categoryTitle": category->title.${locale},
      heroImage,
      "benefits": benefits.${locale},
      icon,
      order
    }`
  );
}

export async function getServiceBySlug(slug: string, locale: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      "title": title.${locale},
      "slug": slug.current,
      "shortDescription": shortDescription.${locale},
      "fullDescription": fullDescription.${locale},
      "category": category->slug.current,
      "categoryTitle": category->title.${locale},
      heroImage,
      "benefits": benefits.${locale},
      icon,
      order
    }`,
    { slug }
  );
}

export async function getTestimonials(locale: string) {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      "name": name.${locale},
      "quote": quote.${locale},
      rating,
      avatar,
      "service": service->title.${locale}
    }`
  );
}

export async function getClinicInfo(locale: string) {
  return client.fetch(
    `*[_type == "clinicInfo"][0] {
      phone,
      whatsapp,
      email,
      "address": address.${locale},
      "workingHours": workingHours.${locale},
      "aboutText": aboutText.${locale},
      socialLinks,
      mapEmbedUrl
    }`
  );
}

export async function getGalleryImages() {
  return client.fetch(
    `*[_type == "galleryImage"] | order(order asc) {
      image,
      "caption": caption,
      category,
      order
    }`
  );
}
