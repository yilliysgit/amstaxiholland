// types/tourSlider/tourSlider.type.ts

// =================================
// TOUR TYPES (Meertalig)
// =================================

export type VehicleType = 'sedan' | 'van';

export type TourCategory =
  | 'Museum'
  | 'Cultuur'
  | 'Shopping'
  | 'Natuur'
  | 'Internationaal'
  | 'Stad'
  | 'Familie';

type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
type Season = { start: ISODate; end: ISODate };

/**
 * Landen waar tours beschikbaar zijn
 */
export type TourCountry = 'Nederland' | 'België' | 'Duitsland';

/**
 * Rating systeem voor tours
 */
export interface TourRating {
  score: number;
  reviewCount: number;
}

/**
 * Extra card informatie
 */
export interface TourCardData {
  country: TourCountry;
  distanceFromAmsterdam?: number;
  maxPersons: Record<VehicleType, number>;
  pickupAvailable: boolean;
  rating: TourRating;
}

/**
 * Base Tour type
 * name en description zijn optioneel - komen uit translations
 */
type BaseTour = {
  id: number;
  slug: string;
  name?: string;        // ⬅️ OPTIONEEL - komt uit JSON
  description?: string; // ⬅️ OPTIONEEL - komt uit JSON
  durationHours: number;
  category: TourCategory | TourCategory[];
  basePrice?: Record<VehicleType, number>;
  imageSrc: string;
  imageAlt: string; 
  cardData: TourCardData;
};

/**
 * Tour type met discriminated union voor seasonal
 */
export type Tour =
  | (BaseTour & { isSeasonal: true; season: Season })
  | (BaseTour & { isSeasonal?: false; season?: undefined });

/**
 * Props voor de TourCard component
 */
export interface TourCardProps {
  tour: Tour;
  onBookNow: (tourId: number) => void;
  onMoreInfo: (tourId: number) => void;
}

/**
 * State voor geselecteerde tour in booking
 */
export interface SelectedTourState {
  tour: Tour | null;
  isBookingFormOpen: boolean;
}

// =================================
// HELPER FUNCTIES (Locale-aware)
// =================================

/** 
 * Format prijs als valuta
 */
export function formatPriceEUR(amount: number, locale: 'nl' | 'en' = 'nl'): string {
  const formatter = new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}

/** 
 * Prijs ophalen op basis van tour + vehicle 
 */
export function getTourPrice(tour: Tour, vehicle: VehicleType): number | null {
  return tour.basePrice?.[vehicle] ?? null;
}

/** 
 * Laagste prijs voor "Vanaf €X" display 
 */
export function getLowestPrice(tour: Tour): number | null {
  const values = tour.basePrice ? Object.values(tour.basePrice) : [];
  return values.length ? Math.min(...values) : null;
}

/**
 * Is deze tour beschikbaar op een bepaalde datum?
 */
export function isInSeason(tour: Tour, on: Date = new Date()): boolean {
  if (!tour.isSeasonal) return true;
  const pad = (n: number) => String(n).padStart(2, '0');
  const d = `${on.getFullYear()}-${pad(on.getMonth() + 1)}-${pad(on.getDate())}` as ISODate;
  return d >= tour.season.start && d <= tour.season.end;
}

/** 
 * Slugify helper 
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** 
 * Format duur in uren naar leesbare string
 */
export function formatDuration(hours: number, locale: 'nl' | 'en' = 'nl'): string {
  const h = Math.trunc(hours);
  let m = Math.round((hours - h) * 60);
  let hh = h;
  
  if (m === 60) {
    hh += 1;
    m = 0;
  }
  
  const hourLabel = locale === 'nl' ? 'uur' : (hh === 1 ? 'hour' : 'hours');
  const minLabel = 'min';
  
  const hourText = hh ? `${hh} ${hourLabel}` : '';
  const minText = m ? `${m} ${minLabel}` : '';
  
  return [hourText, minText].filter(Boolean).join(' ') || '0 min';
}

/** 
 * Format afstand voor display
 */
export function formatDistance(km: number, locale: 'nl' | 'en' = 'nl'): string {
  const formatter = new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', { 
    maximumFractionDigits: 1 
  });
  return `${formatter.format(km)} km`;
}

/** 
 * Max aantal personen over alle voertuigtypes 
 */
export function getMaxPersonsDisplay(tour: Tour): number {
  return Math.max(...Object.values(tour.cardData.maxPersons));
}

/** 
 * Helper: altijd een array van categorieën teruggeven 
 */
export function toCategoriesArray(category: Tour['category']): TourCategory[] {
  return Array.isArray(category) ? category : [category];
}