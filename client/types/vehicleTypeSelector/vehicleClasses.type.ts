// client/types/vehicleTypeSelector/vehicleClasses.type.ts

export type VehicleTheme = {
  primary: string;
  background: string;
};

export type VehicleHero = {
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
};

export type VehicleFacilities = {
  included: string[];
  exclusive?: string[];
};

export type VehiclePricing = {
  base: number;
  airport?: number;
  note?: string;
};

export type VehicleFAQItem = {
  question: string;
  answer: string;
};

export type VehicleClass = {
  slug: string;
  label: string;
  theme: VehicleTheme;
  hero: VehicleHero;
  facilities: VehicleFacilities;
  useCases: string[];
  pricing: VehiclePricing;
  faq: VehicleFAQItem[];
};
