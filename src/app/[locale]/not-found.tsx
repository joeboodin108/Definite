import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import Container from "@/components/ui/Container";

export default function NotFound() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const headingFont = isArabic ? "font-cairo" : "font-cormorant";

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-32">
      <Container className="text-center">
        <h1 className={`${headingFont} text-6xl font-bold text-primary`}>404</h1>
        <p className="mt-4 text-lg text-mid">
          {isArabic
            ? "الصفحة التي تبحث عنها غير موجودة."
            : "The page you're looking for doesn't exist."}
        </p>
        <Link
          href="/"
          className="
            mt-8 inline-flex rounded-full bg-primary px-8 py-3
            text-sm font-semibold text-white
            transition-colors hover:bg-primary-dark
          "
        >
          {t("backToHome")}
        </Link>
      </Container>
    </section>
  );
}
