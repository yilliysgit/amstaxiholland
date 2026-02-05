// app/config/links/home/homeHero.ts

export type HomeHeroLink = {
  key: string;
  href: {
    nl: string;
    en: string;
  };
};

/**
 * 🏠 HOMEPAGE LINKS
 */
export const homeHero = {
  // CTA buttons in hero
  cta: {
    services: {
      key: "ourServices",
      href: {
        nl: "/diensten",
        en: "/services",
      },
    },
  },
};