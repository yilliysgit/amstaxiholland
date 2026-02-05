export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats?: HeroStat[];
  image?: string;
  imageAlt?: string;
  backgroundImage?: string;
}

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface HowItWorksData {
  title: string;
  steps: HowItWorksStep[];
}

export interface PremiumVehiclesData {
  title: string;
  subtitle: string;
  items: string[];
  image?: string;
  imageAlt?: string;
}

export interface AudienceData {
  title: string;
  list: string[];
}

export interface RatesSectionData {
  title: string;
  description: string;
  note: string;
}

export interface PricingCard {
  title: string;
  price: string;
  details: string[];
}

export interface PricingData {
  title: string;
  cards: PricingCard[];
}

export interface BookingCardData {
  title: string;
  description: string;
  cta: string;
}

export interface WhyBusinessItem {
  title: string;
  text: string;
}

export interface WhyBusinessData {
  title: string;
  items: WhyBusinessItem[];
}

export interface ExtraServicesData {
  title: string;
  items: string[];
}

export interface NationwideData {
  title: string;
  text: string;
}

export interface FooterCTAData {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  title: string;
  items: FAQItem[];
}

export interface SEOData {
  title: string;
  description: string;
}

export interface BusinessPageData {
  hero: HeroData;
  howItWorks: HowItWorksData;
  premiumVehicles: PremiumVehiclesData;
  audience: AudienceData;
  ratesSection: RatesSectionData;
  pricing: PricingData;
  bookingCard: BookingCardData;
  whyBusiness: WhyBusinessData;
  extraServices: ExtraServicesData;
  nationwide: NationwideData;
  footerCTA: FooterCTAData;
  faq?: FAQData;
  seo: SEOData;
}
