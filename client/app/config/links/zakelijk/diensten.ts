// app/config/links/zakelijk/diensten.ts

// app/config/links/zakelijk/diensten.ts

export const zakelijkDiensten = {
  airportTransfer: "/ams-schiphol-airport",           // ✅ KEY
  eventTransport: "/event-transport",                 // ✅ KEY  
  roadshows: "/diensten/zakelijk#roadshows",         // ⚠️ Anchor blijft NL
  vipTransport: "/vervoerstype/vip-class",           // ✅ KEY (was vip-klasse)
  longDistance: "/diensten/internationaal",          // ✅ KEY
  dailyTransport: "/booking?type=zakelijk",          // ✅ KEY (was /reserveren)
  booking: "/booking",                                // ✅ KEY (was /reserveren)
  ladiesTaxi: "/vervoerstype/ladies-taxi"            // ✅ KEY (was dames-taxi)
} as const;