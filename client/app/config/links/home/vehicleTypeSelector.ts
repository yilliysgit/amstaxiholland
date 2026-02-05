// app/config/links/home/vehicleTypeSelector.ts

export type VehicleTypeLink = {
  key: string;
  href: {
    nl: string;
    en: string;
  };
};

/**
 * 🚗 VEHICLE TYPE SELECTOR LINKS
 */
export const vehicleTypeSelector = {
  // Detail pages per vehicle type
  businessClass: {
    key: "businessClass",
    href: {
      nl: "/vervoerstype/business-class",
      en: "/transport-type/business-class",
    },
  },
  vipClass: {
    key: "vipClass",
    href: {
      nl: "/vervoerstype/vip-class",
      en: "/transport-type/vip-class",
    },
  },
  minivanLuxury: {
    key: "minivanLuxury",
    href: {
      nl: "/vervoerstype/minivan-luxury",
      en: "/transport-type/minivan-luxury",
    },
  },
  ladiesTaxi: {
    key: "ladiesTaxi",
    href: {
      nl: "/vervoerstype/ladies-taxi",
      en: "/transport-type/ladies-taxi",
    },
  },
};

// Helper function om de link te krijgen op basis van slug
export function getVehicleTypeLink(slug: string) {
  const linkMap: Record<string, VehicleTypeLink> = {
    'business-class': vehicleTypeSelector.businessClass,
    'vip-class': vehicleTypeSelector.vipClass,
    'minivan-luxury': vehicleTypeSelector.minivanLuxury,
    'ladies-taxi': vehicleTypeSelector.ladiesTaxi,
  };
  
  return linkMap[slug];
}