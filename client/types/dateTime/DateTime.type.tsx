// @/types/dateTime/DateTime.type.ts

// Pragmatische DateTime types - balans tussen type hints en betrouwbaarheid
export type ISODate = string;     // "YYYY-MM-DD"
export type Time24 = string;      // "HH:MM"  
export type ISODateTime = string; // "YYYY-MM-DDTHH:MM:SSZ"

// Basis types voor components (zonder union explosie)
export type Hour = string;    // "00" tot "23"
export type Minute = string;  // "00" tot "59"
export type Month = string;   // "01" tot "12"
export type Day = string;     // "01" tot "31"

// Runtime validatie - dit doet het echte werk
const RE_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const RE_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isISODate(value: string): value is ISODate {
 if (!RE_DATE.test(value)) return false;
 
 const [y, m, d] = value.split("-").map(Number);
 const dt = new Date(y, m - 1, d);
 return (
   dt.getFullYear() === y &&
   dt.getMonth() === m - 1 &&
   dt.getDate() === d
 );
}

export function isTime24(value: string): value is Time24 {
 return RE_TIME.test(value);
}

// Helpers
export function parseISODate(value: string): ISODate | null {
 return isISODate(value) ? value : null;
}

export function parseTime24(value: string): Time24 | null {
 return isTime24(value) ? value : null;
}