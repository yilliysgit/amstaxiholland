// 📍 BESTAND: src/app/config/header/config.ts
// 🎯 Schone basis + betrouwbare active-state afleiding

import type { HeaderConfig, NavigationItem } from "@/types/header/header.types";

/* Helpers */
const clean = (p: string) =>
  (p.split(/[?#]/)[0] || "/").replace(/\/+$/, "") || "/";

const isActive = (path: string, href: string) => {
  const p = clean(path);
  const h = clean(href);
  return h === "/" ? p === "/" : p === h || p.startsWith(`${h}/`); // segmentgrens
};

// 👉 exporteer deze!
export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  logo: {
    src: "/images/logo.svg",
    alt: "AmsTaxiHolland - Altijd voor u onderweg",
    href: "/",
  },
  navigation: [
    { id: "particulier", name: "Particulier", href: "/particulier", active: false },
    { id: "zakelijk", name: "Zakelijk", href: "/zakelijk", active: false },
    { id: "schiphol", name: "Schiphol", href: "/schiphol-airport", active: false },
    { id: "tours", name: "Tours", href: "/tours", active: false },
    { id: "internationaal", name: "Internationaal", href: "/internationaal", active: false },
  ],
  languages: [
    { code: "NL", name: "Nederlands", flag: "🇳🇱" },
    { code: "EN", name: "English", flag: "🇬🇧" },
  ],
  currentLanguage: "NL",
};

export function setActivePage(pathname: string, language?: string): HeaderConfig {
  const path = clean(pathname || "/");
  return {
    ...DEFAULT_HEADER_CONFIG,
    currentLanguage: language ?? DEFAULT_HEADER_CONFIG.currentLanguage,
    navigation: DEFAULT_HEADER_CONFIG.navigation.map((item) => ({
      ...item,
      active: isActive(path, item.href),
    })),
  };
}

// Helper voor directe navigatie updates
export function updateActiveNavigation(items: NavigationItem[], pathname: string) {
  const path = clean(pathname || "/");
  return items.map((item) => ({
    ...item,
    active: isActive(path, item.href),
  }));
}