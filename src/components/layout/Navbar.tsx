"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/book", key: "book" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isArabic = locale === "ar";

  // All pages use light hero backgrounds, so always use dark navbar text
  const isLightHero = true;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 40);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-[background-color,box-shadow] duration-500 ease-out
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(61,26,92,0.08)]"
              : "bg-transparent"
          }
        `}
      >
        {/* Decorative gold line at top — appears on scroll */}
        <div
          className={`
            h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent
            transition-opacity duration-700
            ${scrolled ? "opacity-100" : "opacity-0"}
          `}
        />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={`
              group relative flex items-center gap-2.5 py-5 transition-colors duration-300
              ${scrolled || isLightHero ? "text-primary" : "text-white"}
            `}
          >
            <Image
              src="/images/logo.jpg"
              alt="Definite Dental Clinics"
              width={38}
              height={38}
              className="rounded-full"
            />
            <span
              className={`
                text-2xl font-bold tracking-tight
                ${isArabic ? "font-cairo" : "font-cormorant"}
              `}
            >
              Definite
            </span>
            <span
              className={`
                absolute -bottom-0 start-0 h-[2px] w-0 bg-accent
                transition-all duration-500 group-hover:w-full
              `}
            />
          </Link>

          {/* Desktop Navigation — Center */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, key }) => {
              return (
                <Link
                  key={key}
                  href={href}
                  className={`
                    relative px-4 py-2 text-[0.82rem] font-medium uppercase tracking-[0.12em]
                    transition-colors duration-300
                    ${
                      isActive(href)
                        ? scrolled || isLightHero
                          ? "text-primary"
                          : "text-white"
                        : scrolled || isLightHero
                          ? "text-mid hover:text-primary"
                          : "text-white/75 hover:text-white"
                    }
                  `}
                >
                  {t(key)}
                  {/* Active indicator — thin line */}
                  <span
                    className={`
                      absolute inset-x-4 -bottom-0.5 h-[1.5px]
                      transition-all duration-300
                      ${
                        isActive(href)
                          ? "bg-accent scale-x-100"
                          : "bg-accent scale-x-0"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side — Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <LocaleSwitcher scrolled={scrolled || isLightHero} />
            <Link
              href="/book"
              className={`
                relative overflow-hidden rounded-full px-6 py-2.5
                text-[0.8rem] font-semibold uppercase tracking-[0.1em]
                bg-primary text-white
                transition-all duration-300
                hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20
              `}
            >
              {t("book")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`
              lg:hidden p-2 rounded-lg transition-colors duration-300
              ${scrolled || isLightHero ? "text-primary hover:bg-primary-light" : "text-white hover:bg-white/10"}
            `}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`
          fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`
          fixed top-0 z-[70] h-full w-[300px] bg-white
          shadow-2xl transition-transform duration-400 ease-out lg:hidden
          ${isArabic ? "start-0" : "end-0"}
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-primary-light px-6 py-5">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Definite Dental Clinics"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span
              className={`text-xl font-bold text-primary ${isArabic ? "font-cairo" : "font-cormorant"}`}
            >
              Definite
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-mid hover:bg-primary-light hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col py-4">
          {NAV_LINKS.map(({ href, key }) => {
            return (
              <Link
                key={key}
                href={href}
                className={`
                  px-6 py-3.5 text-[0.9rem] font-medium tracking-wide
                  transition-all duration-200
                  ${
                    isActive(href)
                      ? "bg-primary-light text-primary border-s-[3px] border-accent"
                      : "text-dark hover:bg-primary-light/50 hover:text-primary border-s-[3px] border-transparent"
                  }
                `}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="absolute inset-x-0 bottom-0 border-t border-primary-light p-6 space-y-3">
          <LocaleSwitcher scrolled className="w-full justify-center" />
          <Link
            href="/book"
            className="
              block w-full rounded-full bg-primary py-3
              text-center text-sm font-semibold uppercase tracking-widest text-white
              transition-all duration-300
              hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20
            "
          >
            {t("book")}
          </Link>
        </div>
      </div>
    </>
  );
}
