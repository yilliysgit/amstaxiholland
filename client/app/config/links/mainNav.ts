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
    nl: string;
    en: string;
  };
};

/**
 * Hoofd navigatie met vertaalde URLs naar Sanity diensten
 */
export const mainNav: NavItem[] = [
  {
    key: "particulier",
    href: {
      nl: "/diensten/particulier-vervoer",
      en: "/services/private-transport",
    },
  },
  {
    key: "zakelijk",
    href: {
      nl: "/diensten/zakelijk-vervoer",
      en: "/services/business-transfers",
    },
  },
  {
    key: "amsschiphol",
    href: {
      nl: "/diensten/schipholvervoer",
      en: "/services/airport-transport",
    },
  },
  {
    key: "tours",
    href: {
      nl: "/diensten/tours",
      en: "/services/tours",
    },
  },
  {
    key: "internationaal",
    href: {
      nl: "/diensten/internationaal-vervoer",
      en: "/services/international-transport",
    },
  },
];