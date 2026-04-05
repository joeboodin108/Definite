import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://definite919.com"
  ),
  title: "Definite Dental Clinics | عيادات ديفنت لطب الأسنان",
  description:
    "Premium dental and facial aesthetic treatments in Abdoun, Amman, Jordan. Expert care for your smile and skin.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Definite Dental Clinics",
    images: [
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 600,
        alt: "Definite Dental Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
