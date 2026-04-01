import Container from "./Container";
import GeometricBackground from "./GeometricBackground";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: "minimal" | "split" | "immersive";
  image?: string;
  isArabic?: boolean;
  headingFont?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  variant = "minimal",
  image,
  isArabic = false,
  headingFont = "font-cormorant",
  children,
}: PageHeroProps) {
  if (variant === "split") {
    return (
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark pt-32 pb-20 overflow-hidden">
        <GeometricBackground variant="dark" />
        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className={isArabic ? "text-start" : "text-start"}>
              <h1
                className={`${headingFont} text-4xl font-bold text-white sm:text-5xl leading-tight`}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
                  {subtitle}
                </p>
              )}
              {children}
            </div>
            {image && (
              <div className="hidden lg:block">
                <div className="relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            )}
          </div>
        </Container>
        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>
    );
  }

  if (variant === "immersive") {
    return (
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <GeometricBackground variant="dark" />
        {image && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
          </>
        )}
        {!image && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
        )}
        <Container className="relative z-10 pb-10 pt-40">
          <div className="text-center">
            <h1
              className={`${headingFont} text-4xl font-bold text-white sm:text-5xl`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base text-white/60">{subtitle}</p>
            )}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </Container>
      </section>
    );
  }

  // Default: minimal variant
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark py-20 pt-32 overflow-hidden">
      <GeometricBackground variant="dark" />
      <Container className="relative z-10">
        <h1
          className={`${headingFont} text-3xl font-bold text-white sm:text-4xl`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-base text-white/60">{subtitle}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
