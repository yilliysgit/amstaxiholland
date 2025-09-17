// src/types/forms/bookingsForm/BookingStep1.type.ts
import type { ISODate, Time24 } from "@/types/dateTime/DateTime.type";

/* -------------------- Data Types -------------------- */

export interface AddressFields {
  address: string;
  houseNumber: string;
  addition?: string; // Optioneel
}

export interface Step1Common {
  fromAddress: AddressFields;
  toAddress: AddressFields;
  stops: AddressFields[];
  date: ISODate | null;
  time: Time24 | null;
  passengers: number;
  hasLuggage: boolean | null;
}

export type Step1OneWay = Step1Common & {
  isRetour: false;
};

export type Step1ReturnSame = Step1Common & {
  isRetour: true;
  retourType: "same";
  returnDate: ISODate | null;
  returnTime: Time24 | null;
  retourFromAddress?: never;
};

export type Step1ReturnDifferent = Step1Common & {
  isRetour: true;
  retourType: "different";
  returnDate: ISODate | null;
  returnTime: Time24 | null;
  retourFromAddress: AddressFields;
};

export type BookingStep1FormData =
  | Step1OneWay
  | Step1ReturnSame
  | Step1ReturnDifferent;

/* -------------------- Error Types -------------------- */

type Step1ErrorKeys =
  | "fromAddress.address" | "fromAddress.houseNumber" | "fromAddress.addition"
  | "toAddress.address"   | "toAddress.houseNumber"   | "toAddress.addition"
  | `stops.${number}.address` | `stops.${number}.houseNumber` | `stops.${number}.addition`
  | "date" | "time" | "passengers" | "hasLuggage"
  | "retourType" | "returnDate" | "returnTime"
  | "retourFromAddress.address" | "retourFromAddress.houseNumber" | "retourFromAddress.addition";

export type Step1Errors = Partial<Record<Step1ErrorKeys, string>>;

/* -------------------- (Verwijderd) Component Props -------------------- */
// Niet meer nodig; Step1 gebruikt Step1Api (uit de hook) + onNext.

/* -------------------- Helper Types -------------------- */

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

export const inBounds = (i: number, len: number): boolean =>
  i >= 0 && i < len;

export const normalize = (s: string): string =>
  s.normalize("NFKC").trim();

/* -------------------- Optionele type guards -------------------- */

export const isReturnSame = (p: BookingStep1FormData): p is Step1ReturnSame =>
  p.isRetour === true && (p as any).retourType === "same";

export const isReturnDifferent = (p: BookingStep1FormData): p is Step1ReturnDifferent =>
  p.isRetour === true && (p as any).retourType === "different";
