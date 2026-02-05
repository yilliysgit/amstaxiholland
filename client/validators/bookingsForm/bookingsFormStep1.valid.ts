// client/validators/bookingsForm/step1.valid.ts

import type {
  AddressFields,
  BookingStep1FormData,
  Step1Errors,
} from "../../types/forms/bookingsForm/step1.type";
import { normalize } from "../../types/forms/bookingsForm/step1.type";


/* =========================================
 * Basis helpers
 * ======================================= */

export function isEmpty(value: string): boolean {
  return normalize(value) === "";
}

/**
 * Straatnaam:
 * - Minimaal 2 tekens na trim
 * - Bevat ten minste één letter (Unicode)
 * - Alleen letters/cijfers/spaties/apostrof/streepje/punt
 */
const STREET_RE = /^(?=.*\p{L})[\p{L}\p{N}\s''.-]{2,}$/u;
export function isValidStreetName(streetName: string): boolean {
  return STREET_RE.test(normalize(streetName));
}

/** Huisnummer: 1–4 cijfers */
export function isValidHouseNumber(houseNumber: string): boolean {
  const v = normalize(houseNumber);
  return v !== "" && /^\d{1,4}$/.test(v);
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
  return !isEmpty(address.address) && !isEmpty(address.houseNumber);
}

/** Adressen exact gelijk? (case/spacing-insensitief, NFKC) */
export function sameAddress(a: AddressFields, b: AddressFields): boolean {
  return (
    normalize(a.address).toLowerCase() === normalize(b.address).toLowerCase() &&
    normalize(a.houseNumber) === normalize(b.houseNumber) &&
    normalize(a.addition ?? "").toLowerCase() === normalize(b.addition ?? "").toLowerCase()
  );
}

/* =========================================
 * Veld-validaties → i18n keys
 * ======================================= */

/**
 * Check of adres via Google Places is geselecteerd
 */
export function isAddressVerified(address: AddressFields): boolean {
  return !!address.placeId;
}

/**
 * Valideert een enkel adresblok.
 * Retourneert een map van veld → i18n-key.
 *
 * Beschikbare keys (uit step1.json → validation):
 *   validation.required        — "{field} is verplicht"
 *   validation.streetInvalid   — "{field} adres lijkt ongeldig"
 *   validation.houseNumberFmt  — "{field} huisnummer moet 1–4 cijfers zijn"
 *   validation.additionFmt     — "{field} toevoeging is ongeldig (max 3 karakters)"
 *   validation.selectFromList  — "Selecteer een adres uit de lijst"
 */
export function validateAddress(
  address: AddressFields
): Partial<Record<keyof AddressFields, string>> {
  const errors: Partial<Record<keyof AddressFields, string>> = {};

  // Straat — moet via Google Places geselecteerd zijn
  if (isEmpty(address.address)) {
    errors.address = "validation.required";
  } else if (!isAddressVerified(address)) {
    errors.address = "validation.selectFromList";
  } else if (!isValidStreetName(address.address)) {
    errors.address = "validation.streetInvalid";
  }

  // Huisnummer
  if (isEmpty(address.houseNumber)) {
    errors.houseNumber = "validation.required";
  } else if (!isValidHouseNumber(address.houseNumber)) {
    errors.houseNumber = "validation.houseNumberFmt";
  }

  // Toevoeging (optioneel)
  if (!isValidAddition(address.addition)) {
    errors.addition = "validation.additionFmt";
  }

  return errors;
}

/* =========================================
 * Stap 1 — volledig
 * ======================================= */

/**
 * Valideert de hele stap 1.
 * Retourneert Step1Errors — een map van veldpad → i18n-key.
 * Lege map = alles klopt.
 */
export function validateStep1(data: BookingStep1FormData): Step1Errors {
  const errors: Step1Errors = {};

  // --- from ---
  const fromErrs = validateAddress(data.fromAddress);
  if (fromErrs.address)       errors["fromAddress.address"]       = fromErrs.address;
  if (fromErrs.houseNumber)   errors["fromAddress.houseNumber"]   = fromErrs.houseNumber;
  if (fromErrs.addition)      errors["fromAddress.addition"]      = fromErrs.addition;

  // --- to ---
  const toErrs = validateAddress(data.toAddress);
  if (toErrs.address)         errors["toAddress.address"]         = toErrs.address;
  if (toErrs.houseNumber)     errors["toAddress.houseNumber"]     = toErrs.houseNumber;
  if (toErrs.addition)        errors["toAddress.addition"]        = toErrs.addition;

  // --- stops ---
  data.stops.forEach((stop, i) => {
    const stopErrs = validateAddress(stop);
    if (stopErrs.address)     errors[`stops.${i}.address`]        = stopErrs.address;
    if (stopErrs.houseNumber) errors[`stops.${i}.houseNumber`]    = stopErrs.houseNumber;
    if (stopErrs.addition)    errors[`stops.${i}.addition`]       = stopErrs.addition;
  });

  // --- datum / tijd ---
  if (!data.date) errors.date = "validation.required";
  if (!data.time) errors.time = "validation.required";

  // --- passagiers ---
  if (data.passengers < 1 || data.passengers > 8) {
    errors.passengers = "validation.passengersRange";
  }

  // --- bagage ---
  if (data.hasLuggage === null) {
    errors.hasLuggage = "validation.selectLuggage";
  }

  // --- zelfde adres check ---
  if (isAddressComplete(data.fromAddress) && isAddressComplete(data.toAddress)) {
    if (sameAddress(data.fromAddress, data.toAddress)) {
      errors["fromAddress.address"] = "validation.sameAddress";
    }
  }

  // --- retour blok ---
  if (data.isRetour) {
    if (!data.returnDate) errors.returnDate = "validation.required";
    if (!data.returnTime) errors.returnTime = "validation.required";

    if (data.retourType === "different") {
      const retErrs = validateAddress(data.retourFromAddress);
      if (retErrs.address)     errors["retourFromAddress.address"]     = retErrs.address;
      if (retErrs.houseNumber) errors["retourFromAddress.houseNumber"] = retErrs.houseNumber;
      if (retErrs.addition)    errors["retourFromAddress.addition"]    = retErrs.addition;
    }

    // Volgorde-check: retour moet na heenreis liggen
    if (data.date && data.time && data.returnDate && data.returnTime) {
      const out = new Date(`${data.date}T${data.time}:00`);
      const ret = new Date(`${data.returnDate}T${data.returnTime}:00`);
      if (Number.isFinite(out.getTime()) && Number.isFinite(ret.getTime()) && ret <= out) {
        errors.returnDate = "validation.returnAfterDeparture";
      }
    }
  }

  return errors;
}