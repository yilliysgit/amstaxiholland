
// client/types/forms/bookingsForm/pricing/bookingQuote.type.ts

export type Currency = "EUR";

export interface Place { // input na geocoding (optioneel)
  address: string;
  houseNumber: string;
  addition: string;
  lat?: number;
  lng?: number;
}

export interface QuoteInput { // wat de calculator nodig heeft
  from: Place;
  to: Place;
  stops: Place[];
  // liever één timestamp per ritdeel op de server
  outwardAt?: string;     // ISO datetime (heen)
  returnAt?: string;      // ISO datetime (terug), als retour
  isRetour: boolean;
  passengers: number;
  hasLuggage: boolean | null;
  vehicleClass?: "standard" | "van" | "lux"; // optioneel
}

export interface RouteSummary {
  distanceKm: number;
  durationMin: number;
  waitingTime: number;
  stopsCount: number;
}

export type SurchargeCode =
  | "night" | "weekend" | "holiday" | "luggage" | "extra_stops" | "airport" | "min_fare_adjust";

export interface Surcharge {
  code: SurchargeCode;
  label: string;       // "Nachttarief", "Weekendtoeslag", ...
  amountCents: number; // + of - (korting negatief)
}

export interface PriceBreakdown {
  baseCents: number;
  perKmCents: number;
  perMinCents: number;
  surcharges: Surcharge[];
  discountCents?: number;
  subtotalCents: number;
  vatCents: number;
  totalCents: number;
  currency: Currency;
}

export interface Quote {
  id: string;
  input: QuoteInput;
  route: RouteSummary;
  breakdown: PriceBreakdown;
  version: string;        // tariefversie
  expiresAt?: string;     // ISO datetime
  status: "estimate" | "final";
}

export type QuoteState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; quote: Quote }
  | { status: "error"; message: string };
