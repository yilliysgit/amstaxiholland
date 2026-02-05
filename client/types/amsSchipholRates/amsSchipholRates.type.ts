// client/types/amsSchipholRates/amsSchipholRates.type.ts

export type Availability = "24-7" | "daily" | "limited"; // ⬅️ Keys i.p.v. Nederlandse tekst

export type AmsSchipholRatesItem = {
  name: string;
  price: { sedan: number; van: number };
  color: string;
  badgeKey: string | null;   // ⬅️ "cheapest1" | "cheapest2" | "expensive" | null
  travelTimeMinutes: number; // ⬅️ Alleen het nummer: 25, 30, 35, etc.
  availability: Availability; // ⬅️ Nu met keys
};