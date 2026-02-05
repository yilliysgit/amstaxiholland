// app/config/links/zakelijk/vloot.ts

/**
 * 🚗 ZAKELIJK VLOOT LINKS
 * Links naar voertuigcategorieën
 */
export const zakelijkVloot = {
  // Gebruik de KEYS uit routing.ts (niet de NL waarden!)
  businessClass: "/vervoerstype/business-class",      // ✅ KEY (niet /zakelijke-taxi)
  vipClass: "/vervoerstype/vip-class",                // ✅ KEY (niet /vip-klasse)
  minivanLuxury: "/vervoerstype/minivan-luxury",      // ✅ KEY (niet /luxe-minivan)
  electric: "/vervoerstype/electric",                 // ⚠️ Check of deze in routing.ts staat!
  ladiesTaxi: "/vervoerstype/ladies-taxi",            // ✅ KEY (niet /dames-taxi)
  fleetOverview: "/vervoerstype"                      // ✅ KEY
} as const;