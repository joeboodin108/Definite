import Container from "./Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: "minimal" | "split" | "immersive";
  image?: string;
  isArabic?: boolean;
  headingFont?: string;
  children?: React.ReactNode;
}

const purpleGlowStyle = {
  background: "#ffffff",
  backgroundImage: `radial-gradient(circle at top left, rgba(173, 109, 244, 0.5), transparent 70%)`,
  filter: "blur(80px)",
  backgroundRepeat: "no-repeat",
} as const;

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
      <section className="relative bg-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true" style={purpleGlowStyle} />

        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className={isArabic ? "text-start" : "text-start"}>
              <h1
                className={`${headingFont} text-4xl font-bold text-primary sm:text-5xl leading-tight`}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="mt-5 max-w-lg text-base leading-relaxed text-mid">
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
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10" />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  if (variant === "immersive") {
    return (
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true" style={purpleGlowStyle} />

        {image && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
          </>
        )}
        <Container className="relative z-10 pb-10 pt-40">
          <div className="text-center">
            <h1
              className={`${headingFont} text-4xl font-bold text-primary sm:text-5xl`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base text-mid">{subtitle}</p>
            )}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </Container>
      </section>
    );
  }

  // Default: minimal variant
  return (
    <section className="relative bg-white py-20 pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true" style={purpleGlowStyle} />
      <Container className="relative z-10">
        <h1
          className={`${headingFont} text-3xl font-bold text-primary sm:text-4xl`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-base text-mid">{subtitle}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
