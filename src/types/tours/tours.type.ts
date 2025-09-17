// types voor tours en prijzen

export type VehicleType = 'sedan' | 'van';

export type TourCategory =
  | 'Museum'
  | 'Cultuur'
  | 'Shopping'
  | 'Natuur'
  | 'Internationaal'
  | 'Stad'
  | 'Familie';

// stricter datumtype (YYYY-MM-DD)
type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
type Season = { start: ISODate; end: ISODate };

type BaseTour = {
  id: number;
  /** url- en sleutelvriendig */
  slug: string;
  name: string;
  description: string;
  /** duur in uren als getal (handig voor sorteren/filters) */
  durationHours: number;
  category: TourCategory;
  /**
   * prijzen per voertuigtype, in EUR (incl. btw indien van toepassing)
   * voorbeeld: { sedan: 75, van: 95 }
   */
  basePrice: Record<VehicleType, number>;
  /** afbeelding die gebruikt wordt in sliders / cards  */
  imageSrc: string;
};


export type Tour =
  | (BaseTour & { isSeasonal: true; season: Season })
  | (BaseTour & { isSeasonal?: false; season?: undefined });

/** Handige helper: toon netjes als € 95 (gecachede formatter) */
const EUR0 = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});
export function formatPriceEUR(amount: number): string {
  return EUR0.format(amount);
}

/** Prijs ophalen obv tour + vehicle */
export function getTourPrice(tour: Tour, vehicle: VehicleType): number {
  return tour.basePrice[vehicle];
}

/** Is deze tour beschikbaar op een bepaalde datum? (non-seasonal = altijd true) */
export function isInSeason(tour: Tour, on: Date = new Date()): boolean {
  if (!tour.isSeasonal) return true;
  const d = on.toISOString().slice(0, 10) as ISODate; // 'YYYY-MM-DD'
  return d >= tour.season.start && d <= tour.season.end;
}

/** Eenvoudige slugify zodat slugs consistent zijn */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-') // collapse naar enkele '-'
    .replace(/(^-|-$)/g, '');    // trim leading/trailing '-'
}

/** 2.5 -> '2 uur 30 min' */
export function formatDuration(hours: number): string {
  const h = Math.trunc(hours);
  const m = Math.round((hours - h) * 60);
  return [h ? `${h} uur` : '', m ? `${m} min` : ''].filter(Boolean).join(' ').trim() || '0 min';
}
