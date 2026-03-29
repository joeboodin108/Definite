import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Definite Dental - Content Studio",
  description: "Content management for Definite Dental Clinics website.",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
