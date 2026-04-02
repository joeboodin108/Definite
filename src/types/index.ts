export type Locale = "en" | "ar";

export type LocalizedString = {
  en: string;
  ar: string;
};

export type ServiceCategory = "dental-treatments" | "facial-treatments";

export interface ServiceData {
  slug: string;
  category: ServiceCategory;
  icon: string;
  image: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  benefits: { en: string[]; ar: string[] };
}

export interface TestimonialData {
  name: LocalizedString;
  quote: LocalizedString;
  rating: number;
}

export interface ClinicInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: LocalizedString;
  workingHours: LocalizedString;
  socialLinks: {
    instagram: string;
    facebook: string;
  };
}
