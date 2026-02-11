// app/config/links/home/homeLinks.ts

export const homeLinks = {
  hero: {
    cta: {
      services: {
        key: "ourServices",
        href: "/diensten" as const, // via routing.ts
      },
    },
  },

  events: {
    primaryCta: {
      key: "events",
      href: "/diensten/evenementen-vervoer" as const, // nested route key
    },
    secondaryCta: {
      key: "contact",
      href: "/contact" as const, // via routing.ts
    },
  },
} as const;
