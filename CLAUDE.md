# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Definite Dental Clinics (عيادات ديفنت لطب الأسنان) — a bilingual (EN/AR) premium dental and facial aesthetic clinic website located in Abdoun, Amman, Jordan.

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom brand colors
- **CMS:** Sanity.io v3 (embedded studio at `/studio`, next-sanity v9)
- **i18n:** next-intl with `/en/` and `/ar/` URL prefixes (localePrefix: 'always')
- **Icons:** Lucide React (note: no Instagram/Facebook icons — inline SVGs used instead)
- **Fonts:** Cormorant Garamond (EN headings), Inter (EN body), Cairo (AR all) via next/font/google

## Commands

```bash
npm run dev       # Start dev server (localhost:3000, redirects to /en/)
npm run build     # Production build (generates 72+ static pages)
npm run start     # Start production server
npm run lint      # ESLint check
```

## Architecture

### Routing

- `src/app/[locale]/` — All user-facing pages under locale dynamic segment
- `src/app/studio/[[...tool]]/` — Sanity Studio (outside locale segment, excluded from middleware)
- `src/middleware.ts` — next-intl middleware handles locale detection and routing
- `src/i18n/routing.ts` — Defines supported locales ['en', 'ar'] and routing config
- `src/i18n/request.ts` — Loads locale-specific messages from `messages/` directory
- `src/lib/navigation.ts` — Locale-aware Link, redirect, usePathname, useRouter

### Pages

| Route | Status |
|---|---|
| `/[locale]` | Homepage — Hero, Category Cards, Why Choose Us, Stats, Testimonials |
| `/[locale]/about` | About — Clinic story, Mission/Vision, Services Focus, Facility photos |
| `/[locale]/services` | Services index — 2 category entry cards |
| `/[locale]/services/[category]` | Category — 13 service cards grid (dental-treatments / facial-treatments) |
| `/[locale]/services/[category]/[slug]` | Service detail — 26 individual services with related services |
| `/[locale]/book` | Booking form with dynamic dropdowns, WhatsApp alternative |
| `/[locale]/contact` | Contact info, form, Google Maps placeholder |
| `/[locale]/gallery` | Gallery with filter tabs — **built but NOT linked anywhere** |

### Key Data Files

- `src/lib/services-data.ts` — All 26 services with slugs, {en,ar} content, Unsplash images. Used as static data source and Sanity fallback.
- `messages/en.json` / `messages/ar.json` — All UI strings organized by page namespace (Nav, Footer, Home, About, Services, Book, Contact, Gallery, Common)

### Components

- `src/components/layout/` — Navbar (client, sticky with scroll effect), Footer (server), FloatingWhatsApp, LocaleSwitcher
- `src/components/ui/` — Button, SectionHeading, Container
- `src/components/home/` — Hero, CategoryCards, WhyChooseUs, StatsCounter (client, intersection observer), TestimonialsSlider (client)
- `src/components/services/` — ServiceCard
- `src/components/book/` — BookingForm (client, dynamic service dropdown)
- `src/components/contact/` — ContactForm (client)

### Sanity CMS

- Schemas in `sanity/schemas/`: service, serviceCategory, testimonial, clinicInfo (singleton), galleryImage, blockContent
- Field-level localization: `title: { en, ar }` pattern (not document-level)
- Client: `src/lib/sanity.client.ts`, queries: `src/lib/sanity.queries.ts`, image helper: `src/lib/sanity.image.ts`
- Studio configured in `sanity.config.ts`, requires project ID in `.env.local`

## Brand Colors

- Primary: `#3D1A5C` (Deep Purple — 90% usage)
- Accent: `#B8962E` (Gold — 10%, only 1-2 CTAs, rare dividers, NOT for backgrounds/cards)
- Light: `#F3EEF9` (subtle section backgrounds)
- Dark: `#2D2D2D` (body text), Mid: `#555555` (secondary text)

## RTL / Bilingual

- `<html dir="rtl">` set in locale layout when Arabic active
- Use Tailwind logical properties: `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`
- Heading font switches: Cormorant Garamond (EN) → Cairo (AR)
- Body font switches: Inter (EN) → Cairo (AR)
- All text must have EN and AR versions (either in messages/*.json or services-data.ts)

## Contact Info

- Phone: 079 5 919 919 (formatted with spaces)
- WhatsApp: wa.me/962795919919
- Instagram: @definite_dental_clinics
- Facebook: DefiniteClinics
- Location: Abdoun, Amman, Jordan
