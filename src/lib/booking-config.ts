import { services } from "./services-data";
import type { ServiceData } from "@/types";

/** Clinic Two healthcare ID — the only clinic that supports online booking */
export const ONLINE_BOOKING_HID = "1311";

/** Service slugs approved for online booking through Clinic Two */
const ONLINE_BOOKABLE_SLUGS = new Set([
  "veneers",
  "lumineers",
  "pediatric-treatments",
  "implants",
  "whitening",
  "x-rays",
  "root-canal",
  "extractions",
  "crowns",
  "scaling-polishing",
]);

/** Check whether a service can be booked online */
export function isBookableOnline(_slug: string): boolean {
  // Online booking temporarily disabled — API not fully configured.
  return false;
}

/** Get all services that support online booking */
export function getBookableServices(): ServiceData[] {
  return services.filter((s) => ONLINE_BOOKABLE_SLUGS.has(s.slug));
}
