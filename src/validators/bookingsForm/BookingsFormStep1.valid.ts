// src/validators/bookingsForm/BookingsFormStep1.valid.ts

import type {
  AddressFields,
  BookingStep1FormData,
} from "@/types/forms/bookingsForm/bookingsFormStep1.type";
import type { ISODate, Time24 } from "@/types/dateTime/DateTime.type";

/* =========================================
 * Basis helpers
 * ======================================= */

export const normalize = (s: string) => s.normalize("NFKC").trim();

export function isEmpty(value: string): boolean {
  return normalize(value) === "";
}

/**
 * Straatnaam:
 * - Minimaal 2 tekens na trim
 * - Bevat ten minste één letter (Unicode)
 * - Alleen letters/cijfers/spaties/apostrof/streepje/punt
 */
const STREET_RE = /^(?=.*\p{L})[\p{L}\p{N}\s'’.-]{2,}$/u;
export function isValidStreetName(streetName: string): boolean {
  const v = normalize(streetName);
  if (v.length < 2) return false;
  return STREET_RE.test(v);
}

/** Huisnummer: 1–4 cijfers */
export function isValidHouseNumber(houseNumber: string): boolean {
  const v = normalize(houseNumber);
  if (v === "") return false;
  return /^\d{1,4}$/.test(v);
}

/** Toevoeging: optioneel; 1–3 alfanumeriek (Unicode letters/cijfers) */
export function isValidAddition(addition?: string): boolean {
  const v = normalize(addition ?? "");
  if (v === "") return true; // optioneel
  return /^[\p{L}\p{N}]{1,3}$/u.test(v);
}

/** Minimale check: adres + huisnummer niet leeg */
export function isAddressComplete(address?: AddressFields | null): address is AddressFields {
  if (!address) return false;
  return normalize(address.address) !== "" && normalize(address.houseNumber) !== "";
}

/** Adressen exact gelijk? (case/spacing-insensitief, NFKC) */
export function sameAddress(a: AddressFields, b: AddressFields): boolean {
  const streetA = normalize(a.address).toLowerCase();
  const streetB = normalize(b.address).toLowerCase();
  const nrA = normalize(a.houseNumber);
  const nrB = normalize(b.houseNumber);
  const addA = normalize(a.addition ?? "").toLowerCase();
  const addB = normalize(b.addition ?? "").toLowerCase();
  return streetA === streetB && nrA === nrB && addA === addB;
}

/* =========================================
 * Veld-validaties met fieldErrors
 * ======================================= */

export function validateAddress(
  address: AddressFields,
  label = "Adres"
): { errors: string[]; fieldErrors: Partial<Record<keyof AddressFields, string>> } {
  const errors: string[] = [];
  const fieldErrors: Partial<Record<keyof AddressFields, string>> = {};

  // Straat
  if (isEmpty(address.address)) {
    const msg = `${label} adres is verplicht`;
    errors.push(msg);
    fieldErrors.address = msg;
  } else if (!isValidStreetName(address.address)) {
    const msg = `${label} adres lijkt ongeldig`;
    errors.push(msg);
    fieldErrors.address = msg;
  }

  // Huisnummer
  if (isEmpty(address.houseNumber)) {
    const msg = `${label} huisnummer is verplicht`;
    errors.push(msg);
    fieldErrors.houseNumber = msg;
  } else if (!isValidHouseNumber(address.houseNumber)) {
    const msg = `${label} huisnummer moet 1–4 cijfers zijn`;
    errors.push(msg);
    fieldErrors.houseNumber = msg;
  }

  // Toevoeging (optioneel)
  if (!isValidAddition(address.addition)) {
    const msg = `${label} toevoeging is ongeldig (max 3 karakters)`;
    errors.push(msg);
    fieldErrors.addition = msg;
  }

  return { errors, fieldErrors };
}

/* =========================================
 * Samengestelde helpers
 * ======================================= */

export function validateStops(stops: AddressFields[]): string[] {
  const errs: string[] = [];
  stops.forEach((s, i) => {
    const r = validateAddress(s, `Tussenstop ${i + 1}`);
    errs.push(...r.errors);
  });
  return errs;
}

export function validatePassengers(n: number): string[] {
  return n >= 1 && n <= 8 ? [] : ["Aantal passagiers moet tussen 1 en 8 liggen"];
}

export function validateDateTime(date: ISODate | null, time: Time24 | null): string[] {
  const errs: string[] = [];
  if (!date) errs.push("Vertrekdatum is verplicht");
  if (!time) errs.push("Vertrektijd is verplicht");
  return errs;
}

export function validateReturnBlock(data: BookingStep1FormData): string[] {
  if (!data.isRetour) return [];
  const errs: string[] = [];

  if (!data.returnDate) errs.push("Retourdatum is verplicht");
  if (!data.returnTime) errs.push("Retourtijd is verplicht");

  if (data.retourType === "different") {
    const r = validateAddress(data.retourFromAddress, "Retour vertrekadres");
    errs.push(...r.errors);
  }

  // Simpele volgorde-check (retour na heenreis)
  try {
    if (data.date && data.time && data.returnDate && data.returnTime) {
      const out = new Date(`${data.date}T${data.time}:00`);
      const ret = new Date(`${data.returnDate}T${data.returnTime}:00`);
      if (Number.isFinite(out.getTime()) && Number.isFinite(ret.getTime())) {
        if (ret <= out) {
          errs.push("Retourdatum/-tijd moet na de heenreis liggen");
        }
      }
    }
  } catch {
    // parse-fouten negeren
  }

  return errs;
}

/**
 * Alles-in-1 validatie voor stap 1.
 * Retourneert een platte lijst met foutmeldingen.
 */
export function validateStep1Form(data: BookingStep1FormData): string[] {
  const fromR = validateAddress(data.fromAddress, "Vertrek");
  const toR   = validateAddress(data.toAddress, "Bestemming");

  return [
    ...fromR.errors,
    ...toR.errors,
    ...validateStops(data.stops),
    ...validatePassengers(data.passengers),
    ...validateDateTime(data.date, data.time),
    ...(data.hasLuggage === null ? ["Selecteer of u bagage heeft"] : []),
    ...validateReturnBlock(data),
    ...(isAddressComplete(data.fromAddress) &&
      isAddressComplete(data.toAddress) &&
      sameAddress(data.fromAddress, data.toAddress)
        ? ["Vertrek- en afleveradres mogen niet hetzelfde zijn"]
        : []),
  ];
}
