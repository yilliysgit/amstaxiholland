// app/config/links/mainNav.ts

export type NavItemKey =
  | "particulier"
  | "zakelijk"
  | "amsschiphol"
  | "tours"
  | "internationaal";

export type NavItem = {
  key: NavItemKey;
  href: {
    nl: string;  // Nederlandse URL
    en: string;  // Engelse URL
  };
};

/**
 * Hoofd navigatie met vertaalde URLs
 */
export const mainNav: NavItem[] = [
  {
    key: "particulier",
    href: {
      nl: "/particulieren",
      en: "/private",
    },
  },
  {
    key: "zakelijk",
    href: {
      nl: "/zakelijk",
      en: "/business",
    },
  },
  {
    key: "amsschiphol",
    href: {
      nl: "/ams-schiphol-airport",
      en: "/ams-schiphol-airport",  // Deze blijft hetzelfde
    },
  },
  {
    key: "tours",
    href: {
      nl: "/tours",
      en: "/tours",  // Deze blijft hetzelfde
    },
  },
  {
    key: "internationaal",
    href: {
      nl: "/internationaal",
      en: "/international",
    },
  },
];