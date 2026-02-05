// client/app/config/links/common.ts

export type CommonLink = {
  key: string;
  href: string;
};

/**
 * 🔗 COMMON LINKS
 * Links die op meerdere plekken gebruikt worden
 */
export const commonLinks = {
  bookTaxi: {
    key: "bookTaxi",
    href: "/booking", // Next-intl zal dit vertalen
  },
  becomeDriver: {
    key: "becomeDriver",
    href: "/become-driver", // Next-intl zal dit vertalen
  },
};