// app/config/links/zakelijk/index.ts

export * from './hero';
export * from './diensten';
export * from './vloot';

// Algemene zakelijk links
// app/config/links/zakelijk/index.ts

export const zakelijkGeneral = {
  contact: "/contact?ref=zakelijk",
  
  // Functies die de juiste locale anchor geven
  faq: (locale: 'nl' | 'en') => 
    locale === 'nl' ? '/diensten/zakelijk#faq' : '/services/business-transport#faq',
  
  pricing: (locale: 'nl' | 'en') => 
    locale === 'nl' ? '/diensten/zakelijk#tarieven' : '/services/business-transport#pricing',
  
  createAccount: (locale: 'nl' | 'en') => 
    locale === 'nl' ? '/diensten/zakelijk#zakelijk-account' : '/services/business-transport#business-account',
  
  quote: (locale: 'nl' | 'en') => 
    locale === 'nl' ? '/diensten/zakelijk#offerte' : '/services/business-transport#quote'
} as const;