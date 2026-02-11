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

    // Over ons
    '/over-ons': {
      nl: '/over-ons',
      en: '/about-us'
    },

    // DIENSTEN - Dynamic routes from Sanity
    '/diensten': {
      nl: '/diensten',
      en: '/services'
    },
    '/diensten/[slug]': {
      nl: '/diensten/[slug]',
      en: '/services/[slug]'
    },
    '/diensten/[slug]/[subslug]': {
      nl: '/diensten/[slug]/[subslug]',
      en: '/services/[slug]/[subslug]'
    },

    '/diensten/[slug]/[subslug]/[serviceslug]': {
  nl: '/diensten/[slug]/[subslug]/[serviceslug]',
  en: '/services/[slug]/[subslug]/[serviceslug]'
},
    
    // Vervoerstype (if still needed)
    '/vervoerstype': {
      nl: '/vervoerstype',
      en: '/transport-type'
    },
    '/vervoerstype/[slug]': {
      nl: '/vervoerstype/[slug]',
      en: '/transport-type/[slug]'
    },
    
    // Booking & Driver routes
    '/reserveren': {
      nl: '/reserveren',
      en: '/booking'
    },
    '/chauffeur-worden': {
      nl: '/chauffeur-worden',
      en: '/become-driver'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);