// client/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
  localePrefix: 'always',
  
  pathnames: {
    '/': '/',
    
    // Contact
    '/contact': '/contact',

    // ⭐ Over ons
    '/over-ons': {
      nl: '/over-ons',
      en: '/about-us'
    },

    
    // 🆕 DIENSTEN (alle diensten vallen hieronder)
    '/diensten': {
      nl: '/diensten',
      en: '/services'
    },
    '/diensten/zakelijk': {
      nl: '/diensten/zakelijk',
      en: '/services/business-transport'
    },
    '/diensten/particulieren': {
      nl: '/diensten/particulieren',
      en: '/services/private-transport'
    },
    '/diensten/internationaal': {
      nl: '/diensten/internationaal',
      en: '/services/international-transport'
    },
    '/diensten/tours': {
      nl: '/diensten/tours',
      en: '/services/tours'
    },

    '/diensten/tours/[slug]': {
  nl: '/diensten/tours/[slug]',
  en: '/services/tours/[slug]'
},
  
    '/diensten/hotel': {
      nl: '/diensten/hotel-vervoer',
      en: '/services/hotel-transfers'
    },
    '/diensten/evenementenvervoer': {
      nl: '/diensten/evenementenvervoer',
      en: '/services/event-transport'
    },
    '/diensten/taxi-schiphol': {
      nl: '/diensten/taxi-schiphol',
      en: '/services/schiphol-airport-transfer'
    },
    
    // Vervoerstype overzicht
    '/vervoerstype': {
      nl: '/vervoerstype',
      en: '/transport-type'
    },
    
    // Vervoerstype detail pagina's
    '/vervoerstype/business-class': {
      nl: '/vervoerstype/zakelijke-taxi',
      en: '/transport-type/business-taxi'
    },
    '/vervoerstype/vip-class': {
      nl: '/vervoerstype/vip-klasse',
      en: '/transport-type/vip-class'
    },
    '/vervoerstype/minivan-luxury': {
      nl: '/vervoerstype/luxe-minivan',
      en: '/transport-type/luxury-minivan'
    },
    '/vervoerstype/ladies-taxi': {
      nl: '/vervoerstype/dames-taxi',
      en: '/transport-type/ladies-taxi'
    },
    
    // Events route
    '/event-transport': {
      nl: '/evenementenvervoer',
      en: '/event-transport'
    },
    
    // Booking & Driver routes
    '/booking': {
      nl: '/reserveren',
      en: '/booking'
    },
    '/become-driver': {
      nl: '/chauffeur-worden',
      en: '/become-driver'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);