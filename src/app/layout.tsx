import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Definite Dental Clinics | عيادات ديفنت لطب الأسنان",
  description:
    "Premium dental and facial aesthetic treatments in Abdoun, Amman, Jordan. Expert care for your smile and skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
