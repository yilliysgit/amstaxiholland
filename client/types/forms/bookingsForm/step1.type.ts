// client/types/forms/bookingsForm/step1.type.ts

import type { ISODate, Time24 } from "@/types/dateTime/DateTime.type";

/* -------------------- Address -------------------- */

export interface AddressFields {
  address: string;
  houseNumber: string;
  addition?: string;
  lat?: number | null;
  lng?: number | null;
  placeId?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

/* -------------------- Step1 Form Data -------------------- */

// Gemeenschappelijke velden — altijd aanwezig
export interface Step1Common {
  fromAddress: AddressFields;
  toAddress: AddressFields;
  stops: AddressFields[];
  date: ISODate | null;
  time: Time24 | null;
  passengers: number;
  hasLuggage: boolean | null;
}

// Geen retour
export type Step1OneWay = Step1Common & {
  isRetour: false;
};

// Retour — vertrek vanaf zelfde locatie
export type Step1ReturnSame = Step1Common & {
  isRetour: true;
  retourType: "same";
  returnDate: ISODate | null;
  returnTime: Time24 | null;
  retourFromAddress?: never;
};

// Retour — vertrek vanaf ander adres
export type Step1ReturnDifferent = Step1Common & {
  isRetour: true;
  retourType: "different";
  returnDate: ISODate | null;
  returnTime: Time24 | null;
  retourFromAddress: AddressFields;
};

// Discriminated Union — TypeScript weet automatisch welke velden beschikbaar zijn
export type BookingStep1FormData =
  | Step1OneWay
  | Step1ReturnSame
  | Step1ReturnDifferent;

/* -------------------- Errors -------------------- */

type Step1ErrorKeys =
  | "fromAddress.address"
  | "fromAddress.houseNumber"
  | "fromAddress.addition"
  | "toAddress.address"
  | "toAddress.houseNumber"
  | "toAddress.addition"
  | `stops.${number}.address`
  | `stops.${number}.houseNumber`
  | `stops.${number}.addition`
  | "date"
  | "time"
  | "passengers"
  | "hasLuggage"
  | "retourType"
  | "returnDate"
  | "returnTime"
  | "retourFromAddress.address"
  | "retourFromAddress.houseNumber"
  | "retourFromAddress.addition";

export type Step1Errors = Partial<Record<Step1ErrorKeys, string>>;

/* -------------------- Helper Types -------------------- */

// Beschrijft waar een adres naartoe geschreven wordt
export type AddressTarget =
  | { kind: "fromAddress" | "toAddress" }
  | { kind: "stop"; index: number }
  | { kind: "retourFromAddress" };

/* -------------------- Constants -------------------- */

export const emptyAddress: AddressFields = {
  address: "",
  houseNumber: "",
  addition: "",
};

export const defaultStep1: Step1OneWay = {
  fromAddress: { ...emptyAddress },
  toAddress: { ...emptyAddress },
  stops: [],
  date: null,
  time: null,
  passengers: 1,
  hasLuggage: null,
  isRetour: false,
};

/* -------------------- Utility Functions -------------------- */

export const inBounds = (i: number, len: number): boolean => i >= 0 && i < len;

export const normalize = (s: string): string => s.normalize("NFKC").trim();

/* -------------------- Type Guards -------------------- */

export const isReturnSame = (
  data: BookingStep1FormData
): data is Step1ReturnSame =>
  data.isRetour === true && "retourType" in data && data.retourType === "same";

export const isReturnDifferent = (
  data: BookingStep1FormData
): data is Step1ReturnDifferent =>
  data.isRetour === true &&
  "retourType" in data &&
  data.retourType === "different";