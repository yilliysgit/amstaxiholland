// ============= ENUMS & TYPES =============

export type TourCategory =
  | 'museum'
  | 'cultuur'
  | 'shopping'
  | 'natuur'
  | 'internationaal'
  | 'stad'
  | 'familie';

export type TourCountryCode = 'NL' | 'BE' | 'DE';

export type VehicleType = 'sedan' | 'van';

/**
 * Star rating score (supports decimals like 4.7, 4.8)
 */
export type StarScore = number;

// ============= BASE INTERFACES =============

export interface VehiclePrice {
  sedan: number;
  van: number;
}

export interface VehicleMaxPersons {
  sedan: number;
  van: number;
}

export interface TourRating {
  score: StarScore;
  reviewCount: number;
}

export interface TourCardData {
  country: TourCountryCode;
  province: string;
  rating: TourRating;
  distanceFromAmsterdam: number;
  maxPersons: VehicleMaxPersons;
  pickupAvailable: boolean;
}

export interface SeasonDates {
  /** ISO date format: YYYY-MM-DD */
  start: string;
  end: string;
}

export interface TourRouteInfo {
  distanceKm: number;
  estimatedTravelTimeMin: number;
  mainRoute?: string;
  notes?: string;
}

export type TourServiceKey =
  | 'oneWay'
  | 'roundTrip'
  | 'groups'
  | 'business';

export interface TourServicesSection {
  items: TourServiceKey[];
}

// ============= TOUR TYPES (DISCRIMINATED UNION) =============

interface BaseTour {
  id: number;
  slug: string;
  durationHours: number;

  /**
   * Supports single or multiple categories
   * Example: 'museum' or ['stad', 'museum']
   */
  category: TourCategory | TourCategory[];

  basePrice: VehiclePrice;

  imageSrc: string;
  imageAlt?: string;

  cardData: TourCardData;

  routeInfo?: TourRouteInfo;
  services?: TourServicesSection;
}

export interface SeasonalTour extends BaseTour {
  isSeasonal: true;
  season: SeasonDates;
}


export interface NonSeasonalTour extends BaseTour {
  isSeasonal: false;
}

export type Tour = SeasonalTour | NonSeasonalTour;

// ============= COMPONENT PROPS =============

export interface TourCardProps {
  tour: Tour;
  onMoreInfo?: (tourId: string) => void;
  onBookNow?: (tourId: string) => void;
}

// ============= HELPER FUNCTIONS =============

export function formatPriceEUR(price: number): string {
  return `€${price}`;
}

export function getTourPrice(tour: Tour, vehicleType: VehicleType): number {
  return tour.basePrice[vehicleType];
}

export function getLowestPrice(tour: Tour): number {
  return Math.min(tour.basePrice.sedan, tour.basePrice.van);
}

export function isInSeason(tour: Tour): boolean {
  if (!tour.isSeasonal) return true;

  const now = new Date();
  const start = new Date(tour.season.start);
  const end = new Date(tour.season.end);

  return now >= start && now <= end;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDuration(hours: number): string {
  return hours === 1 ? '1 uur' : `${hours} uur`;
}

export function formatDistance(km: number): string {
  return `${km} km`;
}

export function getMaxPersonsDisplay(tour: Tour): string {
  const { sedan, van } = tour.cardData.maxPersons;
  return sedan === van ? `${sedan}` : `${sedan}-${van}`;
}

/**
 * Always returns an array of categories
 */
export function toCategoriesArray(
  category: TourCategory | TourCategory[]
): TourCategory[] {
  return Array.isArray(category) ? category : [category];
}
