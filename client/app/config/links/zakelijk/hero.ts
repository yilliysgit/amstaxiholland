// app/config/links/zakelijk/hero.ts

/**
 * 🏢 ZAKELIJK HERO LINKS
 * CTA buttons en links in de hero sectie
 */
export const zakelijkHero = {
  // Primaire CTA - Account aanvragen (met vertaalde anchors!)
  requestAccount: (locale: 'nl' | 'en') => 
    locale === 'nl' 
      ? '/diensten/zakelijk#zakelijk-account' 
      : '/services/business-transport#business-account',
  
  // Contact CTA (geen vertaling nodig, contact blijft hetzelfde)
  contact: "/contact?ref=zakelijk",
  
  // CTA Bar - Offerte aanvragen (met vertaalde anchors!)
  requestQuote: (locale: 'nl' | 'en') => 
    locale === 'nl' 
      ? '/diensten/zakelijk#offerte' 
      : '/services/business-transport#quote'
} as const;