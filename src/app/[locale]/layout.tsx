import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { cormorant, inter, cairo } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: {
      template: isArabic
        ? "%s | عيادات ديفنت لطب الأسنان"
        : "%s | Definite Dental Clinics",
      default: isArabic
        ? "عيادات ديفنت لطب الأسنان | عبدون، عمّان"
        : "Definite Dental Clinics | Abdoun, Amman",
    },
    description: isArabic
      ? "علاجات أسنان وتجميل متقدمة في عبدون، عمّان، الأردن. فريق متخصص وتقنيات حديثة."
      : "Premium dental and facial aesthetic treatments in Abdoun, Amman, Jordan. Expert team and advanced technology.",
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isArabic = locale === "ar";
  const fontVars = `${cormorant.variable} ${inter.variable} ${cairo.variable}`;
  const bodyFont = isArabic ? "font-cairo" : "font-inter";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"} className={fontVars}>
      <body className={`${bodyFont} antialiased bg-white text-dark`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
